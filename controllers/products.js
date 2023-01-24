const Product = require('../models/Products');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllProducts = async (req, res) => {

  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || '';
  // let sort = req.query.sort || 'rating'; 
  let searchString = search.split(" ").map(s => new RegExp(s));

  if (req.user.role === 'admin') {
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
      .skip(page * limit)
      .limit(limit)

    const response = await Promise.all([products, docCount]);

    res.status(StatusCodes.OK).json({ perPageCount: response[0].length, totalCount: response[1], products: response[0] })
  } else {

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 3;
    const search = req.query.search || '';
    // let sort = req.query.sort || 'rating';  
    let searchString = search.split(" ").map(s => new RegExp(s));

    const docCount = Product.countDocuments({
      createdBy: req.user.userId,
      $or: [
        { name: { $in: searchString } }, { description: { $in: searchString } }
      ]
    });
    const products = Product
      .find({ 
        createdBy: req.user.userId,
        $or: [
          { name: { $in: searchString } }, { description: { $in: searchString } }
        ]
      })
      .sort('createdAt')
      .skip(page * limit)
      .limit(limit)

    const response = await Promise.all([products, docCount]);

    res.status(StatusCodes.OK).json({ perPageCount: response[0].length, totalCount: response[1], products: response[0] })

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


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}