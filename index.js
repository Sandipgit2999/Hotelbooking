const express = require("express");

const { connection } = require("./config/db.js");
const { Admincontroller } = require("./routes/admin.route.js");
const { Usercontroller } = require("./routes/user.route");
// const { authorization } = require("./middlewares/Authorization.js");
const { authentication } = require("./middlewares/Authentication.js");
const { Hotelcontroller } = require("./routes/hotel.route.js");
const { Roomcontroller } = require("./routes/room.route.js");
const { Bookingcontroller } = require("./routes/booking.route.js");
const app = express();
const port = 8080;

app.use(express.json());
// app.use(authorization)
app.use("/user", Usercontroller);
app.use("/admin", Admincontroller);
app.use("/booking", Bookingcontroller);
app.use(authentication);
app.use("/hotel", Hotelcontroller);
app.use("/room", Roomcontroller);

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
