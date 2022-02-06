const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    maxlength: 20
  },
  category: {
    type: String,
    enum: ['dress', 'foot wears', 'ornaments', 'underwears', 'home wears', 'sanitaries'],
    required: [true, 'Please provide product category'],
  },
  price: {
    type: Number,
    min: 0,
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
  // img: {
  //   data: Buffer,
  //   contentType: String
  // },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide product seller']
  },
}, { timestamps: true })


module.exports = mongoose.model('Products', ProductSchema)