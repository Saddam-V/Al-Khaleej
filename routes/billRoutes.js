const express = require("express");
const billController = require("../controllers/billController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(authController.protect, billController.getAllBill).post(authController.protect, billController.createBill);
router.route("/search/:cat").get(authController.protect, billController.getBillSearch);

router.route("/validate").post(authController.protect, billController.validateData);
router.route("/getNumber/:custName/:custNum?").post(authController.protect, billController.getNumber);
router.route("/findRate").post(authController.protect, billController.findRate);

// router.route("/:id").get(billController.getBill).patch(billController.updateBill).delete(billController.deleteBill);

module.exports = router;
