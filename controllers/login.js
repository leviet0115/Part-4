const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const existedUser = await User.findOne({ username });

  //checking password
  const validPassword =
    existedUser === null
      ? false
      : await bcrypt.compare(password, existedUser.passwordHash);

  if (!validPassword || !username) {
    return res.status(401).send("Incorrect password or username.");
  }

  //create token
  const userForToken = { username, id: existedUser._id };
  console.log(userForToken);
  const token = jwt.sign(userForToken, process.env.SECRET);

  //sendtoken
  res
    .status(200)
    .send({ token, name: existedUser.name, username: existedUser.username });
});

module.exports = loginRouter;
