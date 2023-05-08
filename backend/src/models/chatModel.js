const { Schema, model, default: mongoose } = require('mongoose');

// Chat Schema
const chatSchema = new Schema({
  users: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
  }],
  waitToBeSeen: {
    type: mongoose.Types.ObjectId,
  }
}, { timestamps: true });

const Chat = model('Chat', chatSchema);

module.exports = Chat;


/* 
in explore: getAllChats
const chats = Chat.find({user: {$in: [req.user._id]}})

getAllChats
sendMessage
deleteMessage: delete in both
deleteChat: delete in both


*/
