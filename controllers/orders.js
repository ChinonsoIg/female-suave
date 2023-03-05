const Order = require('../models/Orders');
const Product = require('../models/Products');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createOrder = async (req, res) => {
  const {
    customer: { customerId },
    body: { items: cartItems, VAT, shippingFee }
  } = req;

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


const getAllOrdersAdmin = async (req, res) => {
  const {
    query: { page, limit, search }
  } = req;

  let parsePage = parseInt(page) || 0;
  const pageCount = parsePage === 0 ? 0 : parsePage - 1;
  const limitNumber = parseInt(limit) || 10;
  const searchQuery = search || '';
  // let sort = sort || 'rating'; 
  let searchString = searchQuery.split(" ").map(s => new RegExp(s));

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

};

const getAllOrdersMerchant = async (req, res) => {
  const {
    user: { userId },
    query: { page, limit, search }
  } = req;

  let parsePage = parseInt(page) || 0;
  const pageCount = parsePage === 0 ? 0 : parsePage - 1;
  const limitNumber = parseInt(limit) || 10;
  const searchQuery = search || '';
  // let sort = sort || 'rating'; 
  let searchString = searchQuery.split(" ").map(s => new RegExp(s));
  

  // const orders = await Order.aggregate([
  //   {
  //     $replaceRoot: {
  //       newRoot: // #7 ...and 
  //       {
  //         $first: // #6 like #2, turn the array of 1 into a single object.
  //         {
  //           $filter: {  // #4 ... and now we filter the 'visited' array...
  //             input: {
  //               $let: {
  //                 vars: {
  //                 //   qq: {
  //                 //     $first: // #2  $filter will yield an array of 0 or 1;
  //                 //     // use $first to turn into one object
  //                 //     // #1 Find Name Person 3
  //                     // {
  //                       $filter: {
  //                         input: 'orderItems',
  //                         cond: { $eq: ['$this.price', '4500'] }
  //                       }
  //                     // }
  //                 //   }
  //                 },
  //                 //  #3  We wish we could say $first.visited in #2 but we cannot
  //                 //  so we use $let and the vars setup to allow us to get to
  //                 //  the inner array 'visited':
  //                 in: '$qq.orderItems'
  //               }
  //             },
  //             cond: { $eq: ['$this.price', '4500'] } // #5 to match target id
  //           }
  //         }
  //       }
  //     }
  //   }
  // ]);


  const docCount = await Order.countDocuments({
    'orderItems': { $elemMatch: { sellerId: userId } },
    $or: [
      { name: { $in: searchString } },
    ]
  });

  const orders = Order
    .find({
      'orderItems': { 
        $elemMatch: { sellerId: userId },
      },
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

};


const getSingleOrderAdmin = async (req, res) => {
  const {
    params: { id: orderId }
  } = req;

  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`No order with id ${orderId}`)
  }

  res.status(StatusCodes.OK).json({ order })

};


const getSingleOrderMerchant = async (req, res) => {
  const {
    user: { userId, role },
    params: { id: orderId }
  } = req;

  if (role === "admin") {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      throw new NotFoundError(`No order with id ${orderId}`)
    }

    res.status(StatusCodes.OK).json({ order })

  } else {
    const order = await Order
      .findOne({
        _id: orderId,
        'orderItems': {
          $elemMatch: { sellerId: userId }
        }
      });

    if (!order) {
      throw new NotFoundError(`No order with id ${orderId}`)
    }

    res.status(StatusCodes.OK).json({ order })
  }

};


const getCurrentCustomerOrders = async (req, res) => {
  const {
    customer: { customerId },
    query: { page, limit, search }
  } = req;
  // console.log("re: ", req.customer)

  let parsePage = parseInt(page) || 0;
  const pageCount = parsePage === 0 ? 0 : parsePage - 1;
  const limitNumber = parseInt(limit) || 10;
  const searchQuery = search || '';
  // let sort = sort || 'rating'; 
  let searchString = searchQuery.split(" ").map(s => new RegExp(s));

  const docCount = Order.countDocuments({
    customerId,
    $or: [
      { 'orderItems': { $elemMatch: { name: { $in: searchString } } } },
    ],
  });

  const orders = Order
    .find({
      customerId,
      $or: [
        { 'orderItems': { $elemMatch: { name: { $in: searchString } } } },
      ],
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
  getAllOrdersAdmin,
  getAllOrdersMerchant,
  getSingleOrderAdmin,
  getSingleOrderMerchant,
  getCurrentCustomerOrders,
  createOrder,
  updateOrder,
};