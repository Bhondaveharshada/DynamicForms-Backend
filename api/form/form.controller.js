const formModel = require('./form.model')
const bcrypt = require('bcrypt')


const handleAddFormFields = async(req,res)=>{

        try {
            const formData = req.body.data;
            const {formId} = req.body ;
            
            // Create a new form document with the provided data
            const newForm = new formModel.formFields({
              title: formData.title,
              formId,
              additionalFields: formData.additionalFields
            });
            // Save the form data to MongoDB
            const savedForm = await newForm.save();
            res.status(201).json({
              message: 'Form saved successfully',
              result: savedForm
            });
          } catch (error) {
            console.error('Error saving form:', error);
            res.status(500).json({ message: 'Failed to save form' });
          }
        
}
        
    
const handleAddForm = async(req,res)=>{
    try {
        const formData = req.body;
    
        // Create a new form document with the provided data
        const newForm = new formModel.forms({
          title: formData.title,
          additionalFields: formData.additionalFields
          
        })
    
        // Save the form data to MongoDB
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



    const handleGetForm = async (req, res) => {
        const { id } = req.body; // Extract formId from request body
    
        try {
            // Fetch the form data based on formId
            const form = await formModel.forms.findOne(id).populate('fields');
    
            if (!form) {
                return res.status(404).json({
                    message: "Form not found",
                });
            }
    
            // Respond with the fetched form data
            res.status(200).json({
                message: "Form fetched successfully",
                form,
            });
        } catch (err) {
            // Handle any errors
            res.status(500).json({
                error: err.message,
            });
        }
    };

    const handleGetFormFields = async (req, res) => {
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
    
    


module.exports = {
  handleAddForm,
  handleGetForm,
  handleAddFormFields,
  handleGetFormFields
}
