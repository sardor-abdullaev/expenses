const express = require("express");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(
    authController.protect,
    authController.restictTo("admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);

router
  .route("/resetDefaultPassword")
  .patch(
    authController.protect,
    authController.restictTo("admin"),
    authController.resetToDefaultPassword
  );

router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);

router.route("/:id").get(userController.getUser);

module.exports = router;
