// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors'); 

// Initialize Express app
const app = express();
app.use(cors());
// Middleware to parse JSON request body
app.use(bodyParser.json());

// Route to handle forgot password request
app.post('/api/sendmail', async (req, res) => {
    try {
        const { Email } = req.body;

        // Read email content from file
        const emailContent = fs.readFileSync('email_template.html', 'utf8');

        // Mail options
        const mailOptions = {
            from: "subbiahsura@gmail.com",
            to: Email,
            subject: "COB STATUS",
            html: emailContent // Your HTML email template here
        };

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: "subbiahsura@gmail.com",
                pass: "molo lvpw izoe ouji"
            }
        });

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email error", error);
                res.status(500).json({ error: "Failed to send mail" });
            } else {
                console.log("Email sent", info);
                res.status(200).json({ message: "Mail sent successfully!!" });
            }
        });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Server error" });
    }
});

const batFilePath = 'C:/R22_ALL/R22AMR_cob.bat';
const commandToExecute = 'tRun START.TSM';

// Read the existing contents of the batch file
fs.readFile(batFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading batch file: ${err}`);
        return;
    }

    // Append the command to execute after setting up the paths
    const modifiedContent = data + `\necho Running ${commandToExecute}\n${commandToExecute}\n`;

    // Write the modified content back to the batch file
    fs.writeFile(batFilePath, modifiedContent, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to batch file: ${err}`);
            return;
        }
        console.log('Batch file updated successfully');
    });
});

app.get('/execute-bat-file', (req, res) => {
    // Execute the .bat file
    exec(`cmd /c "${batFilePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.send('Command executed successfully');
    });
});

app.post('/startCob', async (req, res) => {

   const  servicename  = "TSM";
   console.log("Servicename"+servicename);
   
    try {
        const getservicepayload = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/tsaservice/'+servicename+'/get');
        const serviceData = await getservicepayload.json();
        console.log('Service Data:', serviceData);
        const tsmPayload = {
            body: {
                DESCRIPTION: serviceData.body.DESCRIPTION,
                USER:serviceData.body.USER,
                workProfile: serviceData.body.workProfile,
                serviceControl: "START"
            }
        };
        console.log("After applying the Payload DESCRIPTION"+tsmPayload.body.DESCRIPTION);
        const response1 = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/tsaservice/'+servicename, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tsmPayload)
        });
        if (!response1.ok) {
            throw new Error('Failed to call TSM API '+ response1.status);
        }

        const tsmResponseData = await response1.json();
        console.log('Response from TSM API:', tsmResponseData);

        

      
        const { body } = req.body; 
        const { cobName } = body;
        console.log("Cobname", cobName); 
        console.log("Cobname"+cobName)
        const getcob = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/tsaservice/'+cobName+'/get');
        const CobData = await getcob.json();
        console.log('COB Data:', CobData);

        const payload = {
            body: {
                DESCRIPTION: CobData.body.DESCRIPTION,
                USER:CobData.body.USER,
                workProfile: CobData.body.workProfile,
                serviceControl: "START"
            }
        };
        const response2 = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/tsaservice/'+cobName, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the response is successful
        if (!response2.ok) {
            throw new Error('Failed to PUT COB API');
        }else{
            console.log(cobName + " Started Succesfully");
        }

        const cobResponseData = await response2.json();
        console.log('Response from '+cobName+ ' API:', cobResponseData);

        const runBat = await fetch('http://localhost:5000/execute-bat-file');
        const Bat = await runBat.json();
        if(!runBat.ok){
            console.log("Problem in BAT File Calling "+Bat)
        }else{
            console.log("Bat file called");
        }

        res.json({ success: true, message: 'cob Started' });
        
    } catch (error) {
        console.error('Error calling APIs:', error.message);
        res.status(500).json({ success: false, message: 'Failed to call APIs' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

