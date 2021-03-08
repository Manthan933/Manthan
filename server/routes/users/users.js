const express = require("express");

const Users = require("../../controllers/users");

const router = express.Router();

router.post("/", Users.Create);
router.get("/", Users.Get);
router.delete("/", Users.Delete);
module.exports = router;
