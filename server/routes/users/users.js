const express = require("express");
const users = require('../../controllers/users');

const router = express.Router();

router.post('/signup',users.userSignup)
router.post('/login',users.login)

module.exports = router