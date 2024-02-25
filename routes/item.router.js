const express = require("express");

const router = express.Router();
const itemController = require("../controllers/item.controller");
const authController = require("../controllers/auth.controller");

router.use(authController.protect, authController.restictTo("admin"));

router
  .route("/")
  .get(itemController.getAllItem)
  .post(itemController.createItem);

router
  .route("/:id")
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
