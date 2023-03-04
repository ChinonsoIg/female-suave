const Customer = require('../models/Customer');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
// const bcrypt = require("bcryptjs");

const getAllCustomersAdmin = async (req, res) => {
  const customers = await Customer
    .find()
    .sort('createdAt')
    .select('-password');

  res.status(StatusCodes.OK).json({ count: customers.length, customers })

}

const getAllCustomersMerchant = async (req, res) => {
  // TODO: Deep filter out my customers

  const customers = await Customer
    .find()
    .sort('createdAt')
    .select('-password');

  res.status(StatusCodes.OK).json({ count: customers.length, customers })

}


const getCustomerAdmin = async (req, res) => {

  const {
    params: { id: userParam }
  } = req

  const customer = await Customer.findOne({ _id: userParam }).select('-password');

  if (!customer) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json({ customer })

}

const getCustomerMerchant = async (req, res) => {

  const {
    params: { id: userParam }
  } = req

  const customer = await Customer.findOne({ _id: userParam }).select('-password');

  if (!customer) {
    throw new NotFoundError(`No user with id ${userId}`)
  }

  res.status(StatusCodes.OK).json({ customer })

}


const getCustomerStorefront = async (req, res) => {

  const {
    customer: { customerId },
    params: { id: userParam }
  } = req

  const customer = await Customer.findOne({ _id: userParam, _id: customerId }).select(['-password', '-__v']);

  if (!customer) {
    throw new NotFoundError(`No user with id ${ customerId }`)
  }

  res.status(StatusCodes.OK).json({ customer })

}


// const updateCustomerAdmin = async (req, res) => {

//   const {
//     body: { status },
//     user: { userId },
//     params: { id: userParam },
//   } = req;

//   if (status === '') {
//     throw new BadRequestError('Status field cannot be empty')
//   }

//   const customer = await Customer.findByIdAndUpdate({ _id: userParam }, status, {
//     new: true,
//     runValidators: true
//   }).select(['-name', '-email', '-address', '-phoneNumber', '-password']);

//   if (!customer) {
//     throw new NotFoundError(`No user with id ${userId}`)
//   }

//   res.status(StatusCodes.OK).json({ customer })

// }

const updateCustomerStorefront = async (req, res) => {

  const {
    body: { name, email, address, phoneNumber },
    customer: { customerId },
    params: { id: userParam },
  } = req;

  if (name === '' || email === '' || address === '', phoneNumber === '') {
    throw new BadRequestError('name, email, address or phone number fields cannot be empty')
  }

  // console.log("res: ", res)
  // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  // const modifiedBody = { ...req.body, password: hashPassword }

  if (customerId !== userParam) {
    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const customer = await Customer.findByIdAndUpdate({ _id: customerId }, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!customer) {
      throw new NotFoundError(`No user with id ${ customerId }`)
    }

    res.status(StatusCodes.OK).json({ customer })
  }

}


const deleteCustomerStorefront = async (req, res) => {

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
  getAllCustomersAdmin,
  getAllCustomersMerchant,
  getCustomerAdmin,
  getCustomerMerchant,
  getCustomerStorefront,
  updateCustomerStorefront,
  deleteCustomerStorefront
}