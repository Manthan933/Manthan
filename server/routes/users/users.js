const express = require('express');

const Users = require ('../../controllers/users');

const router = express.Router();

router.get('/', Users.getAll);
router.post('/', Users.create);
router.get('/:email', Users.getOne);
router.patch('/:id', Users.update);
router.delete('/:id', Users.deleteOne);

module.exports = router;