const sgMail = require('@sendgrid/mail');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set API Key from .env

exports.FormSubmittedEmail = async (req, res) => {
    try {
        const { id, name, formName, formData } = req.body.data; // Extract form data

        // Format formData dynamically
        let formattedFormData = formData.map(field => {
            return `<strong>${field.label}:</strong> ${field.value} <br>`;
        }).join("\n");

        const msg = {
            to: 'aniket@techonsy.com', // Replace with recipient's email
            from: 'aniket@techonsy.com', // Replace with your verified SendGrid sender
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

