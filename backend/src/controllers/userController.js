const User = require('../models/userModel');
const { createToken } = require('../helpers/tokenHelper');

const loginUser = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.login(identifier, password);
    const token = createToken(user._id);
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        userImage: user.userImage.url,
        friends: user.friends,
        friendRequests: user.friendRequests,
      }, token
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });

  }
};
const signupUser = async (req, res) => {
  const { email, username, name, password, rePassword } = req.body;
  const image = req.file;
  try {
    const user = await User.signup(email, username, name, password, rePassword, image);
    const token = createToken(user._id);
    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        userImage: user.userImage.url,
        friends: user.friends,
        friendRequests: user.friendRequests,
      }, token
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }

};

module.exports = { loginUser, signupUser };