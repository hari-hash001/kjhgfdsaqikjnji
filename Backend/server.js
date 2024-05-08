// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { mailApiRouter } = require('./mailApi');
const { batchApiRouter } = require('./cobBat');
const { serviceControlApiRouter } = require('./serviceControlApi');
const { emailManagementApiRouter } = require('./emailManagementApi');
const { schedule } = require('./schedule');


const app = express();
app.use(cors());


app.use(bodyParser.json());


app.use('/api', mailApiRouter);
app.use('/batch', batchApiRouter);
app.use('/service', serviceControlApiRouter);
app.use('/email', emailManagementApiRouter);
app.use('/cob', schedule);
let smtpDetails = {};

app.get('/api/smtp', (req, res) => {
    // Read SMTP details from file
    fs.readFile('smtpDetails.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading SMTP details file:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      
      // Parse JSON data
      const smtpDetails = JSON.parse(data);
      res.json(smtpDetails);
    });
  });
  
app.post('/api/smtp', (req, res) => {
  smtpDetails = req.body;
  saveSMTPDetailsToFile(smtpDetails); // Save SMTP details to file
  res.json({ message: 'SMTP details stored successfully' });
});

// Function to save SMTP details to a JSON file
const saveSMTPDetailsToFile = (details) => {
  const filePath = 'smtpDetails.json';
  fs.writeFile(filePath, JSON.stringify(details), (err) => {
    if (err) {
      console.error('Error saving SMTP details to file:', err);
    } else {
      console.log('SMTP details saved to file');
    }
  });
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});