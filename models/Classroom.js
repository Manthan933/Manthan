const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// creating Classroom schema
const ClassroomSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String },
    subCode: { type: String },
    cover: { type: String },
    code: { type: String, required: true, unique: true },
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String },
      email: { type: String },
      avatarURL: { type: String }
    },
    joinedUsers: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }]
  },
  {
    timestamps: true //so that we have createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Classroom', ClassroomSchema);
