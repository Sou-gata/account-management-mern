const express = require("express");
const router = express.Router();

const {
    addAttandance,
    getAttandance,
    getDayAttandance,
    getMonthAttandance,
    getYearAttandance,
    deleteAttandance,
} = require("../controllers/attandanceController");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/add", isAdmin, addAttandance);
router.get("/all", getAttandance);
router.post("/day", getDayAttandance);
router.post("/month", getMonthAttandance);
router.post("/year", getYearAttandance);
router.delete("/:id", isAdmin, deleteAttandance);

module.exports = router;
