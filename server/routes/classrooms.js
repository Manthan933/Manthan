const express = require("express");

const Classrooms = require("../controllers/classrooms");

const router = express.Router();

router.post("/", Classrooms.Create);
router.get("/:code", Classrooms.Get);
router.get("/user/:user", Classrooms.GetClasses);
router.patch("/join/:code", Classrooms.Join);
router.patch("/leave/:code", Classrooms.Leave);
router.delete("/:code", Classrooms.Delete);

module.exports = router;
