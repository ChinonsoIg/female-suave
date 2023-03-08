const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {

  const users = await User
    .find()
    .sort('createdAt')
    .select('-password');

  res.status(StatusCodes.OK).json({ count: users.length, users })

}


const getUserAdmin = async (req, res) => {

  const {
    user: { userId },
    params: { id: userParam }
  } = req;

  const user = await User.findOne({ _id: userParam }).select('-password');

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json({ user })

}


const getUserMerchant = async (req, res) => {

  const {
    user: { userId },
  } = req;

  const user = await User.findOne({ _id: userId }).select(['-password', '-status', '-role']);

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json({ user })

}


const updateUserAdmin = async (req, res) => {

  const {
    body: { status },
    params: { id: userParam },
  } = req;

  if (status === '') {
    throw new BadRequestError('status field cannot be empty')
  }

  const user = await User.findOneAndUpdate(
    { _id: userParam },
    { $set: { 'status': status } }
  )

  if (!user) {
    throw new NotFoundError(`No user with id ${userParam}`)
  }

  res
    .status(StatusCodes.OK)
    .json({ message: 'Update successful', status: 200 })

}


const updateUserMerchant = async (req, res) => {

  const {
    body: { firstName, lastName, email, address, phoneNumber, avatar },
    user: { userId },
    // params: { id: userParam },
  } = req;

  if (firstName === '', lastName === '' || email === '' || address === '', phoneNumber === '') {
    throw new BadRequestError('firstName, lastName, email, address, or avatar fields cannot be empty')
  }

  const modifiableData = {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    avatar
  }

  // console.log("res: ", res)
  // hash password  
  // const salt = await bcrypt.genSalt(10); 
  // const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.findByIdAndUpdate({ _id: userId }, modifiableData, {
    new: true,
    runValidators: true
  }).select(['-password', '-role', '-status']);

  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json({ user })

}


// const deleteUserAdmin = async (req, res) => {

//   const {
//     user: { userId },
//     params: { id: userParam }
//   } = req;

//   const user = await User.findByIdAndDelete({ _id: userParam });

//   if (!user) {
//     throw new NotFoundError(`No user with id ${ userId }`)
//   }

//   res.status(StatusCodes.OK).json({ user, message: "Deleted successfully" })

// }


const deleteUserMerchant = async (req, res) => {

  const {
    user: { userId },
    // params: { id: userParam }
  } = req;

  const user = await User.findByIdAndDelete({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No user with id ${ userId }`)
  }

  res.status(StatusCodes.OK).json({ user, message: "Deleted successfully" })

}


module.exports = {
  getAllUsers,
  getUserAdmin,
  getUserMerchant,
  updateUserAdmin,
  updateUserMerchant,
  deleteUserMerchant
}