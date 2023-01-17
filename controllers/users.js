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
    body: { name, email, address, role, avatar },
    user: { userId, role: userRole },
    params: { id: userParam },
  } = req;

  console.log("req: ", req.body)

  if (name === '' || email === '' || address === '' || role === '' || avatar === '') {
    throw new BadRequestError('name, email, address, password, role or avatar fields cannot be empty')
  }

console.log("res: ", res)
  // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashPassword = await bcrypt.hash(password, salt);

  // const modifiedBody = { ...req.body, password: hashPassword }

  if (userRole === "admin") {
    const user = await User.findByIdAndUpdate({ _id: userParam }, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      throw new NotFoundError(`No user with id ${userId}`)
    }
    user.password = ''

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
    user.password = ''

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

    res.status(StatusCodes.OK).json({ user, message: "Deleted succesfully" })
  }
}


module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}