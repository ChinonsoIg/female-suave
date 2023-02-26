const express = require('express');
const router = express.Router();

const { authUser, adminAuthorization } = require('../middleware/authentication');
// const authenticateUser = require('../middleware/authentication');

const {
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customers');


router.route('/').get(authUser, getAllCustomers)
router.route('/:id').get(getCustomer).patch(adminAuthorization, updateCustomer).delete(deleteCustomer)


module.exports = router