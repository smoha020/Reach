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
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
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
            console.log(data)
            console.log(data.pic.name)
            currentUser.pic = data.pic.name
            console.log('currentUser: ' + currentUser)
            res.json(currentUser)
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
 
    let currentUser = {}
    console.log('req body: ' + req.body)
    allUsers.updateOne(
        filter, 
        {$set: { 
            pic: req.body.pic,
            bio: req.body.bio,
            location: req.body.location,
            website: req.body.website
        }}
    )
    .then(() => {
        return allUsers.findOne(filter)
    })
    .then(data => {
        console.log('here r the new creds: ' + data)
        currentUser.credentials = data
        return Likes.find({ user: req.user.username })
    })
    .then(data => {

        currentUser.likes = [...data]
        return Notifications.find({ reciever: req.user.username, read: false, sender: {$ne: req.user.name}  })
    })
    .then(data => {
        
        currentUser.notifications = [...data]
        
        res.json(currentUser)
    })
    .catch(err => res.json(err))
})

//UPLOAD PHOTO
router.post('/uploadImage', upload.single('pic'), (req, res) => {

    console.log(req.file)
    const newImage = new userImage({
        user: req.body.user,
        pic: {
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename )), 
            contentType: 'image/png',
            name: path.join(__dirname + '/../uploads/' + req.file.filename )
        }
    })
    newImage.save()
    .then(res => res.send(res))
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