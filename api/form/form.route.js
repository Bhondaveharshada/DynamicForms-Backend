const express = require('express')
const { handleAddFormFields, handleAddForm, handleGetAllFormFields, handleUpdateFormFields, savelinktoFormfields, deleteFormFields, handleGetOneFormFields, handleGetUserForm, handleGetAllUserForms} = require("./form.controller")
const router = express.Router();


router.post("/addform",handleAddForm)
router.get('/getUserForm/:id',handleGetUserForm) 
router.get('/getallUserForms/:id',handleGetAllUserForms)
router.post('/addformfields',handleAddFormFields);
router.get('/getallformsFields',handleGetAllFormFields)
router.patch('/updateFormFields/:id',handleUpdateFormFields)
router.get('/getformfields/:id', handleGetOneFormFields);
router.put('/savelinktoFormFields/:id',savelinktoFormfields)
router.delete('/deleteformfields/:id',deleteFormFields)
module.exports = router
