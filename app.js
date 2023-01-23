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
const authenticateUser = require('./middleware/authentication')
const authenticateAdmin = require('./middleware/adminAuthentication');

const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customerAuth');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

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

// app.get('/', (req, res) => {
//   res.send('Jobs API')
// })
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