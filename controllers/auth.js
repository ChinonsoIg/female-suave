const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const modifiedBody = { ...req.body, status: "pending", role: "seller" }

  const user = await User.create({ ...modifiedBody });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { firstName: user.firstName, lastName: user.lastName }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and passwword");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }, token });
};

module.exports = {
  register,
  login,
};


