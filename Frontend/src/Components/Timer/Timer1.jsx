
import React, { useState, useEffect, useMemo} from 'react';
 import './Timer.css';
import DisplayPausedTime from './DisplayPausedTime';

 
const Timer = ()=> {
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [started,setStarted]=useState(localStorage.getItem("start"));
  

 


  useEffect(()=>{

    console.log(started)
    if(started){
      setIsRunning(true)
   }
   else{
    setIsRunning(false)
   }
  },[started])

  

  useEffect(() => {

    let intervalId;
    if (isRunning) {
       intervalId = setInterval(() => {
        setStartTime(startTime => startTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
 
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const resetData=()=>{
    localStorage.setItem("PrevTimerValue",startTime);
    localStorage.setItem("start","");
    setStarted("");
    setStartTime(0);
    setIsRunning(false);
  }
  
 
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
 
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
 

  // const handleStartStop = () => {
  //   alert("sdfjknasdf")
  //   console.log("Inside Handle...");
  //   if(currentValue===1){
  //     alert("asdfsdf");
  //     console.log("EFG...");
  //     setIsRunning(prevIsRunning => !prevIsRunning);
  //     if (!isRunning) {
  //       console.log("ABC...");
  //       const now = Date.now();
  //       localStorage.setItem('startTime', now.toString()); // Store the current time as start time
  //       setStartTime(now);
  //      }
  //   }
   
  // };
 
  // const handleReset = () => {
  //   localStorage.removeItem('startTime'); // Remove the start time from localStorage
  //   localStorage.setItem('pausedTime', elapsedTime.toString());
  //   setStartTime(0);
  //   setElapsedTime(0);
  //   setIsRunning(false);
  // };
 
  return (
    <div className="clockContainer">
      <div className="clock">{formatTime(startTime)}</div>
   
    
      <button className="restart" onClick={resetData}></button>

      
      <DisplayPausedTime  />
    </div>
  );
};
 
export default Timer;


