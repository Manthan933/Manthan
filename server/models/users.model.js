const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  classrooms: { type: Array, required: true, default:[] },
  image : {type:String, required: true,},
});

module.exports = mongoose.model('User', UserSchema);