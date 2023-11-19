const express = require("express");
const router = express.Router();
const {
    addFuelDetails,
    viewFuelDetails,
    deleteFuelDetails,
} = require("../controllers/fuelController");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/add", isAdmin, addFuelDetails);
router.post("/view", viewFuelDetails);
router.delete("/:id", isAdmin, deleteFuelDetails);

module.exports = router;
