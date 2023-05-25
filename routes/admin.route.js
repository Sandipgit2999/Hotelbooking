const { AdminModel } = require("../models/admin.model");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.secret;
const bcrypt = require("bcrypt");
const { Router } = require("express");

const Admincontroller = Router();

Admincontroller.get("/", async (req, res) => {
  res.send(`<h1>Hii</h1>`);
});

Admincontroller.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const payload = req.body;
  //   console.log(payload);

  const present = await AdminModel.findOne({ email });
  //console.log(present);
  if (present) {
    res.send("admin already created");
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.send("something went wrong");
      } else {
        const new_Admin = new AdminModel({ email, password: hash });
        await new_Admin.save();
        res.send("admin created successfully");
      }
    });
  }
});

Admincontroller.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  const Admin = await AdminModel.findOne({ email });
  console.log(Admin, "admin");

  if (!Admin) {
    res.send("admin not found");
  } else {
    const hash = Admin.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        res.send("something went wrong");
      } else {
        const token = jwt.sign(
          { AdminId: Admin.id, email: Admin.email },
          secret
        );
        res.send({ msg: "successfully login", token: token });
      }
    });
  }
});

module.exports = {
  Admincontroller,
};
