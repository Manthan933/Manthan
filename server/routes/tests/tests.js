const express = require("express");
const { check, validationResult } = require("express-validator");
const Tests = require("../../controllers/tests");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Please Enter Name").not().isEmpty(),
    ,
    check("marks", "Please Enter Marks").not().isEmpty(),
    ,
    check("minutes", "Please Enter minutes").not().isEmpty(),
  ],
  Tests.Create
);
router.get("/:id", Tests.Get);
router.get("/class/:code", Tests.GetTests);
router.patch("/:id", Tests.Update);
router.delete("/:id", Tests.Delete);
router.get("/:id/start", Tests.Generate);

module.exports = router;
