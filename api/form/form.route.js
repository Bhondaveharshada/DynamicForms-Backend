const express = require('express')
const { handleAddFormFields, handleGetFormFields, handleAddForm, handleGetForm} = require("./form.controller")
const router = express.Router();


router.post("/addform",handleAddForm)
router.get('/getForm',handleGetForm) 
router.post('/addformfields',handleAddFormFields);
router.get('/getformfields/:id', handleGetFormFields);


module.exports = router
