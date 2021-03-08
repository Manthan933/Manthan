const express = require("express");

const Questions = require("../../controllers/questions");

const router = express.Router();

router.post("/", Questions.Create);
router.get("/", Questions.Get);
router.delete("/", Questions.Delete);
module.exports = router;
