const express = require('express');
const router = express.Router();

const {
  authUser,
  authCustomer,
  adminAuthorization,
} = require('../middleware/authentication');


const {
  getAllOrders,
  getSingleOrder,
  getCurrentCustomerOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orders');

router
  .route('/')
  .post(authCustomer, createOrder)
  .get(authUser, adminAuthorization, getAllOrders)

router
  .route('/showAllCustomerOrders')
  .get(authCustomer, getCurrentCustomerOrders)

router.route('/:id').get(getSingleOrder).patch(updateOrder)


module.exports = router;


// Familiarizing yourself with the company's existing frontend codebase, technology stack, and development processes.

// Participating in team meetings and discussions to understand the goals and objectives of ongoing and upcoming projects.

// Contributing to the development of user interfaces and web applications, ensuring they are visually appealing, intuitive, and user-friendly.

// Collaborating with back-end developers to integrate frontend and back-end systems, ensuring seamless and efficient communication between the two.

// Ensuring that the frontend code you write is optimized for performance, accessibility, and compatibility with multiple devices and browsers.

// Participating in code reviews and testing to ensure the quality of the code and identify any potential bugs.

// Keeping up to date with the latest frontend technologies and trends, and recommending any improvements to the development team.

// Participating in training and development opportunities to continually improve your skills and knowledge.

// Building and maintaining documentation for the frontend codebase and processes.

// Staying organized and keeping accurate records of your work and progress, to enable effective collaboration and project management.

// These are some of the main activities you might undertake during your first three months as a frontend developer. The specific tasks you work on may vary depending on the needs of your team and organization.
