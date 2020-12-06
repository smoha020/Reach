const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({

    user: String,
    body: String,
    likeCount: Number,
    commentCount: Number,
    createdAt: Date,
    pic: String,
    
})

const Posts = mongoose.model('Posts', PostsSchema)

module.exports = Posts 
