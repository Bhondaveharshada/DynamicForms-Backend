const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { Patient } = require('../patient/model'); 

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.FormSubmittedEmail = async (req, res) => {
    try {
        const { id, name, formName, formData, pdfAttachment } = req.body.data;

        // Fetch patient email from database using id
        const patient = await Patient.findOne({ id: parseInt(id) });
        if (!patient || !patient.email) {
            return res.status(404).json({ error: 'Patient email not found' });
        }
        const recipientEmail = patient.email;

        const senderEmail = process.env.SENDER_EMAIL || 'aniket@techonsy.com';
        
        const msg = {
            to: recipientEmail, // Using patient's email from database
            from: senderEmail,
            subject: `Form ${formName} filled for patient ID: ${id}`,
            text: `Please find attached the completed form for patient: ${name} (ID: ${id})`,
            html: `<p>Please find attached the completed form for patient: <strong>${name}</strong> (ID: ${id})</p>`
        };

        // Add PDF attachment if available
        if (pdfAttachment && pdfAttachment.content) {
            // Extract the base64 data part (remove metadata prefix if present)
            let base64Content = pdfAttachment.content;
            if (base64Content.includes('base64,')) {
                base64Content = base64Content.split('base64,')[1];
            }
            
            msg.attachments = [
                {
                    content: base64Content,
                    filename: pdfAttachment.filename || 'form.pdf',
                    type: 'application/pdf',
                    disposition: 'attachment'
                }
            ];
        } else {
            return res.status(400).json({ error: 'PDF attachment is required' });
        }

        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("SendGrid Error:", error.response ? error.response.body : error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};