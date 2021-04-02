const mongoose = require('mongoose');
const Test = require('./Test');

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

// Delete all corresponding tests to a classroom after the latter is deleted
ClassroomSchema.post('remove', async (currentClass, next) => {
  await Test.findOneAndDelete({
    classroom: currentClass.code
  });
  next();
});

module.exports = mongoose.model('classroom', ClassroomSchema);
