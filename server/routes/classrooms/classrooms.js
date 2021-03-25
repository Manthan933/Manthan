const express = require("express");
const { check, validationResult } = require("express-validator");
const Classrooms = require("../../controllers/classrooms");

const router = express.Router();

router.post(
  "/",
  [check("name", "Please Enter Name").not().isEmpty()],
  Classrooms.Create
);
router.get("/:code", Classrooms.Get);
router.get("/user/:user", Classrooms.GetClasses);
router.patch("/:code", Classrooms.Join);
router.put(
  "/:code",
  [check("name", "Please Enter Name").not().isEmpty()],
  Classrooms.Edit
);
router.patch("/:code/leave", Classrooms.Leave);
router.delete("/:code", Classrooms.Delete);

module.exports = router;
