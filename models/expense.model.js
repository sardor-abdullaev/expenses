const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: true,
  },
  item: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// expenseSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "item",
//     select: "name",
//   }).populate({
//     path: "user",
//     select: "name email role",
//   });
//   next();
// });

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
