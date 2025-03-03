const boardService = require('./services/boardService');
const imageService = require('./services/imageService');
const keywordService = require('./services/keywordService');
const roomService = require('./services/roomService');
let rooms = [];
let users = [];

module.exports = (io) => {
    
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
      
        socket.on("joinRoom", async ({ username, roomID }) => {
          socket.join(roomID);
          users[socket.id] = { username, roomID };
      
          if (!rooms[roomID]) rooms[roomID] = [];
          rooms[roomID].push({ id: socket.id, username });
      
          io.to(roomID).emit("updateRoomUsers", rooms[roomID]);
        //   socket.emit("loadImages", latestBoardData.images);
        });
      
        socket.on("newImage", async (imageData) => {
          const user = users[socket.id];
          if (user) {
            let image = await imageService.createImage(imageData)
            socket.to(user.roomID).emit("newImage", image);
          }
        });
      
        socket.on("updateImage", async (updatedImage) => {
          const user = users[socket.id];
          if (user) {
            newImage = await imageService.updateImageCoordinates(updatedImage._id, updatedImage.x, updatedImage.y)
            socket.to(user.roomID).emit("updateImage", newImage);
          }
        });
      
        socket.on("leave room", (user, roomID) => {
          if (user) {
            if (roomID && rooms[roomID]) {
              rooms[roomID] = rooms[roomID].filter((user) => user.id !== socket.id);
              console.log(`User left roomID ${roomID}:`, rooms[roomID]);
      
              if (rooms[roomID].length === 0) {
                delete rooms[roomID]; // Remove empty roomID
              } else {
                io.to(roomID).emit("updateRoomUsers", rooms[roomID]); // Update remaining users
              }
            }
            delete users[socket.id];
          }
          console.log("User disconnected:", socket.id);
        });
      });
  };
  