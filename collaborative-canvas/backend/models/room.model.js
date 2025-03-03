const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    boards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
    joinCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
