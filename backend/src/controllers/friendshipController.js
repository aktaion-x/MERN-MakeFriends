const mongoose = require('mongoose');
const isValidId = mongoose.Types.ObjectId.isValid;
const User = require('../models/userModel');

const requestFriendship = async (req, res) => {
  const senderId = req.user._id;
  const reciverId = req.params._id;
  if (!isValidId(reciverId)) {
    return res.status(400).json({ success: false, message: 'ID is not valid!' });
  }
  try {
    const friendExists = await User.findById(reciverId);
    if (!friendExists) {
      return res.status(400).json({ success: false, message: 'User does not exists!' });
    }
    const user = await User.findById(senderId);
    if (user.friends.includes(reciverId)) {
      return res.status(400).json({ success: false, message: "Friend already in friends list" });
    }
    if (user.friendRequests.includes(reciverId)) {
      return res.status(400).json({ success: false, message: "Friend request already sent" });
    }

    user.friendRequests.push(reciverId);
    await user.save();
    res.status(200).json({ success: true, message: "Friend request sent" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const cancelRequestFriendship = async (req, res) => {
  const senderId = req.user._id;
  const reciverId = req.params._id;
  if (!isValidId(reciverId)) {
    return res.status(400).json({ success: false, message: 'ID is not valid!' });
  }
  try {
    await User.findByIdAndUpdate(senderId, { $pull: { friendRequests: reciverId } });
    res.status(200).json({ success: true, message: "Friendship request have been canceled!!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const acceptFriendship = async (req, res) => {
  const senderId = req.user._id;
  const reciverId = req.params._id;
  if (!isValidId(reciverId)) {
    return res.status(400).json({ success: false, message: 'ID is not valid!' });
  }
  try {
    const reciverUser = await User.findById(reciverId);
    if (!reciverUser) {
      return res.status(400).json({ success: false, message: 'User does not exists!' });
    }
    if (!reciverUser.friendRequests.includes(senderId)) {
      return res.status(400).json({ success: false, message: 'Friendship request does not exists!' });
    }
    const senderUser = await User.findById(senderId);
    if (senderUser.friends.includes(reciverId)) {
      return res.status(400).json({ success: false, message: "Friend already in friends list" });
    }
    await reciverUser.updateOne({ $pull: { friendRequests: senderId } });
    reciverUser.friends.push(senderId);
    senderUser.friends.push(reciverId);
    await senderUser.save();
    await reciverUser.save();
    res.status(200).json({ success: true, message: "Congrats! you are Friends now!!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const cancelFriendship = async (req, res) => {
  const senderId = req.user._id;
  const reciverId = req.params._id;
  if (!isValidId(reciverId)) {
    return res.status(400).json({ success: false, message: 'ID is not valid!' });
  }
  try {

    const reciverUser = await User.findById(reciverId);
    if (!reciverUser) {
      return res.status(400).json({ success: false, message: 'User does not exists!' });
    }

    await reciverUser.updateOne({ $pull: { friendRequests: senderId } });
    await reciverUser.save();
    res.status(200).json({ success: true, message: "Friendship request have been canceled!!" });

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const removeFriendship = async (req, res) => {
  const senderId = req.user._id;
  const reciverId = req.params._id;
  if (!isValidId(reciverId)) {
    return res.status(400).json({ success: false, message: 'ID is not valid!' });
  }
  try {
    const reciverUser = await User.findById(reciverId);
    if (!reciverUser) {
      return res.status(400).json({ success: false, message: 'User does not exists!' });
    }
    await reciverUser.updateOne({
      $pull: {
        friendRequests: senderId,
        friends: senderId
      }
    });
    await User.findByIdAndUpdate(senderId, {
      $pull: {
        friendRequests: reciverId,
        friends: reciverId
      }
    });
    res.status(200).json({ success: true, message: "Friendship has been removed!!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};



module.exports = { requestFriendship, acceptFriendship, removeFriendship, cancelRequestFriendship, cancelFriendship };