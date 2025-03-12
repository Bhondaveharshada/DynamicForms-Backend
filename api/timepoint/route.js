const express = require('express');
const router = express.Router();
const intervalController = require('./controller');

router.post('/', intervalController.createInterval);

router.get('/', intervalController.getAllIntervals);

router.get('/:id', intervalController.getIntervalById);

router.put('/:id', intervalController.updateInterval);

router.delete('/:id', intervalController.deleteInterval);

module.exports = router;
