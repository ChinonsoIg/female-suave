const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/authentication');

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users');


router.route('/').get(authUser, getAllUsers)
router.route('/:id').get(authUser, getUser).patch(authUser, updateUser).delete(authUser, deleteUser)


module.exports = router;