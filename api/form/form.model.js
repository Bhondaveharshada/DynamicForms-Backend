const mongoose = require("mongoose")

const formSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    L_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAgree:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Forms",formSchema)