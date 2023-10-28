const express = require("express");
const router = express.Router();

const {
    addAttandance,
    getAttandance,
    getDayAttandance,
    getMonthAttandance,
    getYearAttandance,
} = require("../controllers/attandanceController");

router.post("/add", addAttandance);
router.get("/all", getAttandance);
router.post("/day", getDayAttandance);
router.post("/month", getMonthAttandance);
router.post("/year", getYearAttandance);

module.exports = router;
