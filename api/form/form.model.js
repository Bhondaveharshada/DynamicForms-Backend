const mongoose = require("mongoose")

const formSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    formId: {
        type:Number,
    }

});

const forms = mongoose.model("AddForms",formSchema);



const answerSchema = mongoose.Schema({
    formId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'AddForms', // Refers to the formSchema
    },
    question: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'AddForms', // Refers to the question within the form
    },
    answer: {
        type: String,
        required: true,
    },
});

const Answers= mongoose.model('Answer', answerSchema);

module.exports = {
    forms,
    Answers
}




