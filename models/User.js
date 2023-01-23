const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add a valid id
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your firstname"],
    minLength: 2,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your lastname"],
    minLength: 2,
    maxLength: 30,
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
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "seller"],
    required: [true, "Please enter user role"],
  },
  avatar: {
    type: String,
    required: [true, "Please provide a passport"],
  },
  status: {
    type: String,
    enum: ["pending", "active", "suspended"],
    required: [true, "Please ascertain user status"],
  }
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {

  return jwt.sign(
    { userId: this._id, firstName: this.firstName, lastName: this.lastName, role: this.role },
    `${process.env.JWT_SECRET}`,
    { expiresIn: `${process.env.JWT_LIFETIME}` }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
