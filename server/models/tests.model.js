const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  classroom: { type: String, required: true },
  marks: { type: Number, required: true },
  rules: { type: Array, required: true },
  duration: { type: String, required: true },
  dueDate: { type: Date, required: true },
  scores: { type: Array, default: [] },
});

module.exports = mongoose.model("Test", TestSchema);
