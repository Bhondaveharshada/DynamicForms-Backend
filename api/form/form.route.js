const express = require('express')
const { handleAddFormFields, handleAddForm, handleGetForm, handleGetAllFormFields, handleUpdateFormFields, savelinktoFormfields, deleteFormFields, handleGetOneFormFields} = require("./form.controller")
const router = express.Router();


router.post("/addform",handleAddForm)
router.get('/getForm',handleGetForm) 
router.post('/addformfields',handleAddFormFields);
router.get('/getallformsFields',handleGetAllFormFields)
router.patch('/updateFormFields/:id',handleUpdateFormFields)
router.get('/getformfields/:id', handleGetOneFormFields);
router.put('/savelinktoFormFields/:id',savelinktoFormfields)
router.delete('/deleteformfields/:id',deleteFormFields)
module.exports = router
