const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcode: { type: String, required: true, default: "" },
  subject: { type: String, required: true, default: "" },
  image: { type: String, required: true, default: "" },
  code: { type: String, required: true },
  instructor: { type: Object, required: true },
  users: { type: Array, default: [] },
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
