const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Classroom = require('../../models/Classroom');
const User = require('../../models/User');
const Test = require('../../models/Test');
const Question = require('../../models/Questions');

// Utiliy Functions
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function GenerateTest(Questions, Rules) {
  let i = 0,
    j = 0,
    k = 0;
  let res = [];
  while (i < Rules.length) {
    while (j < Questions.length && Questions[j].type == i + 1) {
      j++;
    }
    let arr = Questions.slice(k, j);
    shuffle(arr);
    k = j;
    res = res.concat(arr.slice(0, Rules[i].noofques));
    i++;
  }
  shuffle(res);
  return res;
}

// @route    GET api/test/:code
// @desc     Get current classroom test
// @access   Private
router.get('/:code', auth, async (req, res) => {
  try {
    const tests = await Test.find(
      { classroom: req.params.code },
      { test: 1, id: 1 }
    );
    if (!tests) {
      return res.status(400).json({ msg: 'There is no test for this class' });
    }
    res.json(tests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/test/:id
// @desc     Create Test
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructure the request
  const { id, test, rules, questions, classroom } = req.body;

  try {
    const newTest = new Test({
      id,
      test,
      classroom,
      rules
    });
    await Question.insertMany(questions);
    await newTest.save();
    return res.status(200).json({ msg: 'Test created sucessfully.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/test/:id
// @desc     Generate test by id
// @access   Private
router.get('/id/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id, {
      rules: 1,
      id: 1,
      classroom: 1,
      scores: 1
    });
    if (!test) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }
    if (test.scores.find((ele) => req.user.id == ele.user._id)) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }
    const classroom = await Classroom.findOne({
      code: test.classroom,
      users: req.user.id
    });
    if (!classroom) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }
    const questions = await Question.find(
      { test: test.id },
      { answer: 0 }
    ).sort({
      type: 1
    });
    const data = GenerateTest(questions, test.rules);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/test/:id
// @desc     Submit test by id
// @access   Private
router.post('/id/:id', auth, async (req, res) => {
  try {
    var score = {};
    var marks = 0;
    const test = await Test.findById(req.params.id, {
      rules: 1,
      id: 1
    });
    const answers = await Question.find(
      { test: test.id },
      { answer: 1, type: 1 }
    ).sort({
      type: 1
    });
    answers.forEach((ele) => {
      if (req.body[ele._id] === ele.answer) {
        if (isNaN(score[ele.type])) score[ele.type] = 0;
        score[ele.type] = score[ele.type] + 1;
      }
    });
    test.rules.forEach((rule) => {
      marks = marks + score[rule.type] * rule.marks;
    });
    const user = await User.findById(req.user.id, {
      name: 1,
      email: 1,
      _id: 1
    });
    await Test.findByIdAndUpdate(req.params.id, {
      $push: { scores: { user: user, marks: marks } }
    });

    res.status(200).send('Submitted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/test/:id
// @desc     Delete test by id
// @access   Private
router.delete('/id/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }
    const classroom = await Classroom.findOne({
      code: test.classroom,
      users: req.user.id
    });
    if (!classroom || classroom.admin._id != req.user.id) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }
    await Question.deleteMany({ test: test.id });
    await Test.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
