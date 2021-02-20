const express = require("express");

const Classrooms = require("../controllers/classrooms");

const router = express.Router();

router.post("/", Classrooms.Create);
<<<<<<< HEAD
router.get("/:code", Classrooms.Get);
router.get("/user/:user", Classrooms.GetClasses);
router.patch("/join/:code", Classrooms.Join);
router.patch("/leave/:code", Classrooms.Leave);
router.delete("/:code", Classrooms.Delete);
=======
router.get("/user/:id", Classrooms.GetClasses);
router.patch("/:id", Classrooms.Join);
router.put("/:id", Classrooms.Edit);
router.patch("/:id/leave", Classrooms.Leave);
router.delete("/:id", Classrooms.Delete);
>>>>>>> ba27d0fc3e1381d20891663e732383e8c90e6f1f

module.exports = router;
