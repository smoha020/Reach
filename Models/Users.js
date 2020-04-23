const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    }  
})

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;