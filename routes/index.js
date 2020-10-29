const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Users = require('../Models/Users');
const allUsers = require('../Models/allUsers')
const Likes = require('../Models/Likes')
const Notifications = require('../Models/Notifications')


//can you export from main app.js file? 
const authenticate = require('../config/authenticate'); 

router.get('/test', (req, res) => {
    console.log("test hit: " + req.user)
    if(req.user && req.user.name) {
        /*if we are logged in we get the user's credentials, 
        likes and notifications*/
        let currentUser = {}
        let query = { username: req.user.name }
        allUsers.findOne(query)
        .then(data => {
            
            currentUser.credentials = data


            return Likes.find({ user: req.user.name })
        })
        .then(data => {

            currentUser.likes = [...data]
            return Notifications.find({ reciever: req.user.name, read: false, sender: {$ne: req.user.name} })
        })
        .then(data => {
            
            currentUser.notifications = [...data]
            console.log(currentUser)
            res.json(currentUser)
        })
        .catch(err => console.log(err))
        //res.send(/*req.isAuthenticated(),*/ req.user.name)
    }
    else {
        res.send(/*req.isAuthenticated(),*/ req.user)
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