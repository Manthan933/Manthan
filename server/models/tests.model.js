const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  name : { type: String, required: true }, 
  classroom:{type: String, required:true},
  marks : { type: Number, required: true }, 
  questions : { type: Array, required: true }, 
  rules : { type: Array, required: true }, 
  scores : { type: Array, required: true }, 
  duration : { type: String, required: true }
});

module.exports = mongoose.model('Test', TestSchema);