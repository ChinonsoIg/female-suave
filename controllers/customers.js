const Customer = require('../models/Customer');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
// const bcrypt = require("bcryptjs");

const getAllCustomers = async (req, res) => {

  const customers = await Customer
    .find()
    .sort('createdAt')
    .select('-password');

  res.status(StatusCodes.OK).json({ count: customers.length, customers })

}

const getAllMerchantCustomers = async (req, res) => {
  // To be continued
  
  // const customers = await Customer
  //   .find()
  //   .sort('createdAt')
  //   .select('-password');

  // res.status(StatusCodes.OK).json({ count: customers.length, customers })

}


const getCustomer = async (req, res) => {

  const {
    user: { userId, role: userRole },
    params: { id: userParam }
  } = req

  // if (userRole === "admin") {
    const customer = await Customer.findOne({ _id: userParam }).select('-password');

    if (!customer) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ customer })

  // } else if (userId !== userParam) {

  //   res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })
  // } else {

  //   const customer = await Customer.findOne({ _id: userId }).select('-password');
  //   if (!customer) {
  //     throw new NotFoundError(`No user with id ${userId}`)
  //   }

  //   res.status(StatusCodes.OK).json({ customer })
  // }
}


const updateCustomer = async (req, res) => {

  const {
    body: { status },
    user: { userId, role: userRole },
    params: { id: userParam },
  } = req;

  if (status === '') {
    throw new BadRequestError('Status field cannot be empty')
  }

  // console.log("res: ", res)
  // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  // const modifiedBody = { ...req.body, password: hashPassword }

  if (userRole === "admin") {
    const customer = await Customer.findByIdAndUpdate({ _id: userParam }, status, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!customer) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ customer })

  } else if (userId !== userParam) {
    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const customer = await Customer.findByIdAndUpdate({ _id: userId }, modifiableData, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!customer) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ customer })
  }

}


const deleteCustomer = async (req, res) => {

  const {
    user: { userId, role: userRole },
    params: { id: userParam }
  } = req;

  if (userRole === "admin") {
    const customer = await Customer.findByIdAndDelete({ _id: userParam }).select('-password');

    if (!customer) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ customer, message: "Success" })

  } else if (userId !== userParam) {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const customer = await Customer.findByIdAndDelete({ _id: userId }).select('-password');
    if (!customer) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ customer, message: "Deleted succesfully" })
  }
}


module.exports = {
  getAllCustomers,
  getAllMerchantCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
}