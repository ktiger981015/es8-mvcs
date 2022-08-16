const { Schema, model, Types } = require('mongoose');
const { DEFAULT_IMAGE } = require('../constant');

/**
 * Dog Schema
 * @private
 */
const DogModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  photo: {
    type: String,
    default: DEFAULT_IMAGE,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

/**
 * @typedef Dog
 */
module.exports = model('dogs', DogModel);
