const express = require('express');
const schedule = express.Router();

schedule.post('/shedule',async(req,res)=>{
    try {
        const { body } = req.body; 
        const {date , time, cobname }= body;
        const getcob = await fetch('http://127.0.0.1:81/irf-web-war/api/v1.0.0/party/tsaservice/'+cobname+'/get');
        console.log(`cobname : ${cobname}`)
        const CobData = await getcob.json();
        console.log('COB Data:', CobData);
        const frequencydata = formatDate(date)+" "+time+" 1B";
        console.log(`frequencydata : ${frequencydata}`);
        const payload = {
            body: {
                DESCRIPTION: CobData.body.DESCRIPTION,
                USER:CobData.body.USER,
                workProfile: CobData.body.workProfile,
                serviceControl: "STOP",
                FREQUENCY:frequencydata
            }
        };
        console.log('PAYLOAD : ', payload);
        const response2 = await fetch('http://127.0.0.1:81/irf-web-war/api/v1.0.0/party/tsaservice/'+cobname, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the response is successful
        if (!response2.ok) {
            throw new Error(`Failed to PUT COB API${response2.message}`);
        }else{
            console.log(cobname + " Sheduled Succesfully");
        }
        res.status(200).json({ success: true, message: 'Cob Sheduled' });
    } catch (error) {
        console.error('Error calling APIs:', error.message);
        res.status(500).json({ success: false, message: 'not Sheduled' });
    }
})
const formatDate = (inputDate) => {
    // Create a Date object from the input string
    const dateObj = new Date(inputDate);
  
    // Extract day, month, and year from the date object
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
  
    // Return the formatted date string in the desired format
    return `${day}/${month}/${year}`;
  };

module.exports = { schedule };