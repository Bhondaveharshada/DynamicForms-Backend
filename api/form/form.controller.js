const formModel = require('./form.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


const createForm = async (req, res) => {
  try {
    const {
      formId,
      data: { title, additionalFields },
    } = req.body;
    
    // Log the data being received
    console.log("Form Data:", JSON.stringify({ title, additionalFields }));

    // No changes needed here as the frontend should send field IDs
    const savedForm = await new formModel.formFields({
      title,
      formId,
      additionalFields,
    }).save();

    res
      .status(201)
      .json({ message: "Form saved successfully", result: savedForm });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ message: "Failed to save form" });
  }
};

const getForm = async (req, res) => {
  try {
    const { id } = req.params;
    const formFields = await formModel.formFields.findById(id);

    if (!formFields) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form fetched successfully', result: formFields });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'Failed to fetch form' });
  }
};

const getAllForms = async (req, res) => {
  try {

    const allForms = await formModel.formFields.find();

    res.status(200).json({
      message: 'All forms retrieved successfully',
      result: allForms
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Failed to fetch forms' });
  }
};


const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    // Extract data from req.body.data
    const { title, additionalFields } = req.body.data;

    const processedAdditionalFields = additionalFields.map(row => {
      return {
        fields: row.fields.map(field => {
          // Create a new object with both required and isrequired
          return {
            ...field,
            isrequired: field.required !== undefined ? field.required : field.isrequired
          };
        })
      };
    });

    const updatedForm = await formModel.formFields.findByIdAndUpdate(
      id, 
      { $set: { title, additionalFields: processedAdditionalFields } },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form updated successfully', result: updatedForm });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Failed to update form', error: error.message });
  }
};


const saveLinkToForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { formLink } = req.body;

    const updatedForm = await formModel.formFields.findByIdAndUpdate(
      id,
      { $set: { formLink: String(formLink) } },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form link updated successfully', result: updatedForm });
  } catch (error) {
    console.error('Error updating form link:', error);
    res.status(500).json({ message: 'Failed to update form link' });
  }
};

const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await formModel.formFields.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully', result: deletedForm });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ message: 'Failed to delete form' });
  }
};
        
    
const saveResponse = async (req, res) => {
  try {
    const { title, patientId, timepointId, formId, additionalFields, fieldsId } = req.body;
    console.log("formData response", JSON.stringify({ title, patientId, timepointId, formId, additionalFields, fieldsId }));

    // Ensure each field in additionalFields has an ID
    // This is important if your frontend code might send responses without IDs
    const processedAdditionalFields = additionalFields.map(row => {
      return {
        fields: row.fields.map(field => {
          // If field doesn't have an ID (for backward compatibility)
          if (!field.id) {
            field.id = `field_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
          }
          return field;
        })
      };
    });

    const savedResponse = await new formModel.formResponse({
      title,
      patientId,
      timepointId,
      formId, 
      additionalFields: processedAdditionalFields,
      fields: fieldsId
    }).save();

    res.status(201).json({ message: 'Form response saved successfully', result: savedResponse });
  } catch (error) {
    console.error('Error saving form response:', error);
    res.status(500).json({ message: 'Failed to save form response' });
  }
};

const getResponse = async(req,res)=>{
  try{
    const {id} = req.params

    const userForm = await formModel.formResponse.findById(id).populate('fields');

    if (!userForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({
      message: 'Form fetched successfully',
      result: userForm
    });

  }catch(err){
      res.status(500).json({ message: 'Failed to fetch forms' });
  }
}


const getAllResponse = async(req,res)=>{
  try {
     const {id}= req.params
     console.log('fieldId:', id);

     const [allUserForms, Fields] = await Promise.all([
      formModel.formResponse.find({ fields: id }),
      formModel.formFields.findById(id)
    ]);

   


    res.status(200).json({
      message: 'All Userforms retrieved successfully',
      result: allUserForms,
      Fields:Fields
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Failed to fetch forms' });
  }
}

const deleteResponse  = async (req,res)=>{
  try {
    const { id } = req.params;
    const deletedForm = await formModel.formResponse.findByIdAndDelete(id); // Delete by ID
    if (!deletedForm) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
    
const getSubmittedForms = async (req, res) => {
  const { patientId, timepointId, formId } = req.query;
  console.log("Payload : ", req.query);
  
  try {
    const form = await formModel.formResponse.findOne({ patientId, timepointId, formId });
    if (form) {
      res.status(200).json({ result: form });
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    console.log({ message: 'Error fetching form', error });
    
    res.status(500).json({ message: 'Error fetching form', error });
  }
};

const getAllSubmittedForms = async (req, res) => {
  const patientId = req.params.patientId;

  // Validate patientId
  if (!patientId) {
    return res.status(400).json({
      success: false,
      message: 'Patient ID is required',
    });
  }

  try {
    // Query the forms collection for the given patientId
    const forms = await formModel.formResponse.find({ patientId });

    if (forms && forms.length > 0) {
      res.status(200).json({
        success: true,
        data: forms,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No forms found for the given patient ID',
      });
    }
  } catch (error) {
    console.error('Error fetching forms:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching forms',
      error: error.message,
    });
  }
};


const updateSubmittedForms = async (req, res) => {
  const { patientId, timepointId, formId, additionalFields } = req.body;
  console.log("Payload : ", req.body);

  // Process the additionalFields to ensure all fields have IDs and required is preserved
  const processedAdditionalFields = additionalFields.map(row => {
    return {
      fields: row.fields.map(field => {
        // If field doesn't have an ID (for backward compatibility)
        if (!field.id) {
          field.id = `field_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        }
        // Ensure the required property is preserved
        if (field.isrequired !== undefined) {
          field.required = field.isrequired; // Map isrequired to required
        }
        return field;
      })
    };
  });

  const existingResponse = await formModel.formResponse.findOne({ patientId, timepointId, formId });
  console.log("Existing Response : ", existingResponse);

  if (existingResponse) {
    existingResponse.additionalFields = processedAdditionalFields;
    await existingResponse.save();

    return res.status(201).json({
      message: 'Response Updated successfully!',
    });
  } else {
    res.status(404).json({ message: 'Response not found' });
  }
};



module.exports = {
  saveResponse,
  getResponse,
  createForm,
  getForm,
  getAllForms,
  updateForm,
  saveLinkToForm,
  deleteForm,
  getAllResponse,
  deleteResponse,
  getSubmittedForms,
  updateSubmittedForms,
  getAllSubmittedForms
}
