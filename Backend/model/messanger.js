const mongoose = require('mongoose') 

// Message Schema
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    senderName: { type: String }
}) 

const Message = mongoose.model('Message', messageSchema) 

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    socketId: { type: String, required: false }
}) 

const User = mongoose.model('User', userSchema) 

module.exports = { Message, User } 
