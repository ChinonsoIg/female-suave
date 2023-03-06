const Review = require('../models/Review');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');

const createReview = async (req, res) => {
  
  res.status(StatusCodes.CREATED).json({ message: 'Review created', status: 201 });
};

const getAllReviews = async (req, res) => {
  
  res.status(StatusCodes.OK).json({ message: 'Reviews fetched', status: 200 });
};

const getSingleReview = async (req, res) => {
  
  res.status(StatusCodes.OK).json({ message: 'Review fetched', status: 200 });
};

const updateReview = async (req, res) => {
  
  res.status(StatusCodes.OK).json({ message: 'Review updated', status: 200 });
};

const deleteReview = async (req, res) => {
  
  res.status(StatusCodes.OK).json({ message: 'Success! Review removed', status: 200 });
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};