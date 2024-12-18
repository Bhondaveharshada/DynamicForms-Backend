const mongoose = require("mongoose");
const { link } = require("./form.route");

const formFieldsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    formId: {
      type: Number,
    },
    
    additionalFields: [
      {
        value: {
          type: String,
          required: true,
        },
        inputType: {
          type: String,
          required: true,
        },
      },
    ],

    formLink: {
      type: String,
      required: false, // Optional field
      validate: {
        validator: function (v) {
          // Basic URL validation
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid link!`,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const formModel = mongoose.model('FormFields', formFieldsSchema);

module.exports = formModel;


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

    fields:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'formFields'
    }

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




