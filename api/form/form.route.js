const express = require('express')
const {handleAddForm} = require("./form.controller")
const router = express.Router();


router.post("/addform",handleAddForm)


module.exports = router
