const Category = require('../models/Categories');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllCategories = async (req, res) => {

  const categories = await Category
    .find()
    .sort('createdAt')

  res.status(StatusCodes.OK).json({ count: categories.length, categories })

}


const getCategory = async (req, res) => {

  const {
    params: { id: categoryId }
  } = req;

  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new NotFoundError(`No category with id ${categoryId}`)
  }

  res.status(StatusCodes.OK).json({ category })

}


const createCategory = async (req, res) => {
  // Attach a user to the category created
  req.body.createdBy = req.user.userId;

  let checkCategory = await Category.exists({ categoryName: req.body.categoryName });
  if (checkCategory) {

    res.status(StatusCodes.BAD_REQUEST).json({ status: 400, message: "Category name already exists" })
  } else {

    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).json({ category })
  }

}


const updateCategory = async (req, res) => {

  const {
    body: { categoryName },
    params: { id: categoryId },
  } = req;

  if (categoryName === '') {
    throw new BadRequestError('categoryName cannot be empty')
  }

  const category = await Category.findByIdAndUpdate({ _id: categoryId }, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    throw new NotFoundError(`No category with id ${categoryId}`)
  }

  res.status(StatusCodes.OK).json({ category })

}


const deleteCategory = async (req, res) => {

  const {
    params: { id: categoryId },
  } = req;

    const category = await Category.findByIdAndDelete({ _id: categoryId });

    if (!category) {
      throw new NotFoundError(`No category with id ${categoryId}`)
    }

    res.status(StatusCodes.OK).json({ category, message: "Deleted successfully" })
  
}


module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}