// // import React, { useState, useEffect } from 'react';
// // import { BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts';
// // import CobRunningBatch from '../CobStage_RunningBatch/cobRunningBatch';
// // import ProgressData from './cobApiFetch.jsx'; // Import the ProgressData component
// // import './cobProgressChart.css';

// // const timerStartFlag=false;
// // export{timerStartFlag};
 
// // const CobProgressChart = () => {
// //   const [progressData, setProgressData] = useState(Array(7).fill({ progress: 0 })); // Initialize with empty data
 
// //   // Function to handle updating progress data
// //   const updateProgressData = (newData) => {
// //     setProgressData(newData);
// //   };
 
// //   // Merge progressData with static data
// //   const mergedData = progressData.map((item, index) => ({
// //     name: `COB-${index}`, // Assuming COB-0, COB-1, COB-2, ... as names
// //     value: parseFloat(item.progress) // Parse progress as float value
// //   }));
// //   console.log("Line 23: "+progressData.map(item => item.progress)); // Logging service property of each item
// //   // console.table(mergedData);
   
// //   // Custom ticks for the Y-axis
// //   const yAxisTicks = [0, 20, 40, 60, 80, 100];

  
// //   return (
// //     <div className='parentDiv'>
// //       <div className="cobProgressChart">
// //         <div className='header'>Cob Progress Chart</div>
 
// //         <BarChart className='barchart'
// //           width={650}
// //           height={300}
// //           data={mergedData} // Use mergedData instead of static data
// //           margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
// //           barSize={20}
         
// //         >
// //           <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
// //           <YAxis ticks={yAxisTicks} />
// //           <Tooltip formatter={(value) => `${value}%`} /> Format tooltip to display percentage
// //           <Legend />
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <Bar fill="#FFFFFF" background={{ fill: "#eee" }} />
// //         </BarChart>
// //       </div>
// //       <div className='cobRunningBatch'>
// //         <CobRunningBatch/>
// //       </div>
// //       <ProgressData updateData={updateProgressData} /> {/* Render the ProgressData component and pass the update function */}
// //     </div>  
// //   );
// // };
 
// // export default CobProgressChart;




// import React, { useState, useEffect } from 'react';
// import { BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts';
// import CobRunningBatch from '../CobStage_RunningBatch/cobRunningBatch';
// // import CobSelect from './cobSelect.jsx';
// import './cobProgressChart.css';
 
// const CobProgressChart = () => {
//   const [progressData, setProgressData] = useState([]);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/cobProgress');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const jsonData = await response.json();
//         console.log(jsonData); // Check if JSON data is received correctly
//         const extractedData = jsonData.body.map(item => ({
//           name: item.Service, // Use service data directly as names
//           value: parseFloat(item.Progress.split(' ')[2]) // Parse progress as float value
//         }));
//         setProgressData(extractedData);
//         console.log('Progress Data:', extractedData); // Log progressData array
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
 
//     fetchData();
//   }, []);
 
//   const calculateYAxisTicks = () => {
//     const maxProgress = Math.max(...progressData.map(item => item.progress));
//     const tickInterval = Math.ceil(maxProgress / 5);
//     const yAxisTicks = [];
//     for (let i = 0; i <= maxProgress; i += tickInterval) {
//       yAxisTicks.push(i);
//     }
//     return yAxisTicks;
//   };
 
//   // Custom ticks for the Y-axis
//   const yAxisTicks = calculateYAxisTicks();
 
//   return (
//     <div className='parentDiv'>
//       <div className="cobProgressChart">
//         <div className='header'>Cob Progress Chart</div>
 
//         <BarChart
//           width={500}
//           height={300}
//           data={progressData}
//           margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
//           barSize={20}
//         >
//           <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
//           <YAxis ticks={yAxisTicks} />
//           <Tooltip formatter={(value) => `${value}%`} />
//           <Legend />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
//         </BarChart>
//       </div>
//       <CobRunningBatch/>
//     </div>  
//   );
// };
 
// export default CobProgressChart;



import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts';
import CobRunningBatch from '../CobStage_RunningBatch/cobRunningBatch';
import './cobProgressChart.css';
 
const CobProgressChart = () => {
  const [progressData, setProgressData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/cobProgress');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        // console.log("JSON DATA: "+JSON.stringify(jsonData)); // Check if JSON data is received correctly
 
        // const extractedData = jsonData.body.map(item => ({
        //   name: item.Service, // Use service data directly as names
        //   value: parseFloat(item.Progress.split(' ')[2]) // Parse progress as float value
        // }));
 
        const extractedData = jsonData.body
          .filter(item => item.Progress !== "0 0 0" && item.Progress !== "") // Filter out empty or "0 0 0" progress
          .map(item => ({
            name: item.Service,
            value: parseFloat(item.Progress.split(' ')[2])
          }));
          // console.log("graph: "+extractedData.value);
 
        setProgressData(extractedData);
        // console.log('Progress Data:', extractedData); // Log progressData array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
 
    const intervalId = setInterval(fetchData, 10000);
 
    return () => clearInterval(intervalId);
 
  }, []);
 
  const calculateYAxisTicks = () => {
    const maxProgress = Math.max(...progressData.map(item => item.progress));
    const tickInterval = Math.ceil(maxProgress / 5);
    const yAxisTicks = [];
    for (let i = 0; i <= maxProgress; i += tickInterval) {
      yAxisTicks.push(i);
    }
    return yAxisTicks;
  };
 
  // Custom ticks for the Y-axis
  const yAxisTicks = [0, 20, 40, 60, 80, 100];
  // const yAxisTicks = calculateYAxisTicks();
 
  return (
    <div className='parentDiv'>
      <div className="cobProgressChart">
        <div className='header2'>Cob Progress Chart</div>
 
        <BarChart className='chart'
          width={500}
          height={300}
          data={progressData}
          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis ticks={yAxisTicks} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar fill="#ffffff" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
      <CobRunningBatch/>
    </div>  
  );
};
 
export default CobProgressChart;
 