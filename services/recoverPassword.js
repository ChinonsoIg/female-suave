// const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Token = require('../models/Token');
const sendEmail = require('../utils/email/sendMail');

// const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;


const requestPasswordReset = async (email) => {

  const user = await User.findOne({ email });

  if (!user) throw new Error('User does not exist');
  let token = await Token.findOne({ userId: user._id });

  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString('hex');
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/reset-password/${resetToken}/${user._id}`;


  sendEmail(
    user.email,
    'Password Reset Request', 
    {name: user.firstName, link: link}, 
    './template/requestResetPassword.handlebars'
  );

  return link;

}

const resetPassword = async (userId, token, password) => {

  let user = await Token.findOne({ userId });

  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  sendEmail(
    user.email,
    'Password Reset Successful', 
    {name: user.firstName}, 
    './template/resetPassword.handlebars'
  );
  
}


module.exports = {
  requestPasswordReset,
  resetPassword
}