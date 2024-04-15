// import React, { useState, useEffect } from "react";
// import './Timer.css';
// import DisplayPausedTime from "./DisplayPausedTime";
 
// const Timer = () => {
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
 
//   // Load paused time from localStorage on component mount
//   useEffect(() => {
//     const pausedTime = localStorage.getItem('pausedTime');
//     if (pausedTime) {
//       setTime(parseInt(pausedTime));
//     }
//   }, []);
 
//   useEffect(() => {
//     let intervalId;
 
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(intervalId);
//     }
 
//     return () => clearInterval(intervalId);
//   }, [isRunning]);
 
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
 
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };
 
//   const handleStartStop = () => {
//     setIsRunning(prevIsRunning => !prevIsRunning);
//   };
 
//   const handleReset = () => {
//     // Store paused time in localStorage
//     localStorage.setItem('pausedTime', time.toString());
//     setTime(0);
//     setIsRunning(false);
//   };
 
//   return (
//     <div className="container"> {/* Apply container class */}
//     <div className="clockContainer"> {/* Apply clockContainer class */}
//       <div className="clock">{formatTime(time)}</div> {/* Apply clock class */}
//       <button className="restart" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button> {/* Apply restart class */}
//       <button className="stop" onClick={handleReset}>Reset</button> {/* Apply stop class */}
//     </div>
//   </div>
//   );
// };
 
// export default Timer;
 


// // import React, { useState, useEffect, useContext} from 'react';
// // import DisplayPausedTime from './DisplayPausedTime';
// // import { Context } from "../../App";

// // let counter=0;
// // let isRunning1='Stop'
 
// // const Timer = () => {
  
// //   const value=useContext(Context);
// //   console.log("From TimerComp: "+value.timerFlag);
 
// //   const [startTime, setStartTime] = useState(0);
// //   const [elapsedTime, setElapsedTime] = useState(0);
// //   const [isRunning, setIsRunning] = useState(false);
 
// //   // Load start time from localStorage on component mount
// //   useEffect(() => {
// //     const storedStartTime = localStorage.getItem('startTime');
// //     if (storedStartTime) {
// //       const storedElapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
// //       setStartTime(parseInt(storedStartTime));
// //       setElapsedTime(storedElapsedTime);
// //       setIsRunning(false); // Start the timer if it was running before
// //     }
// //   }, []);
 
// //   useEffect(() => {
// //     let intervalId;
 
// //     if (isRunning) {
// //       intervalId = setInterval(() => {
// //         setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
// //       }, 1000);
// //     } else {
// //       clearInterval(intervalId);
// //     }
 
// //     return () => clearInterval(intervalId);
// //   }, [isRunning]);
 
// //   const formatTime = (timeInSeconds) => {
// //     const hours = Math.floor(timeInSeconds / 3600);
// //     const minutes = Math.floor((timeInSeconds % 3600) / 60);
// //     const seconds = Math.floor(timeInSeconds % 60);
 
// //     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// //   };
 
// //   const handleStartStop = () => {
// //     console.log("calling handleStartStop....");
// //     setIsRunning(prevIsRunning => !prevIsRunning);
// //     if (!isRunning ) {
// //       console.log("118: "+isRunning);
// //       const now = Date.now();
// //       localStorage.setItem('startTime', now.toString()); // Store the current time as start time
// //       setStartTime(now);
// //     }
// //   };
 
  
// //   if(value.timerFlag===1 && counter<=0){
// //     counter++;
// //     setIsRunning(true);
// //     handleStartStop();
// //   }
// //   const handleReset = () => {
// //     localStorage.removeItem('startTime'); // Remove the start time from localStorage
// //     localStorage.setItem('pausedTime', elapsedTime.toString());
// //     setStartTime(0);
// //     setElapsedTime(0);
// //     setIsRunning(false);
// //   };
 
// //   return (
// //     <div className='timerContainer'>
// //       {/* <h2>Timer</h2> */}
// //       <div className='first'>{formatTime(elapsedTime)}
// //       {/* <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button> */}
// //       {/* <button onClick={() => { func2();}}>{isRunning ? 'Stop' : 'Start'}</button> */}

// //       <button onClick={handleReset}>Reset</button>
// //       </div>
// //       <div className='second'>
// //       <h6 className='cobruntimeheader'>Expected Completion Time</h6>
// //       <DisplayPausedTime />

// //       </div>
// //     </div>
// //   );
// // };
 

// // export default Timer;



import React, { useState, useEffect } from 'react';
import DisplayPausedTime from './DisplayPausedTime';
 import './Timer.css';
 import { useSelector, useDispatch } from 'react-redux';
 import ButtonClicked, { click } from '../store/ButtonClicked'; // Import the reducer
import { store } from '../store/store';
 
const Timer = ({ shouldStartTimer }) => {
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const isClicked = useSelector((state) =>(state.buttonClicked.isClicked));

  const selectCounterValue = state => state.buttonClicked.isClicked;
  const currentValue = selectCounterValue(store.getState());
  // console.log("currentValue: "+currentValue);

  // const isClicked1 = useSelector((state) => );

  // useEffect(() => {
  //   // console.log("isClicked from Timer state:", isClicked);
  // }, [isClicked]);
  // Load start time from localStorage on component mount
  useEffect(() => {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      const storedElapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
      setStartTime(parseInt(storedStartTime));
      setElapsedTime(storedElapsedTime);
      setIsRunning(true); // Start the timer if it was running before
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
 
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
 
    return () => clearInterval(intervalId);
  }, [isRunning]);
 
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
 
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
 

  const handleStartStop = () => {
    alert("sdfjknasdf")
    console.log("Inside Handle...");
    if(currentValue===1){
      alert("asdfsdf");
      console.log("EFG...");
      // setIsRunning(prevIsRunning => !prevIsRunning);
      // if (!isRunning) {
        console.log("ABC...");
        const now = Date.now();
        localStorage.setItem('startTime', now.toString()); // Store the current time as start time
        setStartTime(now);
      // }
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
      {/* <button className="start" onClick={handleStartStop}>start</button> */}
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>

      <button className="restart" onClick={handleReset}>Reset</button>

      {/* <DisplayPausedTime shouldStartTimer={shouldStartTimer} /> */}
    </div>
  );
};
 
export default Timer;