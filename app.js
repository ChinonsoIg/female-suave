require('dotenv').config()
require('express-async-errors')
const express = require('express');
const cors = require('cors');

// newly added
// var bodyParser = require('body-parser');


const app = express();


// newly added
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())

// Add cors
app.use(cors({
  origin: '*'
}));



const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customerAuth');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

// middleware

// if you don't use this, there will be no data in req.body
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/customer/auth', customersRouter)
app.use('/api/v1/products', authenticateUser, productsRouter)
app.use('/api/v1/users', authenticateUser, usersRouter)
app.use('/api/v1/categories', authenticateUser, categoriesRouter)


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