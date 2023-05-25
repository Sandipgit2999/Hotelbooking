const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema(
  {
    name: { type: String },
    AdminId: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

const HotelModel = mongoose.model("hotel", HotelSchema);

module.exports = {
  HotelModel,
};
