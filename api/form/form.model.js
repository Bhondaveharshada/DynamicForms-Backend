const mongoose = require("mongoose")

const formFieldsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    formId:{
        type: Number  
    },
    additionalFields: [
        {
          value: {
            type: String,
            required: true
          }
        }
      ]
});

const formFields = mongoose.model("formFields",formFieldsSchema)

//form
const formSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
  
      additionalFields: [
        {
          value: {
            type: String,
            required: true
          }
        }
      ],

      fields:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'formFields'
     }]

});

const forms = mongoose.model("AddForms",formSchema);



/* const answerSchema = mongoose.Schema({
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
}); */

//const Answers= mongoose.model('Answer', answerSchema);

module.exports = {
    forms,
    formFields
}




