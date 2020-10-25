const express = require('express');
const router = express.Router();
const Posts = require('../Models/Posts')
const Notifications = require('../Models/Notifications')
const allUsers = require('../Models/allUsers')
const Comments = require('../Models/Comments')
const Likes = require('../Models/Likes');

 

//CREDENTIALS POSTS AND NOTIFICATIONS

//----------POSTS-----------//
//READ POSTS
router.get('/posts', (req, res) => {
    Posts.find().sort({ createdAt: -1 })
    .then(data => res.json(data))
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
        singlePost.createdAt = data.createdAt

        return Comments.find(query).sort({ Date: -1 })
    })
    .then(data => {
        
        singlePost.comments = [...data]

        console.log(singlePost)
        res.json(singlePost)
    })
    .catch(err => console.log(err))
})

//CREATE A POST
router.post('/posts/create', (req, res) => {
    
    //create a new post
    const newPost = new Posts({
        user: req.body.user,
        body: req.body.body,
        likeCount: 0,
        commentCount: 0,
        createdAt: new Date(),
    })
    
    newPost.save()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

//DELETE POST
router.delete('/posts/:_id', (req, res) => { 

    console.log('are we hitting it?')
    const filter = { _id: req.params._id };
    Posts.deleteOne(filter)
        .then(() => {
            res.json('post deleted')
            return Likes.deleteMany({ postId: req.params._id })
        })
        .then(res => console.log('likes deleted'))
        .catch((err) => console.log(err));
})

//----------COMMENTS-----------//

//ADD A COMMENT
router.post('/posts/createcomment/:postId', (req, res) => {

    let Note = {};
    
    const query = { _id: req.params.postId }
    
    //should we check if the post exists before adding the comment?
    const newComment = new Comments({
        body: req.body.body,
        user: req.body.user,
        postId: req.body.postId,
        createdAt: new Date()
    })

    newComment.save()
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

        const notification = new Notifications(Note)
    
        return notification.save()
    })
    .then(data =>{ 
        res.send('Notifaction made!')
        console.log("Notification: " + data)})
    .catch(err => console.log(err))
})


//DELETE A COMMENT
router.put('/posts/deletecomment/:postId', (req, res) => {
    const filter= { postId: req.params.postId};

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
            sender: req.body.user
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
    
            const notification = new Notifications(Note)
        
            return notification.save()
        })
        .then(() => {
            //we should send the post with updated likeCount
            res.send('Notification Sent')
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
router.delete('/unlike/:postId', (req, res) => {

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
    Notifications.updateOne(query, {$set: {
        read: true
    }})
    .then(data => {
        if(data) {
            console.log("notification is: " + data)  
            res.send('Notification has been read')
        }
        else {
            res.send('Notification does not exist')
        }
    }).catch(err => console.log(err))
})

//------------USER----------------//

//READ
router.get('/otheruser/:user', (req, res) => {
    let otherUser = {}
    let query = { username: req.params.user }

    console.log(req.params.user)
    allUsers.findOne(query)
    .then(data => {
        
        otherUser.data = [data]

        return Posts.find({ user: req.params.user })
    })
    .then(data => {
 
        console.log('posts data: ' + data)
        otherUser.Posts = [...data]
        console.log('otheruser: ' + otherUser)
        res.json(otherUser)
    })
    .catch(err => console.log(err))   
})

//CREATE
router.post('/users/add', (req, res) => {

    //create a new user
    const newUser = new allUsers({
        pic: req.body.pic,
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

//UPDATE 
router.put('/users/:_id', (req, res) => {

    const filter= {_id: req.params._id};

    allUsers.updateOne(
        filter, 
        {$set: { 
            pic: req.body.pic,
            username: req.body.username,
            bio: req.body.bio,
            location: req.body.location,
            website: req.body.website
        }}
    )
    .then(data => {
        res.json(data)})
    .catch(err => console.log(err))
})

module.exports = router;