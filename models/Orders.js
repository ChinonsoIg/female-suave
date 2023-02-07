const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  shippingFee: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  // discount: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  orderItems: [SingleOrderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'paid', 'delivered', 'cancelled', 'failed'],
    default: 'pending'
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
}, { timestamps: true })


module.exports = mongoose.model('Order', OrderSchema)