const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

// Create a new image (and auto-generate its keywords)
router.post('/', imageController.createImage);

// Get an image by its ID
router.get('/:imageId', imageController.getImageById);

// Update image coordinates
router.put('/:imageId', imageController.updateImageCoordinates);

// Delete an image (and its associated keywords)
router.delete('/:imageId', imageController.deleteImage);

module.exports = router;
