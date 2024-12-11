const formModel = require('./form.model')
const bcrypt = require('bcrypt')

const handleAddUser = async(req,res,next)=>{
    console.log(req.body.lname)
    
  await formModel.findOne({email:req.body.email})
   .exec()
   .then(user =>{
    if(user){
        return res.status(409).json({
            message:'Mail Already Exist'
        })
    }else{
        console.log(req.body.password);
        
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else{
                const user = new RegisterUser({
                    name:req.body.fname,
                    L_name:req.body.lname,
                    email:req.body.email,
                    password: hash,
                    isAgree:req.body.isAgree
                });
                user.save()
                .then(result=>{
                    res.status(201).json({
                        message:'User Created'
                    })
                })
                .catch(err=>{
                    res.status(500).json({
                        error:err
                    })
                })
            }
        })
    }
})
}

module.exports = {
    handleAddUser
}
