const Order = require('../models/Orders');
const Product = require('../models/Products');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
// const CustomError = require('../errors');
// const { checkPermissions } = require('../utils');

// const fakeStripeAPI = async ({ quantity, currency }) => {
//   const client_secret = 'someRandomValue';
//   return { client_secret, quantity };
// };

const createOrder = async (req, res) => {
  const {
    customer: { customerId },
    body: { items: cartItems, tax, shippingFee }
  } = req;
  // const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided');
  }
  if (!tax || !shippingFee) {
    throw new BadRequestError(
      'Please provide tax and/or shipping fee'
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.productId });
    if (!dbProduct) {
      throw new NotFoundError(
        `No product with id : ${item.productId}`
      );
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      image: image[0],
      productId: _id,
    };

    const updateQuantity = await Product.findByIdAndUpdate({ _id },
      { $inc: { quantity: -item.quantity } },
      { new: true, runValidators: true }
    );

    console.log("qty: ", updateQuantity);

    // add item to order
    orderItems = [...orderItems, singleOrderItem];

    // calculate subtotal
    subtotal += item.quantity * price;
  }
  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret
  // const paymentIntent = await fakeStripeAPI({
  //   quantity: total,
  //   currency: 'usd',
  // });


  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    // clientSecret: paymentIntent.client_secret,
    customerId: customerId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({
      order,
      // clientSecret: order.clientSecret 
    });

};


const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};


const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};


const getCurrentCustomerOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};


const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
};


module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentCustomerOrders,
  createOrder,
  updateOrder,
};