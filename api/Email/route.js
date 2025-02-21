const express = require('express');
const router = express.Router();
const emailController = require('./controller');

router.post('/formSubmitted', emailController.FormSubmittedEmail);

module.exports = router;