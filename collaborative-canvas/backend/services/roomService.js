const Room = require('../models/room.model');
const Board = require('../models/board.model');
const boardService = require('./boardService');

/**
 * Generate a join code.
 */
const generateJoinCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

/**
 * Create a new room with a blank board.
 */
const createRoom = async (name) => {
  const joinCode = generateJoinCode();
  const blankBoard = await Board.create({ name: 'draft 1' });

  const room = await Room.create({
    name,
    joinCode,
    boards: [blankBoard._id],
  });

  return room;
};

/**
 * Update a room's name.
 */
const updateRoomName = async (roomId, newName) => {
  return await Room.findByIdAndUpdate(roomId, { name: newName }, { new: true });
};

/**
 * Delete a room and its boards.
 */
const deleteRoom = async (roomId) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  await Promise.all(room.boards.map(boardService.deleteBoard));
  await Room.findByIdAndDelete(roomId);

  return room;
};

/**
 * Join a room using a join code.
 */
const joinRoom = async (joinCode) => {
    const room = await Room.findOne({ joinCode })
    .populate({
      path: 'boards',
      populate: {
        path: 'images',
        populate: { path: 'keywords' }, // Populate keywords inside images
      },
    });

  if (!room) {
    throw new Error('Room not found');
  }
  return room;
};

module.exports = {
  createRoom,
  updateRoomName,
  deleteRoom,
  joinRoom,
};
