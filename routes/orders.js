const express = require('express');
const router = express.Router();

const {
  authUser,
  authCustomer,
  adminAuthorization,
} = require('../middleware/authentication');


const {
  getAllOrders,
  getSingleOrder,
  getCurrentCustomerOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orders');

router
  .route('/')
  .post(authCustomer, createOrder)
  .get(authUser, getAllOrders)

router
  .route('/showAllCustomerOrders')
  .get(authCustomer, getCurrentCustomerOrders)

router
  .route('/:id')
  .get(authUser, getSingleOrder)
  .patch(updateOrder)


module.exports = router;
