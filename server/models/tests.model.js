const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classroom: { type: String, required: true },
  marks: { type: Number, required: true },
  questions: { type: Array, required: true },
  rules: { type: Array, required: true },
  scores: { type: Array, required: true, default:[] },
  duration: { type: String, required: true },
  dueDate: { type: String, required: true },
});

module.exports = mongoose.model("Test", TestSchema);
