const express = require('express');
const router = express.Router();
const Users = require('../Models/Users');
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
   
    const {name, email, password} = req.body;

    if((name == '') || (email == '') || (password == '') ) {
        res.redirect('/flash-register')
    } else {
        Users.findOne({email: email}) 
            .then(user => {
                if(user) {
                    res.redirect('/flash-exist');
                } else {
                    
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;
                        
                        // Store hash in your password DB.
                        const newUser = new Users({
                            name: name,
                            email: email,
                            password: hash
                        });
                        newUser.save()
                            .then( user => {
                                res.redirect('/users/login')
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
        res.send(req.user)
    }    
);

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user)
})

module.exports = router;