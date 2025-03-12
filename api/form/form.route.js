const express = require('express')
const { getAllSubmittedForms, updateSubmittedForms, getSubmittedForms, createForm, saveResponse, getAllForms, updateForm, saveLinkToForm, deleteForm, getForm, getResponse, getAllResponse, deleteResponse} = require("./form.controller")
const router = express.Router();

router.get('/submitted', getSubmittedForms)
router.post('/update', updateSubmittedForms)
router.get('/allResponses/:patientId', getAllSubmittedForms)
router.post("/addform",saveResponse)
router.get('/getUserForm/:id',getResponse) 
router.get('/getallUserForms/:id',getAllResponse)
router.post('/addformfields',createForm);
router.get('/getallformsFields',getAllForms)
router.patch('/updateFormFields/:id',updateForm)
router.get('/getformfields/:id', getForm);
router.put('/savelinktoFormFields/:id',saveLinkToForm)
router.delete('/deleteformfields/:id',deleteForm)
router.delete('/deleteUserForm/:id',deleteResponse)
module.exports = router
