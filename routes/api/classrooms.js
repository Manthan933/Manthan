const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in radnomatic to get class code
const randomatic = require('randomatic');

const Classroom = require('../../models/Classroom');
const User = require('../../models/User');

// @route    GET api/classroom/
// @desc     Get current users classroom
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const classrooms = await Classroom.find({ users: req.user.id });
    if (!classrooms) {
      return res.status(400).json({ msg: 'There is no classes for this user' });
    }
    res.json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/classroom
// @desc     Create user classroom
// @access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('subject', 'Subject is required').notEmpty(),
  check('subcode', 'Subcode is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const { name, subject, subcode } = req.body;

    try {
      // Using upsert option (creates new doc if no match is found):
      const admin = await User.findById(req.user.id).select('-password');
      const users = [admin._id];
      const code = randomatic('aA0', 6);

      const newClassroom = new Classroom({
        admin,
        name,
        subject,
        subcode,
        code,
        users
      });
      newClassroom.save();
      res.json(newClassroom);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/classroom/:code
// @desc     Get classroom by code
// @access   Private
router.get('/:code', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({
      code: req.params.code,
      users: req.user.id
    });
    if (!classroom) {
      return res.status(400).json({ msg: 'Class does not exist.' });
    }
    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/classroom/:code
// @desc     Join classroom by code
// @access   Private
router.post('/:code', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({ code: req.params.code });
    if (!classroom) {
      return res.status(400).json({ msg: 'Class does not exist.' });
    }
    if (classroom.users.find((user) => req.user.id == user)) {
      return res.status(400).json({ msg: 'Class already exist.' });
    }
    const joined = await Classroom.findOneAndUpdate(
      { code: req.params.code },
      { $push: { users: req.user.id } },
      { new: true }
    );
    res.json(joined);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    Patch api/classroom/:code
// @desc     Edit classroom by code
// @access   Private
router.patch(
  '/:code',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('subject', 'Subject is required').notEmpty(),
  check('subcode', 'Subcode is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { name, subject, subcode } = req.body;
    try {
      const classroom = await Classroom.findOne({
        code: req.params.code,
        users: req.user.id
      });
      if (!classroom) {
        return res.status(400).json({ msg: 'Class does not exist.' });
      }
      if (classroom.admin._id != req.user.id) {
        return res.status(400).json({ msg: 'User not authorized.' });
      }
      const editedClass = await Classroom.findOneAndUpdate(
        { code: req.params.code },
        { $set: { name: name, subcode: subcode, subject: subject } },
        { new: true }
      );
      res.json(editedClass);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/classroom/:code
// @desc     Delete classroom by code
// @access   Private
router.delete('/:code', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({
      code: req.params.code,
      users: req.user.id
    });
    if (!classroom) {
      return res.status(400).json({ msg: 'Class does not exist.' });
    }
    if (classroom.admin._id == req.user.id) {
      await Classroom.findByIdAndDelete(classroom._id);
      res.json({ msg: 'Class deleted successfully.' });
    } else {
      await Classroom.findOneAndUpdate(
        { code: req.params.code },
        { $pull: { users: { $in: req.user.id } } },
        { new: true }
      );
      res.json({ msg: 'Class leaved successfully.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/classroom/:code/:user
// @desc     Delete user from classroom
// @access   Private

router.delete('/:code/:user', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({
      code: req.params.code,
      users: req.user.id
    });
    if (!classroom) {
      return res.status(400).json({ msg: 'Class does not exist.' });
    }
    if (classroom.admin._id != req.user.id) {
      return res.status(400).json({ msg: 'User not authorized.' });
    }
    const updatedClass = await Classroom.findOneAndUpdate(
      { code: req.params.code },
      { $pull: { users: { $in: req.params.user } } },
      { new: true }
    );
    return res.status(200).json({ msg: 'User Removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/classroom/:code/:user
// @desc     Get users from classroom
// @access   Private

router.get('/:code/users', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findOne({
      code: req.params.code,
      users: req.user.id
    });
    if (!classroom) {
      return res.status(400).json({ msg: 'Class does not exist.' });
    }
    const users = await User.find({ _id: { $in: classroom.users } }).select(
      '-password'
    );
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
