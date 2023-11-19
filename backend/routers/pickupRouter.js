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
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/add", isAdmin, addPickup);
router.post("/get-pickup", getPickup);
router.post("/add-delivery", isAdmin, addDelivery);
router.post("/get-delivery", getDelivery);
router.post("/get-dashboard", getDashboardDetails);
router.post("/individual", getIndividualCash);
router.delete("/:id", isAdmin, deleteDelevary);

module.exports = router;
