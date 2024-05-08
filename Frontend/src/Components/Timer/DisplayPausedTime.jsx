import './CobRunningTime.scss'
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../App';
 
const CobElapsedTime = () => {
console.log("inside Display timer");
  const [jsonData, setJsonData] = useState({
    "header": {
      "audit": {
          "T24_time": 133,
          "responseParse_time": 10,
          "requestParse_time": 12
      },
      "page_start": 1,
      "page_token": "202204194163356621.01,99",
      "total_size": 1,
      "page_size": 99,
      "status": "success"
    },
    "body": []
  });
  const contextValue = useContext(Context);
  const [elapsedTime, setElapsedTime] = useState(null);
  localStorage.setItem('cobValue', contextValue.selectedCOB);
  const cobValue = localStorage.getItem('cobValue');
 
 
  useEffect(() => {
    let intervalId;
    const fetchData = async () =>{
      try {
        const response = await fetch(`http://localhost:81/irf-miniproject-bonds/api/v1.0.0/party/tsaservice/${cobValue}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setJsonData(jsonData);
        console.log("json data: "+JSON.stringify(jsonData));
 
        const firstRecord = jsonData.body[0];
        const elapsedValue = firstRecord ? parseTimeToSeconds(firstRecord.ELAPSED) : null;
        setElapsedTime(elapsedValue);
        console.log("Elapsed time: " + elapsedValue);
       
      }catch (error) {
        console.error('Error fetching data:', error);
      }
  };
    fetchData();
    intervalId = setInterval(fetchData, 1000);
      return () => clearInterval(intervalId);
  }, [[cobValue]]);
 
  const parseTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};
 
 
  // Retrieve paused time from localStorage
  const pausedTime = localStorage.getItem('pausedTime');
  // Convert seconds into hours, minutes, and seconds
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
 
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
 
  return (
    <div className='expectedTimer'>
      <h2 className='header'>Expected Completion Time</h2>
      <div className='time '>{elapsedTime ? formatTime(parseInt(elapsedTime)) : '00 : 00 : 00'}</div>
    </div>
  );
};
 
export default CobElapsedTime;