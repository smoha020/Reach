const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({

    body: String,
    user: String,
    postId: String,
    createdAt: Date,
    pic: String,

})

const Comments = mongoose.model('Comments', CommentsSchema)

module.exports = Comments