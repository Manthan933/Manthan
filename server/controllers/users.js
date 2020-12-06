const mongoose = require("mongoose");
const User = require("../models/users.model");

const Get = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Create = async (req, res) => {
  const { username, email, image } = req.body;
  const newUser = new User({ username, email, image });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { Get, Create };
