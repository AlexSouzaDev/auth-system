const express = require('express');
const authController = require('../controllers/authController'); // Importing auth controller
const router = express.Router(); // Create a new router instance


router.post('/register', authController.register); // Route for user registration

module.exports = router;
