const express = require('express');

const Classrooms = require ('../../controllers/classrooms');

const router = express.Router();

router.get('/', Classrooms.getAll);
router.post('/', Classrooms.create);
router.get('/:id', Classrooms.getOne);
router.patch('/:id', Classrooms.update);
router.delete('/:id', Classrooms.deleteOne);

module.exports = router;