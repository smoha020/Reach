const express = require('express');
const router = express.Router();
const Posts = require('../Models/Posts')
const Notifications = require('../Models/Notifications')
const allUsers = require('../Models/allUsers')
const Comments = require('../Models/Comments')
const likes = require('../Models/likes');
const Likes = require('../Models/likes');
const { findOne } = require('../Models/Posts');



//CREDENTIALS POSTS AND NOTIFICATIONS

//----------POSTS-----------//
//READ POST
router.get('/posts', (req, res) => {

    Posts.find()
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
router.post('/posts', (req, res) => {
    
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
        .then(() => res.json('deleted'))
        .catch((err) => console.log(err));
})

//----------COMMENTS-----------//

//ADD A COMMENT
router.post('/posts/createcomment/:_id', (req, res) => {

    let Note = {};
    
    const query = { _id: req.params._id }
    
    //should we check if the post exists before adding the comment?
    const newComment = new Comments({
        body: req.body.body,
        user: req.body.user,
        postId: req.params._id,
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
router.put('/posts/deletecomment/:_id', (req, res) => {
    const filter= {_id: req.params._id};

    Posts.findOne(filter)
    .then( data => {

        let allComments = []
        allComments = data.comments.filter(comment => (
            comment._id != req.body._id
        ))

        Posts.updateOne(
            filter,
            {$set: { comments: [...allComments]}},
        )
        .then(data => {
            
            console.log('filler')
        
            /*WE NEED TO MAKE noticomment BECAUSE REQ.BODY 
            CAN'T BE OUR FILTER SINCE IT HAS _id PROPERTY AND THE COMMENTS
            IN NOTIFCATIONS DON'T*/
            let noticomment = {
                comment: req.body.comment,
                sender: req.body.sender,
                reciever: req.body.reciever
            }
            let notFilter = { data: noticomment }
            console.log(notFilter)
            Notifications.deleteOne(notFilter)
            .then( () => console.log('deleted notification'))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
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
            console.log('Notification made')
            res.send('Notification Sent')
        })
        .catch(err => res.json(err))

        } else {
            console.log('You already liked this post')
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
    
        console.log('decremented')
        //get rid of the notification
        let filter = {
            notType: 'like',
            postId: req.params.postId,
            sender: req.body.user
        }
        return Notifications.deleteOne(filter)
    })
    .then(() => {
        console.log('Notification deleted')
        res.send('Notification deleted')
    })
    .catch(err => res.json(err))
})


//------------CURRENTUSER----------------//

//READ
router.get('/users', (req, res) => {
    allUsers.find()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

//CREATE
router.post('/users', (req, res) => {

    //create a new user
    const newUser = new allUsers({
        pic: req.body.pic,
        username: req.body.username,
        bio: req.body.bio,
        location: req.body.location,
        website: req.body.website
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