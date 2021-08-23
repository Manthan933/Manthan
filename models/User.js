const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// creating user schema
const UserSchema = new Schema(
  {
    // all below fields are required
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarURL: { type: String },
    joinedClasses: [{ type: String, ref: 'Classroom ' }]
  },
  {
    timestamps: true //so that we have createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('User', UserSchema);
