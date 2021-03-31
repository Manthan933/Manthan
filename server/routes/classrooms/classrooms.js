const express = require("express");
const { check, validationResult } = require("express-validator");
const Classrooms = require("../../controllers/classrooms");
const {isUser} = require("../../middleware/authmiddleware")
const router = express.Router();

router.post( "/", isUser ,
  [check("name", "Please Enter Name").not().isEmpty()],
  Classrooms.Create
);
router.get("/:code", isUser ,Classrooms.Get);
router.get("/user/:user", isUser ,Classrooms.GetClasses);
router.patch("/:code" , isUser, Classrooms.Join);
router.put(
  "/:code", isUser ,
  [check("name", "Please Enter Name").not().isEmpty()],
  Classrooms.Edit
);
router.patch("/:code/leave", isUser, Classrooms.Leave);
router.delete("/:code", isUser, Classrooms.Delete);

module.exports = router;
