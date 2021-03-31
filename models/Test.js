const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  test: {
    name: { type: String, required: true },
    marks: { type: Number, required: true },
    duration: { type: Date, required: true },
    dueDate: { type: Date, required: true }
  },
  classroom: { type: String, required: true },
  rules: { type: Array, required: true },
  scores: { type: Array, default: [] }
});

module.exports = mongoose.model('Test', TestSchema);
