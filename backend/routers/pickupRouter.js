const express = require("express");
const router = express.Router();
const {
    addPickup,
    getPickup,
    addDelivery,
    getDelivery,
    getDashboardDetails,
    getIndividualCash,
    deleteDelevary,
} = require("../controllers/pickupController");

router.post("/add", addPickup);
router.post("/get-pickup", getPickup);
router.post("/add-delivery", addDelivery);
router.post("/get-delivery", getDelivery);
router.post("/get-dashboard", getDashboardDetails);
router.post("/individual", getIndividualCash);
router.delete("/:id", deleteDelevary);

module.exports = router;
