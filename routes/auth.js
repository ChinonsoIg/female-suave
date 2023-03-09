const express = require('express');
const router = express.Router();

const { 
  login, 
  register,
  requestPasswordResetController,
  resetPasswordController
} = require('../controllers/auth');



router.post('/register', register)

router.post('/login', login)


router.post('/request-password-reset', requestPasswordResetController)
router.post('/reset-password', resetPasswordController)

module.exports = router;