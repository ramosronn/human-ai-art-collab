const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

// Get all rooms
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Join or create a room
router.post("/join-room", async (req, res) => {
  try {
    const { username, room } = req.body;
    if (!username || !room) {
      return res.status(400).json({ error: "Username and room name are required" });
    }
    let roomData = await Room.findOne({ name: room });
    if (!roomData) {
      roomData = await Room.create({ name: room, images: [] });
    }
    res.json({ message: "Joined room successfully", roomData });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;