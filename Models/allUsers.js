const mongoose = require('mongoose');

const allUsersSchema = new mongoose.Schema({

    pic: String,
    username: String,
    password: String,
    email: String,
    joinDate: Date,
    bio: String, 
    location: String,
    website: String,

})

const allUsers = mongoose.model('allUsers', allUsersSchema)

module.exports = allUsers