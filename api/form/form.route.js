const express = require('express')
const { getAllSubmittedForms, updateSubmittedForms, getSubmittedForms, handleAddFormFields, handleAddForm, handleGetAllFormFields, handleUpdateFormFields, savelinktoFormfields, deleteFormFields, handleGetOneFormFields, handleGetUserForm, handleGetAllUserForms, handleDeleteUserForm} = require("./form.controller")
const router = express.Router();

router.get('/submitted', getSubmittedForms)
router.post('/update', updateSubmittedForms)
router.get('/allResponses/:patientId', getAllSubmittedForms)
router.post("/addform",handleAddForm)
router.get('/getUserForm/:id',handleGetUserForm) 
router.get('/getallUserForms/:id',handleGetAllUserForms)
router.post('/addformfields',handleAddFormFields);
router.get('/getallformsFields',handleGetAllFormFields)
router.patch('/updateFormFields/:id',handleUpdateFormFields)
router.get('/getformfields/:id', handleGetOneFormFields);
router.put('/savelinktoFormFields/:id',savelinktoFormfields)
router.delete('/deleteformfields/:id',deleteFormFields)
router.delete('/deleteUserForm/:id',handleDeleteUserForm)
module.exports = router
