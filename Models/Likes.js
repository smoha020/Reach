const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({

    user: String,
    postId: String,
    createdAt: Date

})

const Likes = mongoose.model('Likes', LikesSchema)

module.exports = Likes