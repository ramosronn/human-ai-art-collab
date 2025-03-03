const Board = require('./board.model');

/**
 * Create a new board with the given name.
 * @param {String} name - The name of the board.
 * @returns {Promise<Object>} The created board document.
 */
const createBoard = async (name) => {
  const board = new Board({ name });
  return await board.save();
};

/**
 * Retrieve a board by its id.
 * @param {String} id - The board's ObjectId.
 * @returns {Promise<Object>} The board document.
 */
const getBoardById = async (id) => {
  return await Board.findById(id);
};

/**
 * Update a board by its id.
 * @param {String} id - The board's ObjectId.
 * @param {Object} updateData - The data to update (e.g., { name: 'New Name' }).
 * @returns {Promise<Object>} The updated board document.
 */
const updateBoard = async (id, updateData) => {
  return await Board.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a board by its id.
 * @param {String} id - The board's ObjectId.
 * @returns {Promise<Object>} The deleted board document.
 */
const deleteBoard = async (id) => {
  return await Board.findByIdAndDelete(id);
};

module.exports = { createBoard, getBoardById, updateBoard, deleteBoard };
