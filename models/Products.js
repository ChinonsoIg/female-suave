const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    maxlength: 50
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide product category'],
  },
  price: {
    type: Number,
    min: 0,
    required: [true, 'Please provide product price'],
  },
  quantity: {
    type: Number,
    min: 0,
    required: [true, 'Please provide product quantity'],
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: 600
  },
  status: {
    type: String,
    enum: ['available', 'out of stock'],
    default: 'available'
  },
  image: {
    type: [String],
    required: [true, 'Please provide at least one image of the product'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide product seller']
  },
}, { timestamps: true })


module.exports = mongoose.model('Products', ProductSchema)
