const validator = require('validator');

const validateSignup = (email, username, name, password, rePassword) => {
  if (!validator.isEmail(email)) {
    return 'Invalid email';
  }
  if (!validator.isAlphanumeric(username)) {
    return 'Username can only contain letters and numbers';
  }
  if (!validator.isLength(username, { min: 3, max: 20 })) {
    return 'Username must be between 3 and 20 characters';
  }
  if (!validator.isStrongPassword(password)) {
    return 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one symbol';
  }
  if (password !== rePassword) {
    return 'Passwords are not matched';
  }
  if (!validator.isLength(name, { min: 2, max: 30 })) {
    return 'Name must be between 2 and 30 characters';
  }
  return false;
};

const validateLogin = (identifier, password) => {
  if (!identifier || !password) {
    return 'Please fill all fields';
  }
  return false;
};

const isEmail = (identifier) => {
  if (validator.isEmail(identifier)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateSignup, validateLogin, isEmail };