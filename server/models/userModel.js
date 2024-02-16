const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  selfDepiction: String,
  idealPartnerDepiction: String
 
}, { versionKey: false });

const User = mongoose.model('user', userSchema);

module.exports = User;