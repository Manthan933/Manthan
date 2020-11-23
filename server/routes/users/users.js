const express = require('express');

const Users = require ('../../controllers/users');

const router = express.Router();

router.get('/:email', Users.get);
router.get('/:id/class', Users.getClasses);
router.post('/', Users.create);
router.patch('/:id', Users.update);

module.exports = router;