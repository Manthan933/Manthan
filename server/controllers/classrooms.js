const mongoose = require("mongoose");
const Otp = require("otp-generator");
// const jwt = require("jsonwebtoken");
const Classroom = require("../models/classrooms.model");

const Get = async (req, res) => {
  const { code } = req.params;
  try {
    const Class = await Classroom.findOne({ code: code });
    res.status(200).json(Class);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const GetClasses = async (req, res) => {
  const { id } = req.params;
  try {
    const Class = await Classroom.find({ users: id });
    res.status(200).json(Class);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create classroom
const Create = async (req, res) => {
  const code = Otp.generate(6, { specialChars: false });
  const newClassroom = new Classroom({
    ...req.body,
    code,
  });
  try {
    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Join = async (req, res) => {
  // Get the classroom-code and the userID form the req.params
  const { classroomCode } = req.params;

  // Get the classroom details
  const classroom = await Classroom.findById({ code: classroomCode });
  if (!classroom) {
    return res.status(404).send(`${classroomCode} is an invalid code!`);
  } else {
    // Update the classroom by adding a new user
    const updatedClass = await Classroom.findByIdAndUpdate(
      classroomCode,
      { $push: { users: user } },
      { new: true }
    );
    res.json(updatedClass);
  }
};

const Leave = async (req, res) => {
  // Get the classroom-code and the userID form the req.params
  const { classroomCode, userId } = req.params;

  // Get the classroom details
  const classroom = await Classroom.findById({ code: classroomCode });

  if (!classroom) {
    return res.status(404).send(`${classroomCode} is an invalid code!`);
  } else {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No User with id: ${userId}`);
    } else {
      // Overwrite the user data
      classroom.users = classroom.users.filter((user) => user._id !== userId);

      // Update the classroom with the new users data
      const data = await Classroom.update(
        { code: classroomCode },
        { $set: { users: classroom.users } }
      );
      res.json({ data, success: true });
    }
  }
};

const Delete = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Class with id: ${id}`);
  await Classroom.findByIdAndRemove(id);
  res.json({ message: "Class deleted successfully." });
};

module.exports = { Get, GetClasses, Create, Join, Leave, Delete };
