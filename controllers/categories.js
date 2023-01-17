const Category = require('../models/Categories');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllCategories = async (req, res) => {
  const {
    user: { role: userRole }
  } = req;

  if (userRole === 'admin') {
    const categories = await Category
      .find()
      .sort('createdAt')

    res.status(StatusCodes.OK).json({ count: categories.length, categories })
  } else {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })
  }
}


const getCategory = async (req, res) => {

  const {
    user: { role: userRole },
    params: { id: categoryId }
  } = req;

  if (userRole === "admin") {
    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      throw new NotFoundError(`No category with id ${categoryId}`)
    }

    res.status(StatusCodes.OK).json({ category })

  } else {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })
  }
}


const createCategory = async (req, res) => {
  // Attach a user to the category created
  req.body.createdBy = req.user.userId

  const {
    user: { role: userRole }
  } = req;

  if (userRole === "admin") {
    let checkCategory = await Category.exists({ categoryName: req.body.categoryName });

    if (checkCategory) {

      res.status(StatusCodes.BAD_REQUEST).json({ status: 400, message: "Category name already exists" })
    } else {

      const category = await Category.create(req.body)
      res.status(StatusCodes.CREATED).json({ category })
    }

  } else {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })
  }
}


const updateCategory = async (req, res) => {

  const {
    body: { categoryName },
    user: { role: userRole },
    params: { id: categoryId },
  } = req;

  if (categoryName === '') {
    throw new BadRequestError('categoryName cannot be empty')
  }

  if (userRole === "admin") {

    const category = await Category.findByIdAndUpdate({ _id: categoryId }, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!category) {
      throw new NotFoundError(`No category with id ${categoryId}`)
    }
  
    res.status(StatusCodes.OK).json({ category })
  } else {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })
  }
}


const deleteCategory = async (req, res) => {

  const {
    user: { role: userRole },
    params: { id: categoryId },
  } = req;

  if (userRole === "admin") {

    const category = await Category.findByIdAndDelete({ _id: categoryId });
  
    if (!category) {
      throw new NotFoundError(`No category with id ${categoryId}`)
    }
  
    res.status(StatusCodes.OK).json({ category, message: "Deleted successfully" })
  } else {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })
  }
}


module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}