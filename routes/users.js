const express = require('express');
const router = express.Router();

const { authUser, authAdmin } = require('../middleware/authentication');

const {
  getAllUsers,
  getUserAdmin,
  getUserMerchant,
  updateUserAdmin,
  updateUserMerchant,
  deleteUserAdmin,
  deleteUserMerchant,
} = require('../controllers/users');

// For merchant
router
  .route('/merchant/:id')
  .get(authUser, getUserMerchant)
  .patch(authUser, updateUserMerchant)
  .delete(authUser, deleteUserMerchant)


// For admin
router
  .route('/admin')
  .get(authAdmin, getAllUsers)

router
  .route('/admin/:id')
  .get(authAdmin, getUserAdmin)
  .patch(authAdmin, updateUserAdmin)
  .delete(authAdmin, deleteUserAdmin)


module.exports = router;