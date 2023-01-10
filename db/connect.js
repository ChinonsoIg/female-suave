const mongoose = require('mongoose');

const connectDB = (url) => {
  console.log("am here!! ")
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    // Deprecated in Mongoose v6
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
}

module.exports = connectDB;