const express = require("express");

const Classrooms = require("../controllers/classrooms");
const userAuth = require("../middlewares/userAuth");

const router = express.Router();

router.get("/:code", Classrooms.Get);
router.post("/", Classrooms.Create);
router.get("/user/:id", Classrooms.GetClasses);
router.patch("/:id", Classrooms.Join);
router.patch("/:id/leave", Classrooms.Leave);
router.delete("/:id", Classrooms.Delete);

module.exports = router;
