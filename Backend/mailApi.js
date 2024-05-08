const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
 
const mailApiRouter = express.Router();
let emails = [];
 
// Read email addresses from file and store them in the 'emails' array
fs.readFile('emails.txt', 'utf8', (err, data) => {
    if (!err) {
        emails = data.split('\n').map(email => email.trim()).filter(email => email !== '');
        console.log(`Emails read successfully: ${emails}`);
    } else {
        console.log(`Error reading emails from file: ${err}`);
    }
});
 
mailApiRouter.post('/sendmail', async (req, res) => {
    let emailContent=null;
    let modifiedEmailContent = null;
    try {
        const { status } = req.body; // Extract 'status' from the request body
        if(status == "ERROR"){
            emailContent = fs.readFileSync('Ebeoderror.html', 'utf8');
            modifiedEmailContent = emailContent
        }else{
            emailContent = fs.readFileSync('email_template.html', 'utf8');
            modifiedEmailContent = emailContent.replace('{{status}}', status);
        }
   
        console.log(`Emails to be sent to: ${emails}`);
 
        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "mail.aspiresystems.com",
            port: 587,
            secure: false, // TLS Encryption
            auth: {
                user: "subbiah.sugumar",
                pass: "38Ada-R)%m?-z!@{"
            }
        });
 
        // Iterate over each recipient and send email
        for (let email of emails) {
            // Mail options for the current recipient
            const mailOptions = {
                from: "no-reply@aspiresys.com",
                to: email,
                subject: "COB STATUS",
                html: modifiedEmailContent // Use the modified email content
            };
 
            // Send email
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email}`, info);
        }
 
        res.status(200).json({ message: "Mail sent successfully to all recipients!" });
 
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Server error" });
    }
});
 
module.exports = { mailApiRouter };