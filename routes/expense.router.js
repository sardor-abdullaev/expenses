const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(
    authController.protect,
    expenseController.setUserId,
    expenseController.createExpense
  );

module.exports = router;
