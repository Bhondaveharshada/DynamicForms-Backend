const express = require('express');
const router = express.Router();
const { generateResponse } = require('./controller');

// Route for OpenAI API proxy
router.post('/', generateResponse);

module.exports = router;
