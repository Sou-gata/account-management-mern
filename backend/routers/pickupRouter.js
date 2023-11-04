const express = require("express");
const router = express.Router();
const {
    addPickup,
    getPickup,
    addDelivery,
    getDelivery,
    getDashboardDetails,
    getIndividualCash,
} = require("../controllers/pickupController");

router.post("/add", addPickup);
router.post("/get-pickup", getPickup);
router.post("/add-delivery", addDelivery);
router.post("/get-delivery", getDelivery);
router.post("/get-dashboard", getDashboardDetails);
router.post("/individual", getIndividualCash);

module.exports = router;
