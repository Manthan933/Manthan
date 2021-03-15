const Classroom = require("../models/classrooms.model");
const randomize = require("randomatic")

const Otp = () => {
  const otp = randomize("aA0", 6);
  return otp;
};

const Get = async (req, res) => {
  const { code } = req.params;
  try {
    const data = await Classroom.findOne({ code: code });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const GetClasses = async (req, res) => {
  const { user } = req.params;
  try {
    const data = await Classroom.find({ users: user });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Create = async (req, res) => {
  const { name, subcode, subject, instructor, users, image } = req.body;
  const code = Otp();
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
    console.log(error)
    res.status(409).json({ message: error.message });
  }
};

const Join = async (req, res) => {
  const { code } = req.params;
  const { user } = req.body;
  try {
    const updatedClass = await Classroom.findOneAndUpdate(
      { code: code },
      { $push: { users: user } },
      { new: true }
    );
    res.json(updatedClass);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Edit = async (req, res) => {
  const { code } = req.params;
  const { name, subcode, subject } = req.body;
  try {
    const editedClass = await Classroom.findOneAndUpdate(
      { code: code },
      { $set: { name: name, subcode: subcode, subject: subject } },
      { new: true }
    );
    res.json(editedClass);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Leave = async (req, res) => {
  const { code } = req.params;
  const { user } = req.body;
  try {
    const updatedUser = await Classroom.findOneAndUpdate(
      { code: code },
      { $pull: { users: { $in: user } } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Delete = async (req, res) => {
  const { code } = req.params;
  try {
    await Classroom.findOneAndRemove({ code: code });
    res.json({ message: "Class deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { Get, GetClasses, Create, Edit, Join, Leave, Delete };
