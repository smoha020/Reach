const express = require('express');
const router = express.Router();
const Users = require('../Models/Users');
const allUsers = require('../Models/allUsers')
const Likes = require('../Models/Likes')
const Notifications = require('../Models/Notifications')
const userImage = require('../Models/userImage')
const Comments = require('../Models/Comments')
const bcrypt = require('bcrypt');
const passport = require('passport');
const authenticate = require('../config/authenticate'); 
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const Posts = require('../Models/Posts');
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './client/src/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname))
    } 
}); 
  
const upload = multer({ storage: storage }); 
 


//LOG IN AND REGISTRATION
router.get('/register', authenticate.notAuthenticated, (req, res) => {
    /*I added the name, email, etc here because if 
    I didn't, I would have to put an if statement inside the IIFE
    checking if the name, email,..etc are undefined and that would cause 
    an error*/
    res.render('register', {name: '', email: '', password: '', message: req.flash('reg')})});

 
router.get('/login', authenticate.notAuthenticated, (req, res) => {
    res.render('log_in', {email: '', password: '', message: req.flash('log')})});

router.post('/register', (req, res) => {

    console.log('inside the call')
    const {username, email, password} = req.body;
 
    if((username == '') || (email == '') || (password == '') ) {
        res.send('Please complete form!')
    } else {
        allUsers.findOne({email: email}) 
            .then(user => {
                if(user) {
                    res.redirect('/flash-exist');
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if(err) throw err;
                            let currentUser = {}
                            // Store hash in your password DB.
                            const newUser = new allUsers({
                                username: username,
                                email: email,
                                password: hash,
                                joinDate: new Date()
                            });
                            newUser.save()
                                .then( response => {
                                    currentUser.credentials = response
                                    currentUser.likes = []
                                    currentUser.notifications = []
                                    console.log('the new user: ' + currentUser)
                                    res.send(currentUser)
                                })
                                .catch(err => console.log(err))
                        });
                    });
                }
            })         
            .catch(err => err)
        }
})

router.post('/login',
    passport.authenticate('local'/*, 
    {successRedirect: '/flash-pass', 
    failureRedirect: '/flash-fail' }*/),
    (req, res) => {
        let currentUser = {}
        let query = { username: req.user.username }
        allUsers.findOne(query)
        .then(data => {
            
            currentUser.credentials = data


            return Likes.find({ user: req.user.username })
        })
        .then(data => {

            currentUser.likes = [...data]
            return Notifications.find({ reciever: req.user.username, read: false, sender: {$ne: req.user.name}  })
        })
        .then(data => {
            
            currentUser.notifications = [...data]
            
            return userImage.findOne({user: req.user.username})

        })
        .then(data => {

            if(!data){
                res.send(currentUser)
            } else {
                let baseData = Buffer.from(data.pic.data).toString('base64')
                currentUser.pic = baseData
                
                
                res.json(currentUser)
            }

        })
        .catch(err => console.log(err))
    }    
);
 
router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user)
})

//UPDATE USER
router.post('/update/:_id', (req, res) => {

    const filter= { _id: req.params._id };
    let query = { username: req.user.username }

    allUsers.findOne(query)
    .then(data => {

        return allUsers.updateOne(
            filter, 
            {$set: { 
                bio: (req.body.bio)? (req.body.bio) : (data.bio),
                location: (req.body.location)? (req.body.location): (data.location),
                website: (req.body.website)? (req.body.website): (data.website)
            }}
        )
        .then(() => res.send('user updated'))
        .catch(err => res.send(err))
    })
    .catch(err => res.json(err))
})

//UPLOAD PHOTO
router.post('/uploadImage', upload.single('pic'), (req, res) => {

    console.log('current user is: ' + req.user.username)
    let filter = { user: req.user.username }
    userImage.findOne(filter)
    .then(data => {
        if(!data) {
            const newImage = new userImage({
                user: req.user.username,
                pic: {
                    data: fs.readFileSync(path.join(__dirname + '/../client/src/uploads/' + req.file.filename )), 
                    contentType: 'image/png',
                    name: `../uploads/${req.file.filename}`
                }
            })
            newImage.save()
            .then(() => {
                
                userImage.findOne(filter)
                .then(data => {

                    let baseData = Buffer.from(data.pic.data).toString('base64')
            
                    Posts.findOne(filter)
                    .then(data => {
                        //if no previos posts made by user
                        if(!data) {
                            console.log('also no previous posts')
                            res.send('also no previous posts')
                        } else {
                            Posts.updateMany(filter, { pic: baseData})
                            .then(() => {
                                res.send(baseData)
                                console.log('post pics also updated')
                            })
                            .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
                
                console.log('pic also updated')
            })
            .catch(err => res.send(err))
        }
        else {
            
            userImage.updateOne(
                filter, 
                {$set: { 
                    pic: {
                        data: fs.readFileSync(path.join(__dirname + '/../client/src/uploads/' + req.file.filename )), 
                        contentType: 'image/png',
                        name: `../uploads/${req.file.filename}`
                    }
                }}
            )
            .then(() => {
                console.log('are we in the else')
                userImage.findOne(filter)
                .then(data => {

                    let baseData = Buffer.from(data.pic.data).toString('base64')
            
                    Posts.findOne(filter)
                    .then(data => {
                        //if no previos posts made by user
                        if(!data) {
                            console.log('no previous posts')
                            res.send('no previous posts')
                        } else {
                            Posts.updateMany(filter, { pic: baseData})
                            .then(() => {
                                /*must send otherwise getPosts will
                                not show the changed pics unless page is refreshed*/
                                console.log('post pics updated')
                                res.send(baseData)
                            })
                            .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
                

                console.log('post pics updated')
            })
            .catch(err => res.send(err))
        }
    
    
    })
    .catch(err => res.send(err))
     
}) 

//OTHER USER 
router.get('/otheruser/:user', (req, res) => {
    let otherUser = {}
    let query = { username: req.params.user }

    console.log(req.params.user)
    allUsers.findOne(query)
    .then(data => {
        
        otherUser.credentials = data

        return Posts.find({ user: req.params.user })
    })
    .then(data => {
 
        console.log('posts data: ' + data)
        otherUser.posts = [...data]
        console.log('otheruser: ' + otherUser)
        res.json(otherUser)
    })
    .catch(err => console.log(err))   
})

module.exports = router;