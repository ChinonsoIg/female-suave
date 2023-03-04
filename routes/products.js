const express = require('express');
const router = express.Router();

const { authUser, authAdmin } = require('../middleware/authentication');

const {
  getAllProductsAdmin,
  getAllProductsMerchant,
  getAllProductsStorefront,
  getProductAdmin,
  getProductMerchant,
  getProductStoreFront,

  createProductMerchant,
  updateProductMerchant,

  // deleteProductAdmin,
  deleteProductMerchant
} = require('../controllers/products');


// For storefront
router
  .route('/storefront')
  .get(getAllProductsStorefront)
router
  .route('/storefront/:id')
  .get(getProductStoreFront)

// For merchants
router
  .route('/merchant')
  .post(authUser, createProductMerchant)
  .get(authUser, getAllProductsMerchant)
router
  .route('/merchant/:id')
  .get(authUser, getProductMerchant)
  .patch(authUser, updateProductMerchant)
  .delete(authUser, deleteProductMerchant)

// For admin
router
  .route('/admin')
  .get(authAdmin, getAllProductsAdmin)
  // .post(authAmin, createProductAdmin)
router
  .route('/admin/:id')
  .get(authAdmin, getProductAdmin)
  // .patch(authAdmin, updateProductAdmin)
  // .delete(authUser, deleteProductAdmin)


module.exports = router;