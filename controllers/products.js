const Product = require('../models/Products');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllProducts = async (req, res) => {

  const {
    user: { userId, role },
    query: { page, limit, search }
  } = req;

  let parsePage = parseInt(page) || 0;
  const pageCount = parsePage === 0 ? 0 : parsePage-1;
  const limitNumber = parseInt(limit) || 10;
  const searchQuery = search || '';
  // let sort = sort || 'rating'; 
  let searchString = searchQuery.split(" ").map(s => new RegExp(s));

  if (role === 'admin') {
    const docCount = Product.countDocuments({
      $or: [
        { name: { $in: searchString } }, { description: { $in: searchString } }
      ]
    });
    const products = Product
      .find({
        $or: [
          { name: { $in: searchString } }, { description: { $in: searchString } }
        ]
      })
      .sort('createdAt')
      .skip(pageCount * limitNumber)
      .limit(limitNumber)

    const response = await Promise.all([products, docCount]);

    res.status(StatusCodes.OK).json({ productsPerPage: response[0].length, totalProducts: response[1], products: response[0] })
  } else {

    const docCount = Product.countDocuments({
      createdBy: userId,
      $or: [
        { name: { $in: searchString } }, { description: { $in: searchString } }
      ]
    });
    const products = Product
      .find({
        createdBy: userId,
        $or: [
          { name: { $in: searchString } },
          { description: { $in: searchString } },
        ]
      })
      .sort('createdAt')
      .skip(pageCount * limitNumber)
      .limit(limitNumber)

    const response = await Promise.all([products, docCount]);

    res.status(StatusCodes.OK).json({ productsPerPage: response[0].length, totalProducts: response[1], products: response[0] })

  }
}


const getProduct = async (req, res) => {

  const {
    user: { userId, role },
    params: { id: productId }
  } = req;

  if (role === "admin") {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new NotFoundError(`No product with id ${productId}`)
    }

    res.status(StatusCodes.OK).json({ product })

  } else {
    const product = await Product.findOne({ _id: productId, createdBy: userId });

    if (!product) {
      throw new NotFoundError(`No product with id ${productId}`)
    }

    res.status(StatusCodes.OK).json({ product })
  }
}


const createProduct = async (req, res) => {
  const {
    user: { userId },
  } = req;

  // the code below links each product to the creator
  req.body.createdBy = userId;

  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}
// "Path `name` (`bee and bee body cream`) is longer than the maximum allowed length (20)."
// status
// : 
// 400

const updateProduct = async (req, res) => {

  const {
    body: { name, categoryId, price, quantity, description, status },
    user: { userId },
    params: { id: productId },
  } = req;

  if (name === '' || categoryId === '' || price === '', quantity === '' || description === '', status === '') {
    throw new BadRequestError('product name, categoryId, price, quantity, or description fields cannot be empty')
  }

  const product = await Product.findByIdAndUpdate({ 
    _id: productId, createdBy: userId }, 
    { 
      $inc: { quantity: req.body.quantity }, 
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status,
      image: req.body.image
    }, 
    {
      new: true,
      runValidators: true
    }
  );

  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product })
}


const deleteProduct = async (req, res) => {

  const {
    user: { userId },
    params: { id: productId }
  } = req;

  // Note this can delete another product
  const product = await Product.findOneAndDelete({ _id: productId, createdBy: userId })

  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product, messsage: "Deleted successfully" })
}



const getProductsByCategory = async (req, res) => {

  const {
    user: { userId, role },
    params: { categoryId },
    query: { page, limit, search }
  } = req;

  let parsePage = parseInt(page) || 0;
  const pageCount = parsePage === 0 ? 0 : parsePage-1;
  const limitNumber = parseInt(limit) || 10;
  const searchQuery = search || '';
  // let sort = sort || 'rating';
  let searchString = searchQuery.split(" ").map(s => new RegExp(s));

  if (role === 'admin') {
    const docCount = Product.find.countDocuments({
      categoryId,
      $or: [
        { name: { $in: searchString } }, { description: { $in: searchString } }
      ]
    });
    const products = Product
      .find({
        categoryId,
        $or: [
          { name: { $in: searchString } }, { description: { $in: searchString } }
        ]
      })
      .sort('createdAt')
      .skip(pageCount * limitNumber)
      .limit(limitNumber)

    const response = await Promise.all([products, docCount]);

    res.status(StatusCodes.OK).json({ productsPerPage: response[0].length, totalProducts: response[1], products: response[0] })
  } else {

    const docCount = Product.countDocuments({
      createdBy: userId,
      categoryId,
      $or: [
        { name: { $in: searchString } }, { description: { $in: searchString } }
      ]
    });
    const products = Product
      .find({
        createdBy: userId,
        categoryId,
        $or: [
          { name: { $in: searchString } }, { description: { $in: searchString } }
        ]
      })
      .sort('createdAt')
      .skip(pageCount * limitNumber)
      .limit(limitNumber)

    const response = await Promise.all([products, docCount]);

    res.status(StatusCodes.OK).json({ productsPerPage: response[0].length, totalProducts: response[1], products: response[0] })

  }
}


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
}