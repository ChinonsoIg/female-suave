const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');

const adminAuth = async (req, res, next) => {

  try {
    const { user: { role } } = req;
    if (role === 'admin') {
      next()
      return;
    }

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })

  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: 'UNAUTHORIZED' })
  }

}

module.exports = adminAuth;