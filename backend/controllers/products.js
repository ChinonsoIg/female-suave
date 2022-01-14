const Product = require("../models/Products");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');


const getAllProducts = async (req, res) => {
  // const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')

  // res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
  res.send('get all products')
}


const getProduct = async (req, res) => {
  res.send('get single product')

  // const { user: { userId }, params: { id: jobId } } = req;
  // const job = await Job.findOne({ _id: jobId, createdBy: userId });
  
  // if (!job) {
  //   throw new NotFoundError(`No job with id ${jobId}`)
  // }

  // res.status(StatusCodes.OK).json({ job })
}


const createProduct = async (req, res) => {
  // res.send('create product')
  res.json(req.body)

  // req.body.createdBy = req.user.userId;
  // const job = await Job.create(req.body)

  // res.status(StatusCodes.CREATED).json({ job })
}


const updateProduct = async (req, res) => {
  res.send('update product')
  // const {
  //   body: { company, position },
  //   user: { userId },
  //   params: { id: jobId },
  // } = req;

  // if (company === '' || position === '') {
  //   throw new BadRequestError('Company or Position fields cannot be empty')
  // }

  // const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, {
  //   new: true,
  //   runValidators: true
  // });

  // if (!job) {
  //   throw new NotFoundError(`No job with id ${jobId}`)
  // }

  // res.status(StatusCodes.OK).json({ job })
}


const deleteProduct = async (req, res) => {
  res.send('delete prodcut')
  // const { 
  //   user: { userId },
  //   params: { id: jobId }
  // } = req;
    
  // const job = await Task.findOneAndDelete({ _id: jobId, createdBy: userId })

  // if (!job) {
  //   throw new NotFoundError(`No task with id : ${jobId}`)
  // }

  // res.status(StatusCodes.OK).json({ job })
}


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}