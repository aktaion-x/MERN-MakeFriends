const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', require('./src/routes/userRoute'));
app.use('/api/v1/chat', require('./src/routes/chatRoute'));
app.use('/api/v1/friendship', require('./src/routes/friendshipRoute'));
app.use('/api/v1/explore', require('./src/routes/exploreRoute'));

mongoose.connect(process.env.MONGO_URI, { dbName: 'chat-app' })
  .then(() => {
    app.listen(port, () => console.log('Server is listening on port ' + port));
  }).catch((err) => {
    console.log(err);
  });