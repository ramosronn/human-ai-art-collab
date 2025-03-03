const boardService = require('../services/boardService');

/**
 * Controller to create a new board.
 */
const createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const board = await boardService.createBoard(name);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to get a board by ID.
 */
const getBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await boardService.getBoard(boardId);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to update a board's name.
 */
const updateBoardName = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { newName } = req.body;
    const board = await boardService.updateBoardName(boardId, newName);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to delete a board along with all associated images and keywords.
 */
const deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await boardService.deleteBoard(boardId);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json({ message: 'Board and associated images/keywords deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to get all board information (board, images, keywords).
 */
const getAllBoardInfo = async (req, res) => {
  try {
    const { boardId } = req.params;
    const data = await boardService.getAllBoardInfo(boardId);
    if (!data) return res.status(404).json({ error: 'Board not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBoard,
  getBoard,
  updateBoardName,
  deleteBoard,
  getAllBoardInfo,
};
