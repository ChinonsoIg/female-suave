const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllUsers = async (req, res) => {
  const {
    user: { role: userRole }
  } = req;

  if (userRole === 'admin') {
    const users = await User
      .find()
      .sort('createdAt')

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
    const user = await User.findOne({ _id: userParam });

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })
    
  } else if (userId !== userParam) {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const user = await User.findOne({ _id: userId, _id: userParam });
    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })
  }
}


const updateUser = async (req, res) => {

  const {
    body: { name, email, address, password, role, avatar },
    user: { userId, role: userRole },
    params: { id: userParam },
  } = req;

  if (name === '' || email === '' || address === '' || password === '' || role === '', avatar === '') {
    throw new BadRequestError('name, email, address, password, role or avatar fields cannot be empty')
  }

  if (userRole === "admin") {
    const user = await User.findByIdAndUpdate({ _id: userParam }, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })
    
  } else if (userId !== userParam) {
    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const user = await User.findByIdAndUpdate({ _id: userId, _id: userParam }, req.body, {
      new: true,
      runValidators: true
    });
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
    const user = await User.findByIdAndDelete({ _id: userParam });

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user, message: "Success" })
    
  } else if (userId !== userParam) {

    res.status(StatusCodes.UNAUTHORIZED).json({ status: 401, message: "UNAUTHORIZED" })

  } else {

    const user = await User.findByIdAndDelete({ _id: userId, _id: userParam });
    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }

    res.status(StatusCodes.OK).json({ user })
  }
}


module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}