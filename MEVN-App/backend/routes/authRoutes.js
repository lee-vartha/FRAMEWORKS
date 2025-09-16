// referencing express
const express = require('express');
// importing the register, login and getProfile functions from userController
const { register, login, getProfile } = require('../controllers/userController');
const router = express.Router();

// posting to register and login routes
router.post('/register', register);
router.post('/login', login);

// exporting the router
module.exports = router;
