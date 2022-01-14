const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    maxlength: 20
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    maxlength: 20
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: 400
  },
  status: {
    type: String,
    enum: ['available', 'out of stock'],
    default: 'available'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide product seller']
  },
}, { timestamps: true })


module.exports = mongoose.model('Products', ProductSchema)