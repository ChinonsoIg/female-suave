const express = require('express');
const router = express.Router();
const { authAdmin } = require('../middleware/authentication');

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');


router
  .route('/')
  .post(authAdmin, createCategory)
  .get(getAllCategories)

router
  .route('/:id')
  .get(getCategory)
  .patch(authAdmin, updateCategory)
  .delete(authAdmin, deleteCategory)


module.exports = router