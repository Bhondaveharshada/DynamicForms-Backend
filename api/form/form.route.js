const express = require('express')
const {handleAddForm, handleGetForm, handleAddFormFields} = require("./form.controller")
const router = express.Router();


router.post("/addform",handleAddForm)
router.get('/getForm',handleGetForm)
router.post('/addformfields',handleAddFormFields)


module.exports = router
