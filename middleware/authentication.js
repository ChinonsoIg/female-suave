const jwt = require('jsonwebtoken')
const { UnauthenticatedError, CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const authUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.user = { userId: payload.userId, firstName: payload.firstName, lastName: payload.lastName, role: payload.role }

    if (payload.role === 'seller') {
      // remember to call next, else you won't get to job route
      next()
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "UNAUTHORIZED", status: 401 })
    }

  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}


const authCustomer = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.customer = { customerId: payload.customerId, name: payload.name }

    // remember to call next, else you won't get to job route
    next()

  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}


// For Admin authentication and authorization
const authAdmin = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.user = { userId: payload.userId, firstName: payload.firstName, lastName: payload.lastName, role: payload.role }

    if (payload.role === 'admin') {
      // remember to call next, else you won't get to job route
      next()
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "UNAUTHORIZED", status: 401 })
    }

  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = {
  authUser,
  authCustomer,
  authAdmin
};