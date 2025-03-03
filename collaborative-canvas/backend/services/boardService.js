// services/boardService.js
const Board = require('../models/board.model');
const Image = require('../models/image.model');
const Keyword = require('../models/keyword.model');

/**
 * Create a new board.
 * @param {String} name - The board name.
 * @returns {Promise<Object>} The created board document.
 */
const createBoard = async (name) => {
  const board = new Board({ name });
  return await board.save();
};

/**
 * Get a board by its ID.
 * @param {String} boardId - The board's ObjectId.
 * @returns {Promise<Object>} The board document.
 */
const getBoard = async (boardId) => {
  return await Board.findOne({ boardId });
};

/**
 * Update the board's name.
 * @param {String} boardId - The board's ObjectId.
 * @param {String} newName - The new board name.
 * @returns {Promise<Object>} The updated board document.
 */
const updateBoardName = async (boardId, newName) => {
  return await Board.findByIdAndUpdate(boardId, { name: newName }, { new: true });
};

/**
 * Add a new image to a board.
 * @param {String} boardId - The board's ObjectId.
 * @param {String} imageId - The image's ObjectId to add.
 * @returns {Promise<Object>} The updated board document.
 */
const addImageToBoard = async (boardId, imageId) => {
  const board = await Board.findByIdAndUpdate(
    boardId,
    { $push: { images: imageId } },
    { new: true, useFindAndModify: false }
  );

  if (!board) {
    throw new Error('Board not found');
  }

  return board;
};

/**
 * Delete a board and all its associated images and keywords.
 * @param {String} boardId - The board's ObjectId.
 * @returns {Promise<Object>} The deleted board document.
 */
const deleteBoard = async (boardId) => {
  // Delete keywords either by board or by image association
  await Keyword.deleteMany({ boardId });
  await Image.deleteMany({ boardId });

  return await Board.findByIdAndDelete(boardId);
};

/**
 * Get all board information including images and keywords.
 * @param {String} boardId - The board's ObjectId.
 * @returns {Promise<Object>} Object containing board, images, and keywords.
 */
const getAllBoardInfo = async (boardId) => {
  const board = await Board.findById(boardId).lean();
  if (!board) return null;
  const images = await Image.find({ boardId }).lean();
  const keywords = await Keyword.find({ boardId }).lean();
  return { board, images, keywords };
};

module.exports = {
  createBoard,
  getBoard,
  updateBoardName,
  deleteBoard,
  getAllBoardInfo,
  addImageToBoard,
};
