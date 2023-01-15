const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Add a valid id
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 2,
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
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  
  /*
  Include user role from here
  const schema = new mongoose.Schema({ role: String, name: String });
  schema.set("toObject", { getters: true });
  const M = mongoose.model("UserSchema", schema);
  const m = new M({ name: this.name, role: this.role });
  */
 console.log("this: ", this);


  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    `${process.env.JWT_SECRET}`,
    { expiresIn: `${process.env.JWT_LIFETIME}` }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
