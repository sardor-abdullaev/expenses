const Expense = require("../models/expense.model");
const catchAsync = require("../utils/catchAsync");

exports.createExpense = catchAsync(async (req, res, next) => {
  const newExpense = await Expense.create({
    date: req.body.date,
    price: req.body.price,
    user: req.body.user,
    item: req.body.item,
  });

  res.status(201).json({
    status: "success",
    data: {
      expense: newExpense,
    },
  });
});

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();   
};

exports.getAllExpenses = catchAsync(async (req, res, next) => {
  const expenses = await Expense.find();

  res.status(200).json({
    status: "success",
    results: expenses.length,
    data: {
      expenses,
    },
  });
});
