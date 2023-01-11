const jwt = require('jsonwebtoken')
// const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.user = { userId: payload.userId, name: payload.name }

    // remember to call next, else you won't get to job route
    next()

  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}


module.exports = auth;