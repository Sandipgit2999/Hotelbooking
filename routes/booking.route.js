require("dotenv").config();

const { Router } = require("express");
const { BookingModel } = require("../models/booking.model");
const { RoomModel } = require("../models/rooms.model");
const { authentication } = require("../middlewares/Authentication");
const { userAuthentication } = require("../middlewares/userAuthentication");

const Bookingcontroller = Router();

Bookingcontroller.get("/mybookings", userAuthentication, async (req, res) => {
  console.log(req.body);
  const roomsAvailable = await BookingModel.find({
    userId: req.body.userId,
  });
  res.send(roomsAvailable);
});

Bookingcontroller.get("/filter", async (req, res) => {
  const { name, date, price } = req.query;
  console.log(price);

  const filters = {};
  if (name) {
    filters.name = name;
  }
  if (price) {
    filters.price = { $lte: Number(price) };
  }
  // if (date) {
  //   filters.roomType = type;
  // }
  const Bookings = await BookingModel.find(filters);
  res.send(Bookings);
});

Bookingcontroller.post(
  "/add/:hotelId/:roomId",
  userAuthentication,
  async (req, res) => {
    const { hotelId, roomId } = req.params;
    console.log("req body", req.body);
    const { userId } = req.body;
    console.log(userId, req.body, "Hii");

    const bookingRoom = new BookingModel({ userId: userId, hotelId, roomId });
    await bookingRoom.save();

    const bookedRoom = await RoomModel.find({
      hotelId: hotelId,
      roomId: roomId,
    });

    console.log("booked Room", bookedRoom);

    //   const bookedRoom = await RoomModel.find(
    //     { hotelId, roomId },
    //     {
    //       $set: { availabity: false },
    //     }
    //   );

    res.send("Successfully booked");
  }
);

Bookingcontroller.put("/update/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const newBooking = await BookingModel.updateOne(
    { _id: id, AdminId: req.body.AdminId },
    {
      $set: payload,
    }
  );

  res.send("Successfully Updated");
});

Bookingcontroller.delete("cancel/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  console.log("Hii", id);
  const CancelBooking = await BookingModel.deleteOne({
    _id: bookingId,
    userId: req.body.userId,
  });
  res.send("successfuly cancel Booking");
});

module.exports = {
  Bookingcontroller,
};
