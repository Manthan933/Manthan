const express = require("express");

const Users = require("../controllers/users");

const router = express.Router();

router.get("/:email", Users.get);
router.get("/id/:id", Users.getId);
router.post("/", Users.create);
router.patch("/:id", Users.update);
router.get("/class/:id", Users.getUsers);

module.exports = router;
