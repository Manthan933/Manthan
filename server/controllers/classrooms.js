const mongoose = require('mongoose');

const Classroom = require('../models/classrooms.model');

const getAll = async (req, res) => { 
    try {
        const Classrooms = await Classroom.find();
                
        res.status(200).json(Classrooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOne = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Classroom.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const create = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newClassroom = new Classroom({ title, message, selectedFile, creator, tags })

    try {
        await newClassroom.save();

        res.status(201).json(newClassroom );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await Classroom.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deleteOne = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Classroom.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

module.exports = {getAll, getOne, create, update, deleteOne};