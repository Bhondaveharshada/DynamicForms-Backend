const formModel = require('./form.model')
const bcrypt = require('bcrypt')

const handleAddForm = async(req,res)=>{
     
   try{

    const addform = new formModel.forms({
        title:req.body.title,
        question:req.body.question,
        formId: req.body.formId
    })

    const result = await addform.save()
    res.status(201).json({
        message:"form created",
        result : result
    })


   } catch(err){
       res.status(500).json({
        error: err,
        
       })
   }

    }



module.exports = {
    handleAddForm
}
