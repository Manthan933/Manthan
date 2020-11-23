const mongoose = require('mongoose');

const User = require('../models/users.model');
const Classroom = require('../models/classrooms.model'); 

const get = async (req, res) => { 
  const { email } = req.params;
  try{
    const user = await User.findOne({email : email}); 
    res.status(200).json(user);
  } 
  catch (error){
    res.status(404).json({ message: error.message });
  }
}

const getClasses = async (req, res) => { 
  const { id } = req.params;
  try{
    const user = await User.findById(id);
    let Classes = [];
    for (let index = 0; index < user.classrooms.length; index++) {
      const Class = await Classroom.findById(user.classrooms[index]);
      Classes = [...Classes, Class];
    }
    res.status(200).json(Classes);
  } 
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const create = async (req, res) => {
  const { username, email, classrooms,image } = req.body;
  const newUser = new User({ username, email, classrooms, image })
  try{
    await newUser.save();
    res.status(201).json(newUser );
  }
  catch (error){
    res.status(409).json({ message: error.message });
  }
}

const update = async (req, res) => {
  const { id } = req.params;
  const { username, email, classrooms, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
  const updatedUser = { username, email, image, classrooms, _id: id };
  await User.findByIdAndUpdate(id, updatedUser, { new: true });
  res.json(updatedUser);
}

module.exports = { get, getClasses, create, update};