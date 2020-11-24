const express = require('express');

const Classrooms = require ('../controllers/classrooms');

const router = express.Router();

router.get('/:id', Classrooms.get);
router.post('/', Classrooms.create);
router.get('/user/:id', Classrooms.getClasses);
router.patch('/:id', Classrooms.update);
router.delete('/:id', Classrooms.deleteOne);

module.exports = router;