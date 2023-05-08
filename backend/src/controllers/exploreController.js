const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const friendshipRequests = async (req, res) => {
  const _id = req.user._id;
  try {
    const user = await User.findOne({ _id }).populate('friendRequests', 'username email name userImage').exec();
    const friendRequests = user.friendRequests;
    res.status(200).json({ friendRequests });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });

  }
};

const friendshipAccepts = async (req, res) => {
  const _id = req.user._id;
  try {
    const users = await User.find({ friendRequests: { $in: [_id] } }).select([
      'userImage',
      '_id',
      'username',
      'email',
      'name'
    ]);
    res.status(200).json({ users });

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const friends = async (req, res) => {
  const _id = req.user._id;
  try {
    const user = await User.findOne({ _id }).populate('friends', 'username email name userImage').exec();
    const friends = user.friends;
    res.status(200).json({ friends });

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });

  }
};

const allUsers = async (req, res) => {
  const _id = req.user._id;
  try {
    const users = await User.find({
      $and: [
        { friendRequests: { $nin: [_id] } },
        { friends: { $nin: [_id] } },
        { _id: { $nin: _id } },
      ]
    });
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });

  }
};

const generateToken = async (req, res) => {
  const _id = req.params._id;
  console.log(_id);
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
  res.status(200).json({ token });
};

module.exports = { friendshipRequests, friends, friendshipAccepts, allUsers, generateToken };