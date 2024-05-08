import React, { useState, useEffect } from 'react';

const fetch = require('node-fetch');
const ProgressData = () => {
    const [progressData, setProgressData] = useState([]);
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("before fetch");
                const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/cobProgress');
                const jsonData = await response.json();
                console.log(JSON.stringify(jsonData));
               
                const extractedData = jsonData.body.map(item => ({
                    progress: item.Progress.split(' ')[2],
                    service: item.Service
                }));
 
                setProgressData(extractedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
 
        // Fetch data initially
        fetchData();
 
        // Fetch data every second
        const intervalId = setInterval(fetchData, 3000);
 
        // Cleanup function to clear interval
        return () => clearInterval(intervalId);
    }, []); 
 
    return (
        <div>
            <ul>
                {progressData.map((data, index) => (
                    <li key={index}>
                        <strong>Service:</strong> {data.service}, <strong>Progress:</strong> {data.progress}
                    </li>
                ))}
            </ul>
        </div>
    );
};
 
export default ProgressData;