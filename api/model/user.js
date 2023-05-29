const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
},{
    timestamps:true
});

module.exports = mongoose.model('User', userSchema);
