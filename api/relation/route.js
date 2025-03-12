const express = require('express');
const router = express.Router();
const relationController = require('./controller');

router.post('/', relationController.storeRelations);

router.put('/:formId', relationController.updateRelation);

router.delete('/:formId', relationController.deleteRelation);

router.get('/', relationController.getAllRelations);

router.get('/:formId', relationController.getRelationByFormId);


module.exports = router;
