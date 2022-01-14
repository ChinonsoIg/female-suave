const Product = require("../models/Products");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllProducts = async (req, res) => {
  const products = await Product
    .find({ createdBy: req.user.userId })
    .sort('createdAt')

  res.status(StatusCodes.OK).json({ count: products.length, products })
}


const getProduct = async (req, res) => {

  const { 
    user: { userId }, 
    params: { id: productId } 
  } = req;

  const product = await Product.findOne({ _id: productId, createdBy: userId });
  
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}


const createProduct = async (req, res) => {
  // the code below links each product to the creator
  req.body.createdBy = req.user.userId;

  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}


const updateProduct = async (req, res) => {

  const {
    body: { name, category, price, description },
    user: { userId },
    params: { id: productId },
  } = req;

  if (name === '' || category === '' || price === '' || description === '') {
    throw new BadRequestError('product name, category, price, or description fields cannot be empty')
  }

  const product = await Product.findByIdAndUpdate({ _id: productId, createdBy: userId }, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}


const deleteProduct = async (req, res) => {

  const { 
    user: { userId },
    params: { id: productId }
  } = req;
    
  const product = await Product.findOneAndDelete({ _id: productId, createdBy: userId })

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}