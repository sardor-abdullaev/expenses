const Expense = require("../models/expense.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.restrict = catchAsync(async (req, res, next) => {
  const currentExpense = await Expense.find({ id: req.params.id });
  if (!currentExpense) {
    return next(new AppError("No expense found with that id", 404));
  }

  if (!currentExpense.user == req.user.id || !req.user.role == "admin") {
    return next(
      new AppError("You do not permission to perform this action", 403)
    );
  }
  next();
});

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

exports.setUserIdAndDate = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.date = Date.now();
  next();
};

exports.getAllExpenses = catchAsync(async (req, res, next) => {
  const expenses = await Expense.find();
  // .populate({
  //   path: "item",
  //   select: "name",
  // })
  // .populate({
  //   path: "user",
  //   select: "-__v",
  // });

  res.status(200).json({
    status: "success",
    results: expenses.length,
    data: {
      expenses,
    },
  });
});

exports.deleteExpense = catchAsync(async (req, res, next) => {
  const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateExpense = catchAsync(async (req, res, next) => {
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: { expense: updatedExpense },
  });
});
