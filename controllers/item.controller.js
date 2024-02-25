const Item = require("../models/item.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllItem = catchAsync(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

exports.createItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create({ name: req.body.name });

  res.status(201).json({
    status: "success",
    data: {
      item: newItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);

  if (!deletedItem) {
    return next(new AppError("No item found with that id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedItem) {
    return next(new AppError("No item found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: { item: updatedItem },
  });
});
