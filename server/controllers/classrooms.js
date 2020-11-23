const mongoose = require('mongoose');

const Classroom = require('../models/classrooms.model');
const Test = require ('../models/tests.model');

const get = async (req, res) => { 
  const id = req.params;
  try{
    const Class = await Classroom.findById(id);
    res.status(200).json(Classrooms);
  } 
  catch(error){
    res.status(404).json({ message: error.message });
  }
}

const getTests = async (req, res) => { 
  const id = req.params;
  try{
    const Class = await Classroom.findById(id);
    let Tests = [];
    for (let index = 0; index < Class.tests.length; index++) {
      const test = await Test.findById(Class.tests[index])
      Tests = [...Tests, test];
    }
    res.status(200).json(Tests);
  }
  catch (error){
    res.status(404).json({ message: error.message });
  }
}

const getUsers = async (req,res) =>{
  const id = req.params;
  try{
    const Class = await Classroom.findById(id);
    res.status(200).json(Classroom.users);
  }catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const create = async (req, res) => {
  const { name, code, instructor, tests, users } = req.body;
  const newClassroom = new Classroom({ name, code, instructor, tests, users })
  try {
    await newClassroom.save();
    res.status(201).json(newClassroom );
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { name, code, instructor, tests, users } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Class with id: ${id}`);
  const updatedClass = { name, code, instructor, tests, users, _id: id };
  await Classroom.findByIdAndUpdate(id, updatedClass, { new: true });
  res.json(updatedClass);
}

const deleteOne = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Class with id: ${id}`);
    await Classroom.findByIdAndRemove(id);
    res.json({ message: "Class deleted successfully." });
}

module.exports = {get, getTests, getUsers, create, update, deleteOne};