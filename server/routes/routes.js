const express = require("express");
const classroomsRouter = require("./classrooms");
const testsRouter = require("./tests");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Manthan API");
});
router.use("/classrooms", classroomsRouter);
router.use("/tests", testsRouter);

module.exports = router;
