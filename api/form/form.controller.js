const formModel = require('./form.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


const handleAddFormFields = async (req, res) => {
  try {
    const formData = req.body.data;
    console.log("Form Data:", formData);

    const { formId } = req.body;
    
    // Iterate over the additionalFields to check if checkboxOptions should be an empty array
    formData.additionalFields.forEach(field => {
      console.log('Field Type:', field.inputType);
      console.log('Checkbox Options:', field.checkboxOptions);
      console.log('Radio Button Options:', field.radioButtonOptions);
    
/*       if (field.inputType === 'checkbox' && !Array.isArray(field.checkboxOptions)) {
        field.checkboxOptions = [];
      } else if (field.inputType === 'radio' && !Array.isArray(field.radioButtonOptions)) {
        field.radioButtonOptions = [];
      } */
    });
    
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
    
        const newForm = new formModel.forms({
          title: formData.title,
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
    
    


module.exports = {
  handleAddForm,
  handleGetUserForm,
  handleAddFormFields,
  handleGetOneFormFields,
  handleGetAllFormFields,
  handleUpdateFormFields,
  savelinktoFormfields,
  deleteFormFields,
  handleGetAllUserForms

}
