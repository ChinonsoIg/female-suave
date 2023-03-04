const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
    minLength: 10,
    maxLength: 250,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active'
  },
});

CustomerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

CustomerSchema.methods.createJWT = function () {
  
  return jwt.sign(
    { customerId: this._id, name: this.name },
    `${process.env.JWT_SECRET}`,
    { expiresIn: `${process.env.JWT_LIFETIME}` }
  );
};

CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("Customer", CustomerSchema);
