const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is missing." });
    }

    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "The minimum length of password is 3." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
