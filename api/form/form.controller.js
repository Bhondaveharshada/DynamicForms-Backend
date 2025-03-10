const formModel = require('./form.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


const handleAddFormFields = async (req, res) => {
  try {
    const formData = req.body.data;
    console.log("Form Data:", JSON.stringify(formData));

    const { formId } = req.body;
    
 
    
    const newForm = new formModel.formFields({
      title: formData.title,
      formId,
      additionalFields: formData.additionalFields
    });

    const savedForm = await newForm.save();
    res.status(201).json({
      message: 'Form saved successfully',
      result: savedForm
    });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ message: 'Failed to save form' });
  }
};


const handleGetOneFormFields = async (req, res) => {
  try {
    const { id } = req.params; 

   
    const formFields = await formModel.formFields.findById(id);

    if (!formFields) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({
      message: 'Form fetched successfully',
      result: formFields
    });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'Failed to fetch form' });
  }
};

const handleGetAllFormFields = async (req, res) => {
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


const handleUpdateFormFields = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body.data;

  
    const updatedForm = await formModel.formFields.findByIdAndUpdate(
      id, 
      {
        $set: {
          title: formData.title,
          additionalFields: formData.additionalFields
        }
      },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({
      message: 'Form updated successfully',
      result: updatedForm
    });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Failed to update form' });
  }
};


const savelinktoFormfields = async (req, res) => {
  const { id } = req.params; // Extract _id from URL
  const { formLink } = req.body; // Extract link from request body

  try {
    // Find the document and update its formLink field
    const updatedForm = await formModel.formFields.findByIdAndUpdate(
      id,
      { formLink:String(formLink) } 
      
    );

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({
      message: 'Form link updated successfully',
      result: updatedForm,
    });
  } catch (error) {
    console.error('Error updating form link:', error);
    res.status(500).json({ message: 'Failed to update form link' });
  }
}

const deleteFormFields = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from the route parameters

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
        
    
const handleAddForm = async(req,res)=>{
    try {
        const formData = req.body;
        console.log("formData response", JSON.stringify(formData));
        
    
        const newForm = new formModel.forms({
          title: formData.title,
          patientId: formData.patientId,
          timepointId: formData.timepointId,  
          formId: formData.formId,
          additionalFields: formData.additionalFields,
          fields:formData.fieldsId
        })
    
        const savedForm = await newForm.save();
        res.status(201).json({
          message: 'Form saved successfully',
          result: savedForm
        });
      } catch (error) {
        console.error('Error saving form:', error);
        res.status(500).json({ message: 'Failed to save form' });
      }

};


const handleGetUserForm = async(req,res)=>{
  try{
    const {id} = req.params

    const userForm = await formModel.forms.findById(id).populate('fields');

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


const handleGetAllUserForms = async(req,res)=>{
  try {
     const {id}= req.params
     console.log('fieldId:', id);

     const [allUserForms, Fields] = await Promise.all([
      formModel.forms.find({ fields: id }),
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

const handleDeleteUserForm  = async (req,res)=>{
  try {
    const { id } = req.params;
    const deletedForm = await formModel.forms.findByIdAndDelete(id); // Delete by ID
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
    const form = await formModel.forms.findOne({ patientId, timepointId, formId });
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
    const forms = await formModel.forms.find({ patientId });

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
  const { patientId, timepointId, formId } = req.body;
  console.log("Payload : ", req.body);

  const  existingResponse = await formModel.forms.findOne({patientId, timepointId, formId});
  console.log("Existing Response : ", existingResponse);
  
  if(existingResponse) {
    existingResponse.additionalFields = req.body.additionalFields;
    existingResponse.save();

    return res.status(201).json({
      message: 'Response Updated successfully!',
    });
  } else {
    res.status(404).json({ message: 'Response not found' });
  }
}



module.exports = {
  handleAddForm,
  handleGetUserForm,
  handleAddFormFields,
  handleGetOneFormFields,
  handleGetAllFormFields,
  handleUpdateFormFields,
  savelinktoFormfields,
  deleteFormFields,
  handleGetAllUserForms,
  handleDeleteUserForm,
  getSubmittedForms,
  updateSubmittedForms,
  getAllSubmittedForms
}
