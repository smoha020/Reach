const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


//can you export from main app.js file? 
const authenticate = require('../config/authenticate'); 

router.get('/', (req, res) => res.render('home'));
router.get('/dashboard', authenticate.authenticated,
    (req, res) => {
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