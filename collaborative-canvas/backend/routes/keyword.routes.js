const express = require('express');
const router = express.Router();
const keywordController = require('../controllers/keyword.controller');

// Manually add a new keyword
router.post('/', keywordController.createKeyword);

// Get a keyword by its ID
router.get('/:keywordId', keywordController.getKeyword);

// Update keyword fields (e.g., x, y, isSelected)
router.put('/:keywordId', keywordController.updateKeyword);

// Toggle the isSelected field of a keyword
router.patch('/:keywordId/toggle', keywordController.toggleKeywordSelection);

// Delete a keyword
router.delete('/:keywordId', keywordController.deleteKeyword);

module.exports = router;
