const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  const {
    user: { role: userRole }
  } = req;

  if (userRole === 'admin') {
    const users = await User
      .find()
      .sort('createdAt')
      .select('-password');

    res.status(StatusCodes.OK).json({ count: users.length, users })

  } else {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })
  }
}


const getUser = async (req, res) => {

  const {
    user: { userId, role: userRole },
    params: { id: userParam }
  } = req

  if (userRole === "admin") {
    const user = await User.findOne({ _id: userParam }).select('-password');

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })

  } else if (userId !== userParam) {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })
  } else {

    const user = await User.findOne({ _id: userId }).select('-password');
    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })
  }
}


const updateUser = async (req, res) => {

  const {
    body: { firstName, lastName, email, address, avatar },
    user: { userId, role: userRole },
    params: { id: userParam },
  } = req;

  if (firstName === '', lastName === '' || email === '' || address === '' || avatar === '') {
    throw new BadRequestError('firstName, lastName, email, address, or avatar fields cannot be empty')
  }

  const modifiableData = {
    firstName,
    lastName,
    email,
    address,
    avatar
  }

  // console.log("res: ", res)
  // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  // const modifiedBody = { ...req.body, password: hashPassword }

  if (userRole === "admin") {
    const user = await User.findByIdAndUpdate({ _id: userParam }, modifiableData, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })

  } else if (userId !== userParam) {
    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const user = await User.findByIdAndUpdate({ _id: userId }, modifiableData, {
      new: true,
      runValidators: true
    }).select('-password');
    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })
  }

}


const deleteUser = async (req, res) => {

  const {
    user: { userId, role: userRole },
    params: { id: userParam }
  } = req;

  if (userRole === "admin") {
    const user = await User.findByIdAndDelete({ _id: userParam }).select('-password');

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user, message: "Success" })

  } else if (userId !== userParam) {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const user = await User.findByIdAndDelete({ _id: userId }).select('-password');
    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user, message: "Deleted succesfully" })
  }
}


module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}