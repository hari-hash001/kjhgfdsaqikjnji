
// // import React from 'react';
 
// // const DisplayPausedTime = () => {
// //   // Retrieve paused time from localStorage
// //   const pausedTime = localStorage.getItem('pausedTime');
 
// //   // Convert seconds into hours, minutes, and seconds
// //   const formatTime = (timeInSeconds) => {
// //     const hours = Math.floor(timeInSeconds / 3600);
// //     const minutes = Math.floor((timeInSeconds % 3600) / 60);
// //     const seconds = timeInSeconds % 60;
 
// //     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// //   };
 
// //   return (
// //     <div className='expectedTimer'>
// //       <h2>Paused Time</h2>
// //       <div>{pausedTime ? `Paused Time: ${formatTime(parseInt(pausedTime))}` : 'No paused time recorded'}</div>
// //     </div>
// //   );
// // };
 
// // export default DisplayPausedTime;
 
 


// import React from 'react';
//  import './Timer.css'
// const DisplayPausedTime = () => {
//   // Retrieve paused time from localStorage
//   const pausedTime = localStorage.getItem('pausedTime');
 
//   // Convert seconds into hours, minutes, and seconds
//   const formatTime = (timeInSeconds) => {
//     const hours = Math.floor(timeInSeconds / 3600);
//     const minutes = Math.floor((timeInSeconds % 3600) / 60);
//     const seconds = timeInSeconds % 60;
 
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };
 
//   return (
//     <div>
//       <div>{pausedTime ? `Paused Time: ${formatTime(parseInt(pausedTime))}` : 'No paused time recorded'}</div>
//     </div>
//   );
// };
 
// export default DisplayPausedTime; 



import React, { useEffect } from 'react';
import './Timer.css';

 
const DisplayPausedTime = () => {


  const pausedTime = localStorage.getItem('PrevTimerValue');

 
  // Convert seconds into hours, minutes, and seconds
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
 
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
 
  return (
    <div className='clockContainer'> {/* Apply the same CSS class */}
    {/* <div className="clock">{pausedTime ? `Paused Time: ${formatTime(parseInt(pausedTime))}` : 'No paused time recorded'}</div> */}
    <div className="clock">{pausedTime ? `${formatTime(parseInt(pausedTime))}` : 'No paused time recorded'}</div>

  </div>
  );
};
 
export default DisplayPausedTime;
 