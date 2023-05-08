const Chat = require('../models/chatModel');

const allChats = async (req, res) => {
  const _id = req.user._id;
  try {
    const chats = await Chat.find({ users: { $in: [_id] } }).populate('users', 'username email name userImage').exec();;

    res.status(200).json({ chats });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getChat = async (req, res) => {
  const { chatId } = req.body;
  try {
    const chat = await Chat.findById(chatId);
    res.status(200).json({ success: true, messgae: 'Chat has been sent!!', body: chat });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const sendMessage = async (req, res) => {
  const senderId = req.user._id;
  const { message, reciverId } = req.body;
  const newMessage = {
    sender: senderId,
    message: message,
    seen: false
  };
  try {
    const chat = await Chat.findOneAndUpdate(
      {
        $or: [
          { users: [senderId, reciverId] },
          { users: [reciverId, senderId] },
        ]
      },
      {
        users: [senderId, reciverId],
        $push: { messages: newMessage },
        waitToBeSeen: reciverId
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ chat });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId, chatId } = req.body;
  try {
    await Chat.findOneAndUpdate(
      { _id: chatId },
      { $pull: { messages: { _id: messageId } }, waitToBeSeen: null },
      { new: true }
    );
    res.status(200).json({ success: true, messgae: 'Message has been deleted!!' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.body;
  try {
    await Chat.findByIdAndRemove(chatId);
    res.status(200).json({ success: true, messgae: 'Chat has been deleted!!' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const chatSeen = async (req, res) => {
  const { chatId } = req.body;
  try {
    await Chat.findByIdAndUpdate(chatId, {
      waitToBeSeen: null
    });
    res.status(200).json({ success: true, messgae: 'Chat has been seen!!' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { allChats, sendMessage, deleteMessage, deleteChat, chatSeen, getChat };