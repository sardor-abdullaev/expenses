const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(
    authController.protect,
    expenseController.setUserIdAndDate,
    expenseController.createExpense
  );

router
  .route("/:id")
  .patch(
    authController.protect,
    expenseController.restrict,
    expenseController.setUserIdAndDate,
    expenseController.updateExpense
  )
  .delete(
    authController.protect,
    expenseController.restrict,
    expenseController.setUserIdAndDate,
    expenseController.deleteExpense
  );

module.exports = router;
