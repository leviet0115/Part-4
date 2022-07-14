const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const errorHandler = require("./utils/error_helper");

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

module.exports = app;
