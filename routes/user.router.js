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

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restictTo("admin"),
    userController.getUser
  );

router.route(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);

module.exports = router;
