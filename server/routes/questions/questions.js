const express = require("express");
const { check, validationResult } = require("express-validator");
const Questions = require("../../controllers/questions");

const router = express.Router();

router.post(
  "/",
  [
    check("question", "Please Enter Question").not().isEmpty(),
    check("option1", "Please Enter option1").not().isEmpty(),
    check("option2", "Please Enter option2").not().isEmpty(),
    check("option3", "Please Enter option3").not().isEmpty(),
    check("option4", "Please Enter option4").not().isEmpty(),
  ],
  Questions.Create
);
router.get("/", Questions.Get);
router.delete("/", Questions.Delete);
module.exports = router;
