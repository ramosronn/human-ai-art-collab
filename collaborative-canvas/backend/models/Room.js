const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  images: [{ id: String, url: String, x: Number, y: Number }],
});

module.exports = mongoose.model("Room", roomSchema);