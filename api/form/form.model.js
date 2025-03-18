const mongoose = require("mongoose");



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
        fields: [
          {
            id: {  
              type: String,
              required: true,
            },
            label: {
              type: String,
              required: true,
            },
            inputType: {
              type: String,
              required: true,
            },
            isrequired: {
              type: Boolean,
              default: false,
            },
            validateNumber: {
              type: Boolean,
              default: false,
            },
            softValidation: {
              type: Boolean,
              default: false,
            },  
            numberValidation: {
              type: String,
            },
            allowMultipleSelection:{
              type:Boolean,
              default:false
            },
            options: {
              type: [String], // Array of strings for checkbox and radio options
              validate: {
                validator: function (v) {
                  // Ensure options are provided if the field type is checkbox or radio
                  if (this.inputType === 'checkbox' || this.inputType === 'radio') {
                    return v && v.length > 0;
                  }
                  return true;
                },
                message: 'Options are required for checkbox and radio fields.',
              },
            },
          },
        ],
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

const formFields = mongoose.model("forms", formFieldsSchema);

//form
const formResponseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  patientId: {
    type: String, // Added patientId as a string
    required: true
  },
  timepointId: {
    type: String, // Added timepointId as a string
    required: true
  },
  formId: {
    type: String,
    required: true 
  },
  additionalFields: [
    {
      fields: [
        {
          id: {  
            type: String,
            required: true,
          },
          label: {
            type: String,
            required: true,
          },
          value: {
            type: mongoose.Schema.Types.Mixed
          },
          inputType: {
            type: String,
            required: true,
          },
        },
      ],
    }
  ],
  fields: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'forms'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the update date
  },
});

const formResponse = mongoose.model("From_Response",formResponseSchema);

module.exports = {
    formResponse,
    formFields
}




