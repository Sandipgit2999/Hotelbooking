require("dotenv").config();
const { Router } = require("express");
const { RoomModel } = require("../models/rooms.model");

const Roomcontroller = Router();

Roomcontroller.get("/filter", async (req, res) => {
  const { price, type } = req.query;
  console.log(price, type);

  const filters = {};
  if (price) {
    filters.price = { $lte: Number(price) };
  }
  if (type) {
    filters.roomType = type;
  }
  const Rooms = await RoomModel.find(filters);
  res.send(Rooms);
});

Roomcontroller.get("/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;
  const Rooms = await RoomModel.find({ hotelId: hotelId });
  res.send(Rooms);
});

Roomcontroller.post("/add/:hotelId", async (req, res) => {
  const { roomNo, roomType, price } = req.body;
  const { hotelId } = req.params;
  console.log("req body", req.body);

  if (roomNo && roomType && price) {
    const new_Room = new RoomModel({ ...req.body, hotelId: hotelId });
    await new_Room.save();
    res.send("successfully added");
  } else {
    res.send("plese fill all details");
  }
});

Roomcontroller.put("/update/:hotelId/:roomId", async (req, res) => {
  const payload = req.body;
  const { hotelId, roomId } = req.params;
  console.log(hotelId, roomId);
  const newRoom = await RoomModel.updateOne(
    { _id: roomId, hotelId: hotelId },
    {
      $set: payload,
    }
  );

  res.send("Successfully Updated");
});

Roomcontroller.delete("remove/:hotelId/:roomId", async (req, res) => {
  const { hotelId, roomId } = req.params;
  console.log("Hii", hotelId, roomId);
  //   const newRoom = await RoomModel.deleteOne({
  //     _id: roomId,
  //     hotelId: hotelId,
  //   });
  res.send("successfuly deleted Room");
});

module.exports = {
  Roomcontroller,
};
