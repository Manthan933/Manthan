const mongoose = require("mongoose");
const ROLES = require('../config/roles')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name:{type: String,required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType:{type: String, enum:[ROLES.USER,ROLES.TEACHER]}
});

module.exports = mongoose.model("User", UserSchema);
