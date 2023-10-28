const express = require("express");
const router = express.Router();
const {
    addPickup,
    getPickup,
    addDelivery,
    getDelivery,
    getDashboardDetails,
} = require("../controllers/pickupController");

router.post("/add", addPickup);
router.post("/get-pickup", getPickup);
router.post("/add-delivery", addDelivery);
router.post("/get-delivery", getDelivery);
router.get("/get-dashboard", getDashboardDetails);

module.exports = router;
