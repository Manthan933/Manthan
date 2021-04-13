const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true},
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: String, required: true },
  type: { type: String, required: true },
  test: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
