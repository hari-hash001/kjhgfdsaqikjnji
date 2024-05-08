const express = require('express');
const fs = require('fs');

const emailManagementApiRouter = express.Router();

let emails = [];

fs.readFile('emails.txt', 'utf8', (err, data) => {
    if (!err) {
        emails = data.split('\n').filter(email => email.trim() !== '');
    }
});

// Route to get all emails
emailManagementApiRouter.get('/emails', (req, res) => {
    res.json(emails);
});

// Route to add a new email
emailManagementApiRouter.post('/emails', (req, res) => {
    const { email } = req.body;
    if (!email || !validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    emails.push(email);

    fs.appendFile('emails.txt', `${email}\n`, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving email to file');
        } else {
            console.log('Email saved to emails.txt');
            res.status(200).send('Email saved successfully');
        }
    });
});

// Route to update an existing email
emailManagementApiRouter.put('/emails/:index', (req, res) => {
    const { index } = req.params;
    const { email } = req.body;
    if (!email || !validateEmail(email)) {
        return res.status(400).send('Invalid email format');
    }

    if (index < 0 || index >= emails.length) {
        return res.status(404).send('Email not found');
    }

    emails[index] = email;

    fs.writeFile('emails.txt', emails.join('\n'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating email in file');
        } else {
            console.log('Email updated in emails.txt');
            res.status(200).send('Email updated successfully');
        }
    });
});

// Route to delete an email
emailManagementApiRouter.delete('/emails/:index', (req, res) => {
    const { index } = req.params;
    if (index < 0 || index >= emails.length) {
        return res.status(404).send('Email not found');
    }

    emails.splice(index, 1);

    fs.writeFile('emails.txt', emails.join('\n'), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting email from file');
        } else {
            console.log('Email deleted from emails.txt');
            res.status(200).send('Email deleted successfully');
        }
    });
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

module.exports = { emailManagementApiRouter };
