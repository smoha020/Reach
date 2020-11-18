const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Users = require('../Models/Users');
const allUsers = require('../Models/allUsers')
const Likes = require('../Models/Likes')
const Notifications = require('../Models/Notifications')
const userImage = require('../Models/userImage')
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 


//can you export from main app.js file? 
const authenticate = require('../config/authenticate'); 

router.get('/test', (req, res) => {
    console.log("test hit: " + req.user)
    if(req.user && req.user.username) {
        /*if we are logged in we get the user's credentials, 
        likes and notifications*/
        let currentUser = {}
        let query = { username: req.user.username }
        allUsers.findOne(query)
        .then(data => {
            
            currentUser.credentials = data


            return Likes.find({ user: req.user.username })
        })
        .then(data => {

            currentUser.likes = [...data]
            return Notifications.find({ reciever: req.user.username, read: false, sender: {$ne: req.user.name} })
        })
        .then(data => {
            
            currentUser.notifications = [...data]
            return userImage.findOne({user: req.user.username})

        })
        .then(data => {
            console.log(data)

            let baseData = Buffer.from(data.pic.data).toString('base64')
            currentUser.pic = baseData
            
            //console.log(baseData)
            
            res.json(currentUser)
        })
        .catch(err => console.log(err))
        //res.send(/*req.isAuthenticated(),*/ req.user.username)
    }
    else {
        res.send(/*req.isAuthenticated(),*/ "not logged in")
    }
});

router.get('/dashboard', authenticate.authenticated,
    (req, res) => {
        //res.send('hey there success')
        console.log(authenticate.authenticated);
        res.render('dashboard', {articles: [], message: req.flash('log')})
    });
 
/*have to use post if I want req.body to return 
other than an empty object. If you want to use get then use req.url...*/
router.post('/news', (req, res) => {

    if(req.body.search != ''){
        fetch(`https://newsapi.org/v2/everything?q=${req.body.search}&apiKey=03011dee36fd47f4a63c3a187dcd6618`,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
        })
            .then(response => response.json()) //parsing is needed even in node 
            .then(data => res.render('dashboard', {articles: [...data.articles], message: ''}))
            .catch(err => console.log(err));
    } else {
        res.render('dashboard', {articles: [], message: ''})
    }
});

module.exports = router;