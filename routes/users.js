const express = require('express');
const router = express.Router();
const Users = require('../Models/Users');
const allUsers = require('../Models/allUsers')
const Likes = require('../Models/Likes')
const Notifications = require('../Models/Notifications')
const Comments = require('../Models/Comments')
const bcrypt = require('bcrypt');
const passport = require('passport');
const authenticate = require('../config/authenticate'); 
 


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
            
            res.json(currentUser)
        })
        .catch(err => console.log(err))
    }    
);
 
router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user)
})

module.exports = router;