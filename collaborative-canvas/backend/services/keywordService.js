const Keyword = require('../models/keyword.model');

/**
 * Manually create a new keyword.
 * @param {Object} data - Contains boardId, imageId, x, y, isSelected, type, keyword.
 * @returns {Promise<Object>} The created keyword document.
 */
const createKeyword = async (data) => {
  const keyword = new Keyword(data);
  return await keyword.save();
};

/**
 * Retrieve a keyword by its ID.
 * @param {String} keywordId - The keyword's ObjectId.
 * @returns {Promise<Object>} The keyword document.
 */
const getKeywordById = async (keywordId) => {
  return await Keyword.findById(keywordId);
};

/**
 * Update a keyword's x, y, or isSelected fields.
 * @param {String} keywordId - The keyword's ObjectId.
 * @param {Object} updateData - Fields to update.
 * @returns {Promise<Object>} The updated keyword document.
 */
const updateKeyword = async (keywordId, updateData) => {
  return await Keyword.findByIdAndUpdate(keywordId, updateData, { new: true });
};

/**
 * Toggle the isSelected field of a keyword.
 * @param {String} keywordId - The keyword's ObjectId.
 * @returns {Promise<Object>} The updated keyword document.
 */
const toggleKeywordSelection = async (keywordId) => {
  const keyword = await Keyword.findById(keywordId);
  if (!keyword) throw new Error("Keyword not found");
  keyword.isSelected = !keyword.isSelected;
  return await keyword.save();
};

/**
 * Delete a keyword.
 * @param {String} keywordId - The keyword's ObjectId.
 * @returns {Promise<Object>} The deleted keyword document.
 */
const deleteKeyword = async (keywordId) => {
  return await Keyword.findByIdAndDelete(keywordId);
};

module.exports = {
  createKeyword,
  getKeywordById,
  updateKeyword,
  toggleKeywordSelection,
  deleteKeyword,
};
