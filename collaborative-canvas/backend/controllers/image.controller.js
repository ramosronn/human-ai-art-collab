const imageService = require('../services/imageService');

/**
 * Controller to create a new image.
 */
const createImage = async (req, res) => {
  try {
    const image = await imageService.createImage(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to update image coordinates.
 */
const updateImageCoordinates = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { x, y } = req.body;
    const image = await imageService.updateImageCoordinates(imageId, x, y);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to delete an image and its associated keywords.
 */
const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image = await imageService.deleteImage(imageId);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json({ message: 'Image and associated keywords deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to retrieve an image by ID.
 */
const getImageById = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image = await imageService.getImageById(imageId);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createImage,
  updateImageCoordinates,
  deleteImage,
  getImageById,
};
