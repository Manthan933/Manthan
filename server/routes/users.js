const express = require("express");

const Users = require("../controllers/users");

const router = express.Router();

router.get("/:email", Users.Get);
router.post("/", Users.Create);

module.exports = router;
