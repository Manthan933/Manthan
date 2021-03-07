const mongoose = require("mongoose");

const Test = require("../models/tests.model");
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
  var { name, marks, questions, rules, classroom } = req.body;
  const newTest = new Test({
    name,
    marks,
    questions,
    classroom,
    rules,
  });
  try {
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
  const { score, user } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Test with id: ${id}`);
    const test = await Test.findById(id);
    var marks = 0;
    test.rules.forEach((rule) => {
      marks = marks + score[rule.type] * rule.marks;
    });
    const scores = { user: user, marks: marks };
    await Test.findByIdAndUpdate(
      id,
      { $push: { scores: scores } },
      { new: true }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Test with id: ${id}`);
    await Test.findByIdAndRemove(id);
    res.json({ message: "Test deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Generate = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    const data = GenerateTest(test.questions, test.rules);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { Get, GetTests, Create, Update, Delete, Generate };
