const mongoose = require("mongoose");

const Test = require("../models/tests.model");
const Question = require("../models/questions.model");
const { GenerateTest, Sort } = require("./test_generator");

const Get = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    res.status(200).json(test);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Create = async (req, res) => {
  var {
    id,
    name,
    marks,
    rules,
    questions,
    classroom,
    duration,
    dueDate,
  } = req.body;
  const newTest = new Test({
    id,
    name,
    marks,
    classroom,
    rules,
    duration,
    dueDate,
  });
  try {
    await Question.insertMany(questions);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const GetTests = async (req, res) => {
  const { code } = req.params;
  try {
    const Tests = await Test.find({ classroom: code });
    res.status(200).json(Tests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Update = async (req, res) => {
  const { id } = req.params;
  const { response, user } = req.body;
  try {
    var score = {};
    var marks = 0;
    const test = await Test.findById(id, { rules: 1, id: 1 });
    const answers = await Question.find(
      { test: test.id },
      { answer: 1, type: 1 }
    );
    answers.forEach((ele) => {
      if (response[ele._id] === ele.answer) {
        if (isNaN(score[ele.type])) score[ele.type] = 0;
        score[ele.type] = score[ele.type] + 1;
      }
    });
    test.rules.forEach((rule) => {
      marks = marks + score[rule.type] * rule.marks;
    });
    await Test.findByIdAndUpdate(
      id,
      { $push: { scores: { user: user, marks: marks } } },
      { new: true }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Question.deleteMany({ test: id });
    await Test.findOneAndDelete({ id: id });
    res.json({ message: "Test deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Generate = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id, { rules: 1, id: 1 });
    const questions = await Question.find(
      { test: test.id },
      { answer: 0 }
    ).sort({
      type: 1,
    });
    const data = GenerateTest(questions, test.rules);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { Get, GetTests, Create, Update, Delete, Generate };
