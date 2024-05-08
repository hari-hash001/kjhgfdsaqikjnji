const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');

const batchApiRouter = express.Router();

const batFilePath = 'C:/R22_ALL/R22AMR_cob.bat';
const commandToExecute = 'tRun START.TSM';

// Route to execute the .bat file
batchApiRouter.get('/execute-bat-file', (req, res) => {
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

module.exports = { batchApiRouter };
