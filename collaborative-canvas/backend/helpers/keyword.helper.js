const Keyword = require('../models/keyword.model');

/**
 * Create a new keyword.
 * @param {Object} keywordData - Contains boardId, imageId, x, y, isSelected, type, keyword.
 * @returns {Promise<Object>} The created keyword document.
 */
const createKeyword = async (keywordData) => {
  const keyword = new Keyword(keywordData);
  return await keyword.save();
};

/**
 * Retrieve a keyword by its ID.
 * @param {String} id - The keyword's ObjectId.
 * @returns {Promise<Object>} The keyword document.
 */
const getKeywordById = async (id) => {
  return await Keyword.findById(id);
};

/**
 * Update the x, y coordinates and isSelected status of a keyword.
 * @param {String} id - The keyword's ObjectId.
 * @param {Object} updateData - An object containing new values for x, y, and/or isSelected.
 * @returns {Promise<Object>} The updated keyword document.
 */
const updateKeyword = async (id, updateData) => {
  return await Keyword.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Delete a keyword by its ID.
 * @param {String} id - The keyword's ObjectId.
 * @returns {Promise<Object>} The deleted keyword document.
 */
const deleteKeyword = async (id) => {
  return await Keyword.findByIdAndDelete(id);
};

module.exports = {
  createKeyword,
  getKeywordById,
  updateKeyword,
  deleteKeyword,
};
