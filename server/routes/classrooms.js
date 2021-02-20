const express = require("express");

const Classrooms = require("../controllers/classrooms");

const router = express.Router();

router.post("/", Classrooms.Create);
router.get("/user/:id", Classrooms.GetClasses);
router.patch("/:id", Classrooms.Join);
router.put("/:id", Classrooms.Edit);
router.patch("/:id/leave", Classrooms.Leave);
router.delete("/:id", Classrooms.Delete);

module.exports = router;
