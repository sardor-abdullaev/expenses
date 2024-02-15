const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  const url = `${req.protocol}://${req.get("host")}/api/v1/users/signup`;

  res.status(500).json({
    status: "error",
    message: `This route is not yet defined! Please use ${url} instead.`,
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
