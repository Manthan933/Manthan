const express = require("express");
const { check, validationResult } = require("express-validator");
const Tests = require("../../controllers/tests");
const {isUser , isTeacher} = require("../../middleware/authmiddleware");
const router = express.Router();

router.post("/", isTeacher ,Tests.Create);
router.get("/:id",isUser , Tests.Get);
router.get("/class/:code", isUser ,Tests.GetTests);
router.patch("/:id",isTeacher ,Tests.Update);
router.delete("/:id",isTeacher ,Tests.Delete);
router.get("/:id/start", isTeacher,Tests.Generate);

module.exports = router;
