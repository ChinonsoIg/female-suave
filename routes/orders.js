const express = require('express');
const router = express.Router();

// const authenticateUser = require('../middleware/authentication');
// const authorizeAdmin = require('../middleware/authentication');
// const authorizeSeller = require('../middleware/authentication');


const {
  getAllOrders,
  getSingleOrder,
  getCurrentCustomerOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orders');

router.route('/').post(createOrder).get(getAllOrders)

router.route('/showAllMyOrders').get(getCurrentCustomerOrders)

router.route('/:id').get(getSingleOrder).patch(updateOrder)


module.exports = router;