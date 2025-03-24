const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { Patient } = require('../patient/model'); // Import your Patient model

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.FormSubmittedEmail = async (req, res) => {
    try {
        const { id, name, formName, formData, email } = req.body.data; // Add email to destructuring

        // If email is not provided in the payload, fetch it from database
        let recipientEmail = email;
        if (!recipientEmail) {
            const patient = await Patient.findOne({ id: parseInt(id) });
            if (!patient || !patient.email) {
                return res.status(404).json({ error: 'Patient email not found' });
            }
            recipientEmail = patient.email;
        }

        // Format formData dynamically
        let formattedFormData = formData.map(field => {
            return `<strong>${field.label}:</strong> ${field.value} <br>`;
        }).join("\n");

        const senderEmail = process.env.SENDER_EMAIL || 'aniket@techonsy.com';
        
        const msg = {
            to: recipientEmail, // Now using the patient's email
            from: senderEmail, // Using environment variable for sender email
            subject: `Form ${formName} filled for patient ID: ${id}`,
            text: `Patient Name: ${name}\n\n${formData.map(field => `${field.label}: ${field.value}`).join("\n")}`,
            html: `<strong>Patient Name:</strong> ${name} <br><br>${formattedFormData}`
        };

        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("SendGrid Error:", error.response ? error.response.body : error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};