const express = require('express');
const router = express.Router();
const userImage = require('../Models/userImage')
const Posts = require('../Models/Posts')
const Notifications = require('../Models/Notifications')
const allUsers = require('../Models/allUsers')
const Comments = require('../Models/Comments')
const Likes = require('../Models/Likes');

 

//CREDENTIALS POSTS AND NOTIFICATIONS

//----------POSTS-----------//
//READ POSTS
router.get('/posts', (req, res) => {
    console.log('start')
    Posts.find().sort({ createdAt: -1 })
    .then(data => {
        console.log('b4 finish')
        res.json(data)
    })
    .catch(err => console.log(err))
})

//READ SINGLE POST 
router.get('/posts/single/:postId', (req, res) => {

    let singlePost = {}
    const query = { postId: req.params.postId }

    
    Posts.findOne({ _id: req.params.postId})
    .then(data => {
    
        //If you don't place the post info in the data property
        //you won't be able to add the comments property to 
        //singlePost

        /*For some reason we can't do this:
        
        singlePost = data

        and then later when comments are fetched

        singlePost.comments = [...data]
        */

        singlePost._id = data._id
        singlePost.user = data.user
        singlePost.body = data.body
        singlePost.likeCount = data.likeCount
        singlePost.commentCount = data.commentCount
        singlePost.pic = data.pic
        singlePost.createdAt = data.createdAt
        

        return Comments.find(query).sort({ Date: -1 })
    })
    .then(data => {
        
        singlePost.comments = [...data]

        res.json(singlePost)
    })
    .catch(err => console.log(err))
})

//CREATE A POST
router.post('/posts/create', (req, res) => {
    

    userImage.findOne({ user: req.body.user })
    .then( data => {

        if(!data) {
            
            console.log('no image')
            const newPost = new Posts({
                user: req.body.user,
                body: req.body.body,
                likeCount: 0,
                commentCount: 0,
                pic: '',
                createdAt: new Date(),
            })
            
            newPost.save()
            .then(data => res.json(data))
            .catch(err => console.log(err))
        } else {
            console.log('we got an image')
            let baseData = Buffer.from(data.pic.data).toString('base64')

            const newPost = new Posts({
                user: req.body.user,
                body: req.body.body,
                likeCount: 0,
                commentCount: 0,
                pic: baseData,
                createdAt: new Date(),
            })
            
            newPost.save()
            .then(data => res.json(data))
            .catch(err => console.log(err))
        }

    })
    .catch(err => res.send(err))
})

//DELETE POST
router.delete('/posts/:_id', (req, res) => { 

    console.log('are we hitting it?')
    const filter = { _id: req.params._id };
    Posts.deleteOne(filter)
        .then(() => {
            
            return Likes.deleteMany({ postId: req.params._id })
        })
        .then(() => {
            
            Notifications.deleteMany({ postId: req.params._id })
        })
        .then(() => res.send('notifications deleted'))
        .catch((err) => console.log(err));
})

//----------COMMENTS-----------//

//ADD A COMMENT
router.post('/posts/createcomment/:postId', (req, res) => {

    let Note = {};
    
    const query = { _id: req.params.postId }
    let newComment 
    userImage.findOne({ user: req.body.user })
    .then( data => {
        
        if(!data) {
            
            newComment = new Comments({
                body: req.body.body,
                user: req.body.user,
                postId: req.body.postId,
                pic: '',
                createdAt: new Date()
            })
        } else {
            
            let baseData = Buffer.from(data.pic.data).toString('base64')

            newComment = new Comments({
                body: req.body.body,
                user: req.body.user,
                postId: req.body.postId,
                pic: baseData,
                createdAt: new Date()
            })
         }
         
         return newComment.save() 
    })
    .then(data => {
       
        Note.sender = data.user
        Note.notType = 'comment'
        Note.postId = data.postId
        Note.read = false
        
        return Posts.updateOne(query, { $inc : {
            commentCount: 1
        } })
    })
    .then(() => {
        return Posts.findOne(query)
    })
    .then(data => {
        Note.reciever = data.user
        Note.createdAt = new Date()

        if(Note.reciever != Note.sender) {
            const notification = new Notifications(Note)
            notification.save()
            .then(() => res.send(newComment))
            .catch(err => res.send(err))
        } else {
            res.send(newComment)
        }
    })
    .catch(err => console.log(err))
})
  

