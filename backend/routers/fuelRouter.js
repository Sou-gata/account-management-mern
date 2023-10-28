const express = require("express");
const router = express.Router();
const {
    addFuelDetails,
    viewFuelDetails,
} = require("../controllers/fuelController");

router.post("/add", addFuelDetails);
router.post("/view", viewFuelDetails);

module.exports = router;
