const express = require('express');
const classroomsRouter = require('./classroom/classroom');
const testsRouter = require('./tests/tests');
const usersRouter = require('./users/users');

const router = express.Router();

router.get('/',(req,res)=>{   
    res.send('Welcome to Manthan API');
})

router.use('/classrooms', classroomsRouter);
router.use('/tests', testsRouter);
router.use('/users', usersRouter);

module.exports = router;