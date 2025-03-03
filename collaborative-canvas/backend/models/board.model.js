const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      index: true
    },
    images: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Image',
        },
      ]
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
