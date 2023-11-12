const express = require("express");
const router = express.Router();
const {
    addFuelDetails,
    viewFuelDetails,
    deleteFuelDetails,
} = require("../controllers/fuelController");

router.post("/add", addFuelDetails);
router.post("/view", viewFuelDetails);
router.delete("/:id", deleteFuelDetails);

module.exports = router;
