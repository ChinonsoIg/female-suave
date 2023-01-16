const express = require('express');
const router = express.Router();

const { 
  login, 
  register,
  getAllUsers,
} = require('../controllers/auth');


router.post('/register', register)

router.post('/login', login)

router.get('/users', getAllUsers)


module.exports = router;