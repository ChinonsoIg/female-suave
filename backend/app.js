// const connectDB = require('./db/connect');
require('dotenv').config()

const express = require('express');
const app = express();
// const tasks = require('./routes/tasks');


// middleware

// if you don't use this, there will be no data in req.body
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('e-commerce api')
})

// app.use('/api/v1/tasks', tasks)


const port = 5000;


const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server listening on port ${port}...`))
  } catch (error) {
    console.log('ERROR:...', error)
  }
};


start();