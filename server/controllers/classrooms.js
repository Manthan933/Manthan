const mongoose = require("mongoose");
const Otp = require("otp-generator");
const Classroom = require("../models/classrooms.model");

const get = async (req, res) => {
  const { id } = req.params;
  try {
    const Class = await Classroom.findOne({ code: id });
    res.status(200).json(Class);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getClasses = async (req, res) => {
  const { id } = req.params;
  try {
    const Class = await Classroom.find({ users: id });
    res.status(200).json(Class);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { name, subcode, subject, instructor, users, image } = req.body;
  const code = Otp.generate(6, { specialChars: false });
  const newClassroom = new Classroom({
    name,
    subcode,
    subject,
    code,
    instructor,
    users,
    image,
  });
  try {
    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  const updatedUser = await Classroom.findByIdAndUpdate(
    id,
    { $push: { users: userId } },
    { new: true }
  );
  res.json(updatedUser);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Class with id: ${id}`);
  await Classroom.findByIdAndRemove(id);
  res.json({ message: "Class deleted successfully." });
};

module.exports = { get, getClasses, create, update, deleteOne };
