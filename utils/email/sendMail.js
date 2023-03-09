const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM;


const sendEmail = (email, subject, payload, template) => {

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  });

  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: subject,
    html: compiledTemplate(payload)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // console.log(error);
      return error;
    } else {
      // console.log('Email sent: ' + info);
      return res.status(200).json({
        success: true,
      });
    }
  });


}



module.exports = sendEmail;