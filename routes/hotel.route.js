require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.secret;
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { HotelModel } = require("../models/hotel.model");
const { RoomModel } = require("../models/rooms.model");

const Hotelcontroller = Router();

Hotelcontroller.get("/available/:hotelId", async (req, res) => {
  const { hotelId } = req.params;
  const roomsAvailable = await RoomModel.find({
    hotelId: hotelId,
    availabity: true,
  });
  res.send(roomsAvailable);
});

Hotelcontroller.get("/filter", async (req, res) => {
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
  const Hotels = await HotelModel.find(filters);
  res.send(Hotels);
});

Hotelcontroller.post("/add", async (req, res) => {
  const { name, price } = req.body;
  console.log("req body", req.body);

  if (name && price) {
    const new_hotel = new HotelModel(req.body);
    await new_hotel.save();
    res.send("successfully added");
  } else {
    res.send("plese fill all details");
  }
});

Hotelcontroller.put("/update/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const newHotel = await HotelModel.updateOne(
    { _id: id, AdminId: req.body.AdminId },
    {
      $set: payload,
    }
  );

  res.send("Successfully Updated");
});

Hotelcontroller.delete("remove/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Hii", id);
  const newHotel = await HotelModel.deleteOne({
    _id: id,
    AdminId: req.body.AdminId,
  });
  res.send("successfuly deleted hotel");
});

module.exports = {
  Hotelcontroller,
};
