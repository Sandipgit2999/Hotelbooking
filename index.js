const express = require("express");
var jwt = require("jsonwebtoken");

const { connection } = require("./config/db.js");
const { userController } = require("./routes/user.route");
const app = express();
const port = 8080;

app.use(express.json());
app.use("/user", userController);


// app.post("/signup", async (req, res) => {
//   console.log(req.body);
//   const payload = req.body;
//   const new_user = new UserModel.insertOne(payload);
//   await new_user.save();
//   res.send("Successfully added");
// });

// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   const isValid = await UserModel.findOne(req.body);
//   if (isValid) {
//     let token = jwt.sign({ foo: "bar" }, "secret", "Stack", {
//       expiresIn: "1h",
//     });
//     res.send({ msg: "Login successful", token: token });
//   } else {
//     res.send("Invalid credentials");
//   }
// });

app.get("/homepage", (req, res) => {
  //console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.send("please login");
    } else {
      res.send("important dashboard data");
    }
  });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (err) {
    console.log("failed");
    console.log(err);
  }

  console.log("listening on port 8080");
});