//DELETE A COMMENT
router.put('/posts/deletecomment/:postId', (req, res) => {
    const filter = { 
        _id: req.body._id,
    };

    Comments.deleteOne(filter)
    .then(() => {
        return Posts.updateOne( {_id: req.params.postId }, { $inc : {
            commentCount: -1
        } })
    })
    .then( () => {

        /*WE NEED TO MAKE noticomment BECAUSE REQ.BODY 
        CAN'T BE OUR FILTER SINCE IT HAS _id PROPERTY AND THE COMMENTS
        IN NOTIFCATIONS DON'T*/
        let filter = {
            notType: 'comment',
            postId: req.params.postId,
            sender: req.body.user,
        }
        return Notifications.deleteOne(filter)
        
    })
    .then( () => {
        //we MUST send a response
        res.send('Notifaction deleted!')
        console.log('deleted notification')
    })
    .catch(err => console.log(err))

})

//----------------LIKES------------------// 

//LIKE 
router.post('/like/:postId', (req, res) => {

    let Note = {}
    let query = { _id: req.params.postId }
    //the post weare going to send back
    let post;
    
    Likes.findOne({
        user: req.body.user,
        postId: req.params.postId
    })
    .then(data => {
        if (!data) {
            console.log('like doesnt exist')
            
            let newLike = new Likes({
            user: req.body.user,
            postId: req.params.postId,
            createdAt: new Date()
            })
     
            newLike.save()
            .then(data => {
        
                Note.sender = data.user
                Note.notType = 'like'
                Note.postId = data.postId
                Note.read = false
        
                return Posts.updateOne(query, { $inc : {
                    likeCount: 1
                } })
            })
            .then(() => {
                
                //the sender is 'user' in post
                return Posts.findOne(query)
            })
            .then(data => { 
        
                Note.reciever = data.user;
                Note.createdAt = new Date();
            
                if(Note.reciever != Note.sender) {
                    const notification = new Notifications(Note)
                    notification.save()
                    .then(() => res.send('Notification Sent'))
                    .catch(err => res.send(err))
                } else {
                    res.send('No Notification Sent')
                }
            
            })
            .catch(err => res.json(err))

        } else {
            res.send('You already liked this post')
        }
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
})


//UNLIKE 
router.post('/unlike/:postId', (req, res) => {

    let query = { 
        postId: req.params.postId, 
        user: req.body.user 
    }
    
    //git rid of the like
    Likes.deleteOne(query)
    .then(() => {

        //decrement the likeCount
        return Posts.updateOne( {_id: req.params.postId }, { $inc : {
            likeCount: -1
        } })
    })
    .then(() => { 
    
        //get rid of the notification
        let filter = {
            notType: 'like',
            postId: req.params.postId,
            sender: req.body.user
        }
        return Notifications.deleteOne(filter)
    })
    .then(() => {
        res.send('Notification deleted')
    })
    .catch(err => res.json(err))
})
 
//NOTIFICATION READ
router.put('/notificationRead/:_id', (req, res) => {
    let query = { _id: req.params._id }
    Notifications.deleteOne(query)
    .then(() => {
        res.send('notification deleted')
    }).catch(err => console.log(err))
})

//------------USER----------------//
 
//READ


//CREATE
router.post('/users/add', (req, res) => {

    //create a new user
    const newUser = new allUsers({
        pic: req.body.pic,
        email: req.body.email,
        username: req.body.username,
        bio: req.body.bio,
        location: req.body.location,
        website: req.body.website,
        joinDate: new Date()
    })
    
    newUser.save()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})



module.exports = router;