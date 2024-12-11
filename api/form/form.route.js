const express = require('express')
const {handleAddUser} = require("./form.controller")
const router = express.Router();


router.post("/addUser",handleAddUser)


module.exports = router
