const express = require('express');
const router = express.Router();

const {
  authUser,
  authCustomer,
  authAdmin,
} = require('../middleware/authentication');


const {
  getAllOrdersAdmin,
  getAllOrdersMerchant,
  getSingleOrderAdmin,
  getSingleOrderMerchant,
  getCurrentCustomerOrders,
  createOrder,
  updateOrder
} = require('../controllers/orders');


// For storefront
router
  .route('/storefront')
  .post(authCustomer, createOrder)
  .get(authCustomer, getCurrentCustomerOrders)

router
  .route('/storefront/:id')
  .patch(authCustomer, updateOrder)


// For merchant
router
  .route('/merchant')
  .get(authUser, getAllOrdersMerchant)

router
  .route('/merchant/:id')
  .get(authUser, getSingleOrderMerchant)


// For admin 
router
  .route('/admin')
  .get(authAdmin, getAllOrdersAdmin)

router
  .route('/admin/:id')
  .get(authAdmin, getSingleOrderAdmin)
  .patch(authAdmin, updateOrder)


module.exports = router;
