const { UserModel } = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.secret;
const bcrypt = require("bcrypt");
const { Router } = require("express");

const Usercontroller = Router();

Usercontroller.get("/", async (req, res) => {
  res.send("HiI");
});

Usercontroller.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const payload = req.body;
  console.log(payload, "payload");

  const present = await UserModel.findOne({ email });
  if (present) {
    res.send("user already created");
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.send("something went wrong");
      } else {
        const new_user = new UserModel({ email, password: hash });
        await new_user.save();
        res.send("user created successfully");
      }
    });
  }
});

Usercontroller.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  console.log(user);
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("something went wrong");
    } else {
      const token = jwt.sign({ userId: user.id, email: user.email }, secret);
      res.send({ msg: "successfully login", token: token });
    }
  });
});

module.exports = {
  Usercontroller,
};
