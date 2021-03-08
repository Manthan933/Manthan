const express = require("express");
const classroomsRouter = require("./classrooms/classrooms");
const testsRouter = require("./tests/tests");
const questionsRouter = require("./questions/questions");
const usersRouter = require("./users/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Manthan API");
});
router.use("/classrooms", classroomsRouter);
router.use("/questions", questionsRouter);
router.use("/users", usersRouter);
router.use("/tests", testsRouter);

module.exports = router;
