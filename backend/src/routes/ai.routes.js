const express = require("express");
const {getReview} = require("../controller/ai.controller");

const router = express.Router();

router.post("/review-code", getReview);

module.exports = router;
