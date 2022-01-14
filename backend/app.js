require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

// middleware

// if you don't use this, there will be no data in req.body
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', authenticateUser, productsRouter)


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