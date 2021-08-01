const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// creating Classroom schema
const ClassroomSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    subcode: { type: String, required: true },
    image: {
      type: Buffer
    },
    code: { type: String, required: true, unique: true },
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, required: true },
      avatarURL: { type: String, required: true }
    },
    joinedUsers: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }]
  },
  {
    timestamps: true //so that we have createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Classroom', ClassroomSchema);
