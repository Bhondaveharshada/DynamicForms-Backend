const express = require('express');
const router = express.Router();
const relationController = require('./controller');

// Store relations (bulk insert)
router.post('/', relationController.storeRelations);

// Update a relation by form ID
router.put('/:formId', relationController.updateRelation);

// Delete a relation by form ID
router.delete('/:formId', relationController.deleteRelation);

// Fetch all relations
router.get('/', relationController.getAllRelations);

// Fetch relations by form ID
router.get('/:formId', relationController.getRelationByFormId);


module.exports = router;
