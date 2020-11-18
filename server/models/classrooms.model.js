const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  instructor: { type: String, required: true },
  tests: { type: Array, required: true, default:[] }
});

module.exports = mongoose.model('Classroom', ClassroomSchema);