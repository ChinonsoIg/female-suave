const express = require('express');
const router = express.Router();

const { authUser, authAdmin, authCustomer } = require('../middleware/authentication');

const {
  getAllCustomersAdmin,
  getAllCustomersMerchant,
  getCustomerAdmin,
  getCustomerMerchant,
  getCustomerStorefront,
  updateCustomerStorefront,
  deleteCustomerStorefront
} = require('../controllers/customers');


// For Storefront
router
  .route('/storefront/:id')
  .get(authCustomer, getCustomerStorefront)
  .patch(authCustomer, updateCustomerStorefront)
  .delete(authCustomer, deleteCustomerStorefront)


// For Merchants
router
  .route('/merchant/')
  .get(authUser, getAllCustomersMerchant)

router
  .route('/merchant/:id')
  .get(authUser, getCustomerMerchant)


// For Admin
router
  .route('/admin/')
  .get(authAdmin, getAllCustomersAdmin)

router
  .route('/admin/:id')
  .get(authAdmin, getCustomerAdmin)
  // .patch(authAdmin, updateCustomerAdmin)
  // .delete(authAdmin, deleteCustomerAdmin)


module.exports = router