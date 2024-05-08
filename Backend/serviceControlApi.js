const express = require('express');


const serviceControlApiRouter = express.Router();

// Route to start services
serviceControlApiRouter.post('/startCob', async (req, res) => {
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
        if (!response2.ok) {
            throw new Error('Failed to PUT COB API');
        }else{
            console.log(cobName + " Started Succesfully");
        }
  
        const cobResponseData = await response2.json();
        console.log('Response from '+cobName+ ' API:', cobResponseData);
  
  
  
  
        const runBat = await fetch('http://localhost:5000/batch/execute-bat-file');
       
        if (!runBat.ok) {
            throw new Error('Failed to execute bat file');
        }
        const batResponseText = await runBat.text();
        console.log("Response from executing bat file:", batResponseText);
  
        res.json({ success: true, message: 'cob Started' });
        
     } catch (error) {
         console.error('Error calling APIs:', error.message);
         res.status(500).json({ success: false, message: 'Failed to call APIs' });
     }
 });

module.exports = { serviceControlApiRouter };
