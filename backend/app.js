const connectDB = require('./db/connect');
require('dotenv').config()

const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const productsRoute = require('./routes/products');

// middleware

// if you don't use this, there will be no data in req.body
app.use(express.json())

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productsRoute)


const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log('ERROR:...', error)
  }
};


start();