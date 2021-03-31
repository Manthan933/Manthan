const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  admin: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  subcode: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: []
  }
});

module.exports = mongoose.model('classroom', ClassroomSchema);
