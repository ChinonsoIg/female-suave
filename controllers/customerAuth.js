const Customer = require("../models/Customer");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const customer = await Customer.create({ ...req.body });
  const token = customer.createJWT();

  res.status(StatusCodes.CREATED).json({ customer: { name: customer.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and passwword");
  }

  const customer = await Customer.findOne({ email });
  if (!customer) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await customer.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = customer.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ customer: { name: customer.name }, token });
};

module.exports = {
  register,
  login,
};
