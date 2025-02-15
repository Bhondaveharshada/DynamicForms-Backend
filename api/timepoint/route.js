const express = require('express');
const router = express.Router();
const intervalController = require('./controller');

// Route to create a new interval
router.post('/', intervalController.createInterval);

// Route to get all intervals
router.get('/', intervalController.getAllIntervals);

// Route to get a single interval by ID
router.get('/:id', intervalController.getIntervalById);

// Route to update an interval
router.put('/:id', intervalController.updateInterval);

// Route to delete an interval
router.delete('/:id', intervalController.deleteInterval);

module.exports = router;
