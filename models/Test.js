const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  testId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  marks: { type: Number, required: true },
  duration: {
    hrs: { type: String, required: true },
    min: { type: String, required: true }
  },
  dueDate: { type: Date, required: true },
  classroom: { type: String, required: true },
  rules: { type: Array, required: true },
  scores: { type: Array, default: [] }
});

module.exports = mongoose.model('Test', TestSchema);
