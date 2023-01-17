const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Please provide category name'],
    maxlength: 20,
    unique: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide category creator']
  },
  // category: {
  //   type: String,
  //   enum: ['dress', 'foot wears', 'ornaments', 'underwears', 'home wears', 'sanitaries'],
  //   required: [true, 'Please provide product category'],
  // },
}, { timestamps: true })


module.exports = mongoose.model('Categories', CategorySchema)
