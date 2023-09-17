const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
  return token;
};

module.exports = { createToken };