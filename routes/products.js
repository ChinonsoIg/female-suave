const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/authentication');

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsStorefront,
  getProductStoreFront,
} = require('../controllers/products');


router.route('/').get(getAllProductsStorefront)
// For admin and merchants
router.route('/dashboard').post(authUser, createProduct).get(authUser, getAllProducts)


router.route('/:id').get(getProductStoreFront)
// For admin and merchants
router.route('/dashboard/:id').get(authUser, getProduct).patch(authUser, updateProduct).delete(authUser, deleteProduct)


module.exports = router;