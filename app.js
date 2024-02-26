const express = require("express");
const userRouter = require("./routes/user.router");
const itemRouter = require("./routes/item.router");
const expenseRouter = require("./routes/expense.router");

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/expenses", expenseRouter);

module.exports = app;
