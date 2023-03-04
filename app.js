require('dotenv').config()
require('express-async-errors')

// Extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');

const app = express();

const connectDB = require('./db/connect');
const { authUser, authCustomer } = require('./middleware/authentication')

const authRouter = require('./routes/auth');
const customerAuth = require('./routes/customerAuth');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');
// const reviewsRouter = require('./routes/reviews');
const errorHandler = require('./middleware/error-handler')

// middleware
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}))
app.use(express.json()) // if you don't use this, there will be no data in req.body
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req, res) => {
  res.send('E-commerce  API')
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/customer/auth', customerAuth)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/customers', customersRouter)
// app.use('/api/v1/reviews', reviewsRouter)


app.use(errorHandler)

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

module.exports = app;