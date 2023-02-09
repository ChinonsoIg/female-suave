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
    body: { items: cartItems, VAT, shippingFee }
  } = req;
  // const { items: cartItems, VAT, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided');
  }
  if (!VAT || !shippingFee) {
    throw new BadRequestError(
      'Please provide VAT and/or shipping fee'
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
    const { name, price, image, createdBy, quantity, _id } = dbProduct;

    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      image: image[0],
      productId: _id,
      sellerId: createdBy,
    };

    if (item.quantity === quantity) {
      const updateQuantity = await Product.findByIdAndUpdate({ _id },
        { $inc: { quantity: -item.quantity }, status: 'out of stock' },
        { new: true, runValidators: true }
      );
      console.log('qty updated with status')
    } else {
      const updateQuantity = await Product.findByIdAndUpdate({ _id },
        { $inc: { quantity: -item.quantity } },
        { new: true, runValidators: true }
      );
      console.log('qty updated')
    }


    // add item to order
    orderItems = [...orderItems, singleOrderItem];

    // calculate subtotal
    subtotal += item.quantity * price;
  }

  // calculate totalVAT
  const totalVAT = (VAT / 100) * subtotal

  // calculate total
  const total = totalVAT + shippingFee + subtotal;
  // get client secret
  // const paymentIntent = await fakeStripeAPI({
  //   quantity: total,
  //   currency: 'usd',
  // });

  // console.log("d: ", {orderItems, VAT, subtotal, total, shippingFee})


  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    VAT,
    shippingFee,
    // clientSecret: paymentIntent.client_secret,
    customerId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({
      order,
      // clientSecret: order.clientSecret 
    });

};


const getAllOrders = async (req, res) => {
  // const orders = await Order.find({});
  // res.status(StatusCodes.OK).json({ orders, count: orders.length });

  const {
    user: { userId, role },
    query: { page, limit, search }
  } = req;

  let parsePage = parseInt(page) || 0;
  const pageCount = parsePage === 0 ? 0 : parsePage-1;
  const limitNumber = parseInt(limit) || 10;
  const searchQuery = search || '';
  // let sort = sort || 'rating'; 
  let searchString = searchQuery.split(" ").map(s => new RegExp(s));

  if (role === 'admin') {
    const docCount = Order.countDocuments({
      $or: [
        { name: { $in: searchString } },
      ]
    });
    const orders = Order
      .find({
        $or: [
          { name: { $in: searchString } },
        ]
      })
      .sort('createdAt')
      .skip(pageCount * limitNumber)
      .limit(limitNumber)

    const response = await Promise.all([orders, docCount]);

    res
      .status(StatusCodes.OK)
      .json({ 
        ordersPerPage: response[0].length, 
        totalOrders: response[1], 
        orders: response[0] 
      })
  } else {

    const docCount = Order.countDocuments({
      'orderItems': { $elemMatch: { sellerId: userId }},
      $or: [
        { name: { $in: searchString } },
      ]
    });

    const orders = Order
      .find({
        'orderItems': { $elemMatch: { sellerId: userId }},
        $or: [
          { name: { $in: searchString } },
        ]
      })
      .sort('createdAt')
      .skip(pageCount * limitNumber)
      .limit(limitNumber)

    const response = await Promise.all([orders, docCount]);

    res
      .status(StatusCodes.OK)
      .json({ 
        ordersPerPage: response[0].length, 
        totalOrders: response[1], 
        orders: response[0] 
      })

  }
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