const express = require("express");
const returnController = require("../controllers/returnController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, authController.restrictTo("admin"), returnController.getAllReturn)
  .post(authController.protect, authController.restrictTo("admin"), returnController.createReturn);
router.route("/search/:cat").get(authController.protect, authController.restrictTo("admin"), returnController.getReturnSearch);
// router.route("/:id").get(returnController.getReturn).patch(returnController.updateReturn).delete(returnController.deleteReturn);

module.exports = router;
