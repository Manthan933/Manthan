const User = require("../models/users.model");

const Get = async (req, res) => {
  try {
    const data = await User.find(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Create = async (req, res) => {
  const { name, email, image } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    image: image,
  });
  try {
    const data = await newUser.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Delete = async (req, res) => {
  try {
    const data = await User.findOneAndDelete(req.body);
    res.json({ data });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { Get, Create, Delete };
