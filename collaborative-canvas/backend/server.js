require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 🔹 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI);


// ✅ Create Room & User Schema
const RoomSchema = new mongoose.Schema({
  name: String,
  images: [{ id: String, url: String, x: Number, y: Number }],
});
const Room = mongoose.model("Room", RoomSchema);

const users = {}; // Track online users { socketId: username }

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", async ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };

    let roomData = await Room.findOne({ name: room });
    if (!roomData) {
      roomData = await Room.create({ name: room, images: [] });
    }

    socket.emit("loadImages", roomData.images);
    io.to(room).emit("userJoined", `${username} joined ${room}!`);
  });

  socket.on("newImage", async (imageData) => {
    const user = users[socket.id];
    if (user) {
      await Room.updateOne({ name: user.room }, { $push: { images: imageData } });
      socket.to(user.room).emit("newImage", imageData);
    }
  });

  socket.on("updateImage", async (updatedImage) => {
    const user = users[socket.id];
    if (user) {
      await Room.updateOne(
        { name: user.room, "images.id": updatedImage.id },
        { $set: { "images.$": updatedImage } }
      );
      socket.to(user.room).emit("updateImage", updatedImage);
    }
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("userLeft", `${user.username} left`);
      delete users[socket.id];
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
