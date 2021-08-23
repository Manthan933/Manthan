const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
var multer = require('multer');
var upload = multer();

const Classroom = require('../../models/Classroom');
const User = require('../../models/User');
const Test = require('../../models/Test');
const Question = require('../../models/Questions');

// Utiliy Functions
function createData(name, email, marks, total, percentage) {
  return { name, email, marks, total, percentage };
}

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

//function DuplicateQuestion(ques) {
//  var read_vals = [];
//  var flag = 0;
//  for (var j = 0; j < ques.length; j++) {
//    read_vals[j] = ques[j];
//  }
//  for (var i = 0; i < ques.length; i++) {
//    flag = 0;
//    for (var k = 0; k < ques.length; k++) {
//      if (ques[i] === read_vals[k]) {
//        flag = flag + 1;
//      }
//      if (flag !== 1) {
//        return res.json({ msg: 'This question already exists' });
//      }
//    }
//  }
//}

// @route    GET api/test/:code
// @desc     Get current classroom tests
// @access   Private
router.get('/:code', auth, async (req, res) => {
  try {
    const tests = await Test.find({ classroom: req.params.code }, { rules: 0 });
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
  const { details, rules, questions } = req.body;
  const { name, testId, durationHrs, durationMin, code, marks } = details;
  var isAdmin = await Classroom.findOne({ code: code }).then((value) => {
    return value.author._id.toString() === req.user.id;
  });

  if (!isAdmin)
    return res.status(400).json({ err: "You don't have Admin access to this classroom" });

  /* Validate incoming Post request on backend as well
    1. Check if rules have marks > 0
    2. Calculate total marks based on rules and questions
    3. Set test id of each question based on the id passed in the id field of request and not individual question
    4. Validate if the test has a unique name 
  */

  // save validation errors in an array
  var validationErrors = [];

  // check if due date is in the past
  var dueDate = new Date(details.dueDate);
  var currDate = new Date();

  if (
    dueDate.getDate() < currDate.getDate &&
    dueDate.getMonth() < currDate.getMonth() &&
    dueDate.getFullYear() < currDate.getFullYear()
  )
    validationErrors.push('Due Date cannot be in the past');

  // check if test name is unique
  if (await Test.findOne({ name: name, classroom: code }))
    validationErrors.push(`${name} is already created`);

  if (validationErrors.length) return res.status(400).json({ err: validationErrors });

  try {
    const newTest = new Test({
      testId,
      name,
      marks,
      dueDate,
      duration: { hrs: durationHrs, min: durationMin },
      classroom: code,
      rules
    });

    await Question.insertMany(questions);

    await newTest.save();
    return res.status(200).json(newTest);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/test/:id
// @desc     Generate test by id
// @access   Private
router.get('/start/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }
    if (test.scores.find((ele) => req.user.id == ele._id)) {
      return res.status(400).json({ msg: 'Test has been already attempted.' });
    }
    const classroom = await Classroom.findOne({
      code: test.classroom,
      joinedUsers: req.user.id
    });
    if (!classroom) {
      return res.status(400).json({ msg: 'You have not been enrolled for this test.' });
    }
    const questions = await Question.find({ testId: test.testId }, { answer: 0 }).sort({
      type: 1
    });
    const data = GenerateTest(questions, test.rules);
    res.json({
      data: data,
      name: test.name,
      duration: test.duration
    });
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
    const test = await Test.findById(req.params.id);

    if (!test) return res.status(400).json({ msg: 'Test does not exists.' });

    if (!(await Classroom.findOne({ code: test.classroom, joinedUsers: req.user.id }))) {
      return res.status(400).json({ msg: "You're not enrolled in this class." });
    }

    if (test.scores.find((ele) => req.user.id == ele._id)) {
      return res.status(400).json({ msg: 'Test has been already attempted.' });
    }

    const ques = await Question.find({ testId: test.testId }, { answer: 1, type: 1 }).sort({
      type: 1
    });
    ques.forEach((ele) => {
      if (isNaN(score[ele.type])) score[ele.type] = 0;
      if (req.body[ele._id] === ele.answer) {
        score[ele.type] = score[ele.type] + 1;
      }
    });
    test.rules.forEach((rule) => {
      marks = marks + score[rule.type] * rule.marks;
    });
    const { name, _id, email, avatarURL } = await User.findById(req.user.id, {
      password: 0
    });

    console.log({ name, _id, email, avatarURL, marks });
    await Test.findByIdAndUpdate(req.params.id, {
      $push: {
        scores: { name, _id, email, avatarURL, marks, maxMarks: parseFloat(test.marks, 10) }
      }
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
      joinedUsers: req.user.id
    });
    if (!classroom || classroom.author._id != req.user.id) {
      return res.status(400).json({ msg: 'Test does not existyha .' });
    }
    await Question.deleteMany({ testId: test.testId });
    await Test.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/score/:id
// @desc     GET Scores of current test
// @access   Private
router.get('/id/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id, {
      rules: 0
    });
    if (!test) {
      return res.status(400).json({ msg: 'Test does not exist.' });
    }

    var isAdmin = await Classroom.findOne({ code: test.classroom }).then((value) => {
      return value.author._id.toString() === req.user.id;
    });

    if (!isAdmin)
      return res.status(400).json({ err: "You don't have Admin access to this classroom" });

    return res.status(200).json(test);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
// @route    POST api/addQuestionFromCsv
// @desc     Add Questions from CSV file
// @access   Private
// router.post('/addQuestionFromCsv', auth, upload.array('quesFile'), async (req, res) => {
//   if (!req.files[0]) res.send({ message: 'No File Received' });
//   else if (
//     req.files[0].originalname.split('.')[req.files[0].originalname.split('.').length - 1] !== 'csv'
//   )
//     res.send({ message: 'Invalid' });
//   else {
//     let fileBuffer = req.files[0].buffer;
//     console.log(req.files[0]);
//     var fs = require('fs');
//     var parse = require('csv-parse');
//     var csvData = [];
//     fs.writeFileSync(`public/${'temp'}.csv`, fileBuffer);
//
//     fs.watch(`public`, (eventType, filename) => {
//       console.log('\nThe file', filename, 'was modified!');
//     });
//
//     fs.createReadStream(`public/${'temp'}.csv`)
//       .pipe(parse({ delimiter: ',' }))
//       .on('data', (csvrow) => {
//         csvData.push(csvrow);
//       })
//       .on('end', () => {
//         var obj = [];
//         for (var i = 1; i < csvData.length; i++) {
//           var temp = {};
//           var curr = csvData[i];
//           var head = csvData[0];
//           for (var j = 0; j < head.length; j++) {
//             temp[head[j]] = curr[j];
//           }
//           obj.push(temp);
//         }
//         console.log(obj);
//         res.send(obj);
//         fs.unlinkSync(`public/${'temp'}.csv`);
//       })
//       .on('error', (err) => {
//         res.status(500).send({ error: err });
//       });
//   }
// });

module.exports = router;
