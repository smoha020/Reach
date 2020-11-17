const mongoose = require('mongoose');

const userImageSchema = new mongoose.Schema({

    user: String,
    pic: {
        data: Buffer, 
        contentType: String,
        name: String
    }

})

const userImage = mongoose.model('userImage', userImageSchema)

module.exports = userImage