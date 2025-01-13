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
        label: {
          type: String,
          required: true,
        },
        inputType: {
          type: String,
          required: true,
        },
        isrequired:{
          type: Boolean,
          default: false,

        },
        options: {
          type: [String], // Array of strings for checkbox and radio options
          validate: {
            validator: function (v) {
              // Ensure options are provided if the field type is checkbox or radio
              if (this.type === 'checkbox' || this.type === 'radio') {
                return v && v.length > 0;
              }
              return true;
            },
            message: 'Options are required for checkbox and radio fields.',
          },
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
    timestamps: true, 
  }
    
);


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
            type: mongoose.Schema.Types.Mixed,
            
          },
          inputType: {
            type: String,
            
          },
          label:{
            type:String
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




