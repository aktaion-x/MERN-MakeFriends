// const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary');
const { validateSignup, validateLogin, isEmail } = require('../helpers/validatorsHelper');

const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  userImage: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  friendRequests: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });


userSchema.statics.signup = async function (email, username, name, password, rePassword, image) {
  const validationError = validateSignup(email, username, name, password, rePassword);
  if (validationError) {
    throw Error(validationError);
  }
  const isEmailExists = await this.findOne({ email });
  if (isEmailExists) {
    throw Error('Email already in use');
  }
  const isUsernameExists = await this.findOne({ username });
  if (isUsernameExists) {
    throw Error('Username already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const result = await cloudinary.uploader.upload(image.path, {
    folder: `users/${username}/`,
    width: 300
  });
  const user = await this.create({
    username,
    email,
    name,
    password: hash,
    userImage: {
      public_id: result.public_id,
      url: result.secure_url
    }
  });
  return user;
};

userSchema.statics.login = async function (identifier, password) {
  const validationError = validateLogin(identifier, password);
  if (validationError) {
    throw Error(validationError);
  }
  if (isEmail(identifier)) {
    var user = await this.findOne({ email: identifier });
  } else {
    var user = await this.findOne({ username: identifier });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorect passowrd');
  }
  return user;
};


module.exports = mongoose.model('User', userSchema);



/* 
const productSchema = new Schema({
  name: String,
  image: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}, { timestamps: true });

module.exports = model('Product', productSchema);
*/


/* 
User.findById(reciverId)
user.friends.includes(reciverId)
user.friendRequests.includes(reciverId)



*/