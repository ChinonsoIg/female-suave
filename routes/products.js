const express = require('express');
const router = express.Router();

// const authenticateUser = require('../middleware/authentication');

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/products');


router.route('/').post(createProduct).get(getAllProducts)
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
router.route('/byCategory/:categoryId').get(getProductsByCategory)

module.exports = router