import React, { useState, useEffect, createContext } from 'react';
import CobElapsedTime from './DisplayPausedTime.jsx';
import './CobRunningTime.scss';
export const TimerContext=createContext();
 
const CobRunningTime = () => {
  console.log("Inside Timer");
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cobFlag, setcobFlag] = useState(false);
  const [jsonData, setJsonData] = useState({
    "header": {
      "audit": {
        "T24_time": 4656,
        "responseParse_time": 8,
        "requestParse_time": 1188
      },
      "page_start": 1,
      "page_token": "202204195230244035.01,99",
      "total_size": 7,
      "page_size": 99,
      "status": "success"
    },
    "body": []
  });
  const [pausedTime, setPausedTime] = useState(null); // State to hold the paused time
 
 
 
  useEffect(() => {
 
    // const jsonData = {
    //   "header": {
    //     "audit": {
    //       "T24_time": 4656,
    //       "responseParse_time": 8,
    //       "requestParse_time": 1188
    //     },
    //     "page_start": 1,
    //     "page_token": "202204195230244035.01,99",
    //     "total_size": 7,
    //     "page_size": 99,
    //     "status": "success"
    //   },
    //   "body": [
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "200",
    //       "Complete": "0",
    //       "The max": "200",
    //       "Service": "COB-1"
    //     },
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "400",
    //       "Complete": "0",
    //       "The max": "400",
    //       "Service": "COB-2"
    //     },
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "400",
    //       "Complete": "0",
    //       "The max": "400",
    //       "Service": "COB-3"
    //     },
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "400",
    //       "Complete": "0",
    //       "The max": "400",
    //       "Service": "COB-4"
    //     },
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "400",
    //       "Complete": "0",
    //       "The max": "400",
    //       "Service": "COB-5"
    //     },
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "400",
    //       "Complete": "0",
    //       "The max": "400",
    //       "Service": "COB-6"
    //     },
    //     {
    //       "Progress": "0 0 0",
    //       "Maximum": "400",
    //       "Complete": "0",
    //       "The max": "400",
    //       "Service": "COB-7"
    //     }
    //   ]
    // };
    // setJsonData(jsonData);
 
    const fetchStartData = async () => {      
      try {
        const response = await fetch('http://localhost:81/accountViewCont/api/v1.0.0/party/cobProgress');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setJsonData(jsonData);
        const hasProgressData = jsonData.body.some(item => {
          const progressParts = item.Progress.split(' ');
          const progressValue = parseFloat(progressParts[2]);
          return progressValue > 0.0000;
        });
        console.log("hasProgressData: "+hasProgressData);
        if (hasProgressData) {
          console.log("Clock started");
          handleStart();
        } else {
          handleReset(); // Reset the timer if there's no progress data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchStartData();
    const intervalId = setInterval(fetchStartData, 1000);
    return () => clearInterval(intervalId);
  }, []);
 
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
        localStorage.setItem('elapsedTime', (elapsedTime + 1).toString()); // Update elapsed time in local storage
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);
 
  const handleStart = () => {
    console.log("INSIDE START");
    setIsRunning(prevIsRunning => !prevIsRunning);
    const now = Date.now();
    localStorage.setItem('startTime', now.toString());
    localStorage.setItem('elapsedTime', elapsedTime.toString()); // Update elapsed time
    setStartTime(now);
    setIsRunning(true);
    setcobFlag(true);
  };
 
  const handleReset = () => {
    console.log("inside reset");
    localStorage.removeItem('startTime');
    localStorage.setItem('pausedTime', elapsedTime.toString());
    setPausedTime(elapsedTime.toString()); // Update paused time
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
  };
 
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
 
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };
 
  return (
    <TimerContext.Provider value={{ cobFlag }}>
      <div className='container-fluid'>
        <div className="col-md-12 d-flex justify-content-end">
          <div className="col-md-11 clock-container">
            <h2 className='header'>Elapsed Time</h2>
            <div className='elapsedtime'><h2>{formatTime(elapsedTime)}</h2></div>
            <CobElapsedTime pausedTime={pausedTime} />
            <h2 className='header m-0'>* Transact Expected Time</h2>
          </div>
        </div>
      </div>
    </TimerContext.Provider>
  );
};


export default CobRunningTime;