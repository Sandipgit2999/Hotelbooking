const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema(
  {
    roomNO: { type: String ,required:true},
    roomType: {
      type: String,
      enum: ["Executive", "Delux", "Luxurious"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availabity: { type: Boolean, default: true },
    availableDates: {
      type: [Date],
    },
    hotelId: { type: String },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("rooms", RoomSchema);

module.exports = {
  RoomModel,
};
