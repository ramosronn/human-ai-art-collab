const Image = require('../models/image.model');

/**
 * Create a new image.
 * @param {Object} imageData - Object containing boardId, url, x, y.
 * @returns {Promise<Object>} The created image document.
 */
const createImage = async (imageData) => {
  const image = new Image(imageData);
  return await image.save();
};

/**
 * Retrieve an image by its ID.
 * @param {String} id - The image's ObjectId.
 * @returns {Promise<Object>} The image document.
 */
const getImageById = async (id) => {
  return await Image.findById(id);
};

/**
 * Update the x and y coordinates of an image.
 * @param {String} id - The image's ObjectId.
 * @param {Number} x - New x coordinate.
 * @param {Number} y - New y coordinate.
 * @returns {Promise<Object>} The updated image document.
 */
const updateImageCoordinates = async (id, x, y) => {
  return await Image.findByIdAndUpdate(id, { x, y }, { new: true });
};

/**
 * Delete an image by its ID.
 * @param {String} id - The image's ObjectId.
 * @returns {Promise<Object>} The deleted image document.
 */
const deleteImage = async (id) => {
  return await Image.findByIdAndDelete(id);
};

module.exports = {
  createImage,
  getImageById,
  updateImageCoordinates,
  deleteImage,
};
