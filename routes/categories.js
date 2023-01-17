const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');


router.route('/').post(createCategory).get(getAllCategories)
router.route('/:id').get(getCategory).patch(updateCategory).delete(deleteCategory)


module.exports = router