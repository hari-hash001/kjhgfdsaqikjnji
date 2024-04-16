
import React, { useState, useEffect, useMemo} from 'react';
import DisplayPausedTime from './DisplayPausedTime';
 import './Timer.css';
 import { useSelector, useDispatch } from 'react-redux';
 import ButtonClicked, { click } from '../store/ButtonClicked'; // Import the reducer
import { store } from '../store/store';
 
const Timer = ()=> {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // const isClicked = useSelector((state) =>(state.buttonClicked.isClicked));

  const selectCounterValue = state => state.buttonClicked.isClicked;
  const currentValue = selectCounterValue(store.getState());
  
  useEffect(() => {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      const storedElapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
      setStartTime(parseInt(storedStartTime));
      setElapsedTime(storedElapsedTime);
      setIsRunning(true);
    }
  }, [isClicked]);
 
  useEffect(() => {
    let intervalId;
    if (shouldStartTimer) {
      setIsRunning(true);
      if (!startTime) {
        const now = Date.now();
        localStorage.setItem('startTime', now.toString()); // Store the current time as start time
        setStartTime(now);
      }
    } else {
      setIsRunning(false);
    }
 
    return () => clearInterval(intervalId);
  }, [shouldStartTimer]);

  useEffect(() => {
    let intervalId;
  
    if (shouldStartTimer ) { //&& startTime === 0
      const now = Date.now();
      localStorage.setItem('startTime', now.toString());
      setStartTime(now);
      setIsRunning(true);
    } else {
      setIsRunning(shouldStartTimer); // Set running state based on shouldStartTimer
    }
  
    return () => clearInterval(intervalId);
  }, [shouldStartTimer, startTime]);
   // Include startTime in the dependency array
  

  useEffect(() => {

    const storedStartTime = localStorage.getItem('startTime');

    
    const navigationEntries = window.performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      console.log("Page was reloaded");
      setIsRunning(true)
    }
  }, []);
 
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
 
    return () => clearInterval(intervalId);
  }, [isRunning]);

 
 
  // const formatTime = (timeInSeconds) => {
  //   const hours = Math.floor(timeInSeconds / 3600);
  //   const minutes = Math.floor((timeInSeconds % 3600) / 60);
  //   const seconds = Math.floor(timeInSeconds % 60);
 
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  // };
 

  const handleStartStop = () => {
    alert("sdfjknasdf")
    console.log("Inside Handle...");
    if(currentValue===1){
      alert("asdfsdf");
      console.log("EFG...");
      setIsRunning(prevIsRunning => !prevIsRunning);
      if (!isRunning) {
        console.log("ABC...");
        const now = Date.now();
        localStorage.setItem('startTime', now.toString()); // Store the current time as start time
        setStartTime(now);
       }
    }
   
  };
 
  const handleReset = () => {
    localStorage.removeItem('startTime'); // Remove the start time from localStorage
    localStorage.setItem('pausedTime', elapsedTime.toString());
    setStartTime(0);
    setElapsedTime(0);
    setIsRunning(false);
  };
 
  return (
    <div className="clockContainer">
      <div className="clock">{formatTime(elapsedTime)}</div>
      <button className="start" onClick={handleStartStop}></button>
      <button onClick={handleStartStop}></button>

      <button className="restart" onClick={handleReset}></button>

      {/* <DisplayPausedTime shouldStartTimer={shouldStartTimer} /> */}
    </div>
  );
};
 
export default React.memo(Timer);


