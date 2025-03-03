const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

// Create a new board
router.post('/', boardController.createBoard);

// Get a board by its ID
router.get('/:boardId', boardController.getBoard);

// Update the board's name
router.put('/:boardId', boardController.updateBoardName);

// Delete a board (and all its images and keywords)
router.delete('/:boardId', boardController.deleteBoard);

// Get all board information (board, images, keywords)
router.get('/:boardId/info', boardController.getAllBoardInfo);

module.exports = router;
