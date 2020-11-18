const mongoose = require('mongoose');

const User = require('../models/users.model');

const getAll = async (req, res) => { 
    try {
        const Users = await User.find();
                
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOne = async (req, res) => { 
    const { email } = req.params;

    try {
        const user = await User.findOne({email : email});
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const create = async (req, res) => {
    const { username, email, classrooms } = req.body;

    const newUser = new User({ username, email, classrooms })
    try {
        await newUser.save();

        res.status(201).json(newUser );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { username, email, classrooms } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { username, email, classrooms, _id: id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}

const deleteOne = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
}
module.exports = { getAll, getOne, create, update, deleteOne};