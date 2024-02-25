const express = require("express");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authController.protect);

router.route("/me", userController.getMe, userController.getUser);
router.route("/updateMyPassword").patch(authController.updatePassword);

router.use(authController.restictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/resetDefaultPassword")
  .patch(authController.resetToDefaultPassword);

router.route("/:id").get(userController.getUser);

module.exports = router;
