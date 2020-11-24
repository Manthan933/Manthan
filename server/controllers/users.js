const mongoose = require('mongoose');
const User = require('../models/users.model'); 

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

const getId = async (req, res) => { 
  const { id } = req.params;
  try{
    const user = await User.findById(id); 
    res.status(200).json(user);
  } 
  catch (error){
    res.status(404).json({ message: error.message });
  }
}

const getUsers = async (req, res) => { 
  const { id } = req.params;
    try{
      const users = await User.find({classrooms:id});
      res.status(users);
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
  const { classId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
  const updatedUser = await User.findByIdAndUpdate(id, {$push:{classrooms: classId}}, { new: true });
  res.json(updatedUser);
}

module.exports = { get, getId, getUsers, create, update};