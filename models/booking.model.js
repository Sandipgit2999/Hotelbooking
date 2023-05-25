const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema(
  {
    userId: { type: String },
    hotelId: { type: String },
    roomId: { type: String },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = {
  BookingModel,
};
