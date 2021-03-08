const Question = require("../models/questions.model");

const Get = async (req, res) => {
  try {
    const data = await Question.find(req.body, {answer : 1});
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Create = async (req, res) => {
  const { questions } = req.body;
  try {
    const data = await Question.insertMany(questions);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Delete = async (req, res) => {
  try {
    const data = 
    res.json({deletedCount : data.deletedCount});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { Get, Create, Delete };
