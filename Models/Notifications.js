const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({

    notType: String,
    sender: String,
    reciever: String,
    postId: String,
    read: Boolean,
    createdAt: Date
    
})

const Notifications = mongoose.model('Notifications', NotificationsSchema);

module.exports = Notifications;