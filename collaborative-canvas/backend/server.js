require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const boardRoutes = require('./routes/board.routes');
const imageRoutes = require('./routes/image.routes');
const keywordRoutes = require('./routes/keyword.routes');
const roomRoutes = require('./routes/room.routes');
const socketManager = require('./socketManager');
const Room = require('./models/room.model');
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "https://human-ai-art-collab-dev.onrender.com",
  "https://human-ai-art-collab.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  });

socketManager(io);

// 🔹 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/boards', boardRoutes);
app.use('/images', imageRoutes);
app.use('/keywords', keywordRoutes);
app.use('/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
