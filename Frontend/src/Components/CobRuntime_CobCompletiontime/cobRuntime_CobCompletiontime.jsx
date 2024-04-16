// import './cobRuntime_CobCompletiontime.css';
// import DataTable from "react-data-table-component";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ProgressBar from "@ramonak/react-progress-bar";
// // import Stopwatch from "../stopWatch/stopWatch";
// import React, { useState, useEffect } from 'react';
// // import CobClock from '../cobClock/cobClock';
// import Expectedtimer from '../expectedTimer/expectedTimer';
// import CobRunningBatch from '../CobStage_RunningBatch/cobRunningBatch';
// import Clocktest from '../cobClockTest/clockTest';
// // import { startTimerFlag } from '../cobClockTest/clockTest';

// const fetch = require("node-fetch");




// const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/batchStage?page_size=1577');
// const data1 = await response.json();
// // console.log(data1.body);
 
// // const response2 = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/runningbatch');
// // const data2 = await response2.json();
 


// const response1 = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/runningbatch');
// const result1 = await response1.json();
// console.log(result1.body[0]['ID']);

// // let cobName=result1.body[0]['ID'];
// // let cobName = result1.body[0]['ID']; // Assuming cobName = 'BNK/BLOOM'
// // let cobNameParts = cobName.split('/'); // Splitting the string by '/'
// // let cobShortName = cobNameParts[0];
// // console.log(cobShortName);


 
 
 
 
 
 
 
// let applicationJobProcessedCount = 0;
// let systemWideJobProcessedCount = 0;
// let reportingJobProcessedCount = 0;
// let startOfDayJobProcessedCount = 0;
// let onlineJobProcessedCount = 0;
 
// function Table() {
//   let applicationTotal = 0;
//   let systemWideTotal = 0;
//   let reportingTotal = 0;
//   let startOfDayTotal = 0;
//   let onlineTotal = 0;
 

//     const [data, setData] = useState([]);
 
//     useEffect(() => {
//       const fetchData = async () => {
//         console.log("Inside fetchData");
//           // console.log(CobRunningBatch);
//         try {
       
//           // const response = await fetch(`http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/batch/stage/${cobShortName}?page_size=1000`);
//           const response = await fetch("http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/batch/stage/US1?page_size=1000");

//           const newData = await response.json();
//           // console.log("Line77: "+newData.body);
//           setData(newData.body);
//           console.log("newData: "+JSON.stringify(newData.body));
//           console.log(newData.body[0]['JOB.STATUS']);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
 
//       const interval = setInterval(fetchData, 5000);
 
//       return () => clearInterval(interval);
//     }, []);
 
//     const calculateRows = () => {
//       if (!data || !data.length) return [];
 
//       // let applicationTotal = 0;
//       // let systemWideTotal = 0;
//       // let reportingTotal = 0;
//       // let startOfDayTotal = 0;
//       // let onlineTotal = 0;
 
//       // let applicationJobProcessedCount = 0;
//       // let systemWideJobProcessedCount = 0;
//       // let reportingJobProcessedCount = 0;
//       // let startOfDayJobProcessedCount = 0;
//       // let onlineJobProcessedCount = 0;
 
//       data.forEach(item => {
 
//         let batchStage = item['BATCH STAGE'];
//         let jobStage = item['JOB.STATUS'];
//         // let idexc=item['IDEXC'];
 
//         //CONDITION SHOULD BE MODIFIED ACCORDING TO THE COB WE RUN(idexc)
//         if (typeof batchStage === 'string' && typeof jobStage === 'string') {
//           if (batchStage.charAt(0) === 'A') {
//             applicationTotal++;
//             if (jobStage === '2') {
//               applicationJobProcessedCount++;
//             }
//           } else if (batchStage.charAt(0) === 'S') {
//             systemWideTotal++;
//             if (jobStage === '2') {
//               systemWideJobProcessedCount++;
//             }
//           } else if (batchStage.charAt(0) === 'R') {
//             reportingTotal++;
//             if (jobStage === '2') {
//               reportingJobProcessedCount++;
//             }
//           } else if (batchStage.charAt(0) === 'D') {
//             startOfDayTotal++;
//             if (jobStage === '2') {
//               startOfDayJobProcessedCount++;
//             }
//           } else if (batchStage.charAt(0) === 'O') {
//             onlineTotal++;
//             if (jobStage === '2') {
//               onlineJobProcessedCount++;
//             }
//           }
//           // console.log("applicationjobProcessedCount: "+applicationJobProcessedCount+" systemWideJobProcessedCount: "+systemWideJobProcessedCount+" reportingJobProcessedCount: "+reportingJobProcessedCount+" startOfDayJobProcessedCount: "+startOfDayJobProcessedCount+" onlineJobProcessedCount: "+onlineJobProcessedCount);
//           // console.log("applicationjobProcessedCount: "+applicationJobProcessedCount+" "+systemWideJobProcessedCount+" "+reportingJobProcessedCount+" "+startOfDayJobProcessedCount+" "+onlineJobProcessedCount);
//           // console.log(applicationTotal+" "+systemWideTotal+" "+reportingTotal+" "+startOfDayTotal+" "+onlineTotal);
//         }
//       });
//       console.log("applicationjobProcessedCount: "+applicationJobProcessedCount+" systemWideJobProcessedCount: "+systemWideJobProcessedCount+" reportingJobProcessedCount: "+reportingJobProcessedCount+" startOfDayJobProcessedCount: "+startOfDayJobProcessedCount+" onlineJobProcessedCount: "+onlineJobProcessedCount);
//           // console.log(applicationTotal+" "+systemWideTotal+" "+reportingTotal+" "+startOfDayTotal+" "+onlineTotal);
       

//       return [
//         {
//           stage: 'Application',
//           progressBar: applicationJobProcessedCount>0?(applicationJobProcessedCount / applicationTotal) * 100 :0,
//           processed: applicationJobProcessedCount,
//           total: applicationTotal,
//         },
//         {
//           stage: 'System Wide',
//           progressBar: systemWideJobProcessedCount>0?(systemWideJobProcessedCount / systemWideTotal) * 100:0,
//           processed: systemWideJobProcessedCount,
//           total: systemWideTotal,
//         },
//         {
//           stage: 'Reporting',
//           progressBar: reportingJobProcessedCount>0?(reportingJobProcessedCount / reportingTotal) * 100:0,
//           processed: reportingJobProcessedCount,
//           total: reportingTotal,
//         },
//         {
//           stage: 'Start of the Day',
//           progressBar: startOfDayJobProcessedCount>0?(startOfDayJobProcessedCount / startOfDayTotal) * 100:0,
//           processed: startOfDayJobProcessedCount,
//           total: startOfDayTotal,
//         },
//         {
//           stage: 'Online',
//           progressBar: onlineJobProcessedCount?(onlineJobProcessedCount / onlineTotal) * 100:0,
//           processed: onlineJobProcessedCount,
//           total: onlineTotal,
//         },
//       ];
//     };
   

//     return (
//         <div className="parent">

//           <div className="container my-5 cobStage">
//           <h2 className='header1'>Cob Stage</h2>

//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Stage</th>
//                   <th className='progressHead'>Progress Bar</th>
//                   <th className='processedHead'>Processed</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {calculateRows().map((row, index) => (
//                   <tr key={index} className='stage'>
                  
 
 
//                     <td className='stagerow'>{row.stage}</td>
//                     <td className='progressbar'>
//                       <ProgressBar completed={parseInt(row.progressBar)} />
//                     </td>
//                     <td>{row.processed}</td>
//                     <td>{row.total}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="completionTime">
//               <div className="first">
//                  <h6 className='cobruntimeheader'>COB Run Time</h6>
 
//                  <div className='cobClock'>
//                  {/* <CobClock/> */}
 
//                  </div>
//                  <div></div>
//           </div>
//           <div className="second"><h6 className='cobruntimeheader'>Expected Completion Time</h6>
//           <Expectedtimer/>
//           </div>
//        </div>
//         </div>
//       );
   
// }
// export default Table;
 
 


import './cobRuntime_CobCompletiontime.css';
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState, useEffect, useContext} from 'react';
import CobRunningBatch from '../CobStage_RunningBatch/cobRunningBatch';
import Clocktest from '../cobClockTest/clockTest';
import { Context } from "../../App";
import Timer from '../Timer/Timer1';
import DisplayPausedTime from '../Timer/DisplayPausedTime';

 

// import { cobName } from '../Navbar/navbar';
const fetch = require("node-fetch");
let globalBank;

const calBankName = async (cobName) => {
  try {
    const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/cobProgress');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    const bankName = data.bankName; // Assuming bankName is a property of the response data
    return bankName;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // or handle the error as needed
  }
}


//Code to get Bank name
// console.log(cobName);
  const getServiceName = async () => {
    try {
      const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/cobProgress');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    }catch (error) {
      console.error('Error fetching data:', error);
    }
return(
<div>

</div>
)};


let servicename="COB-1"
const getservicepayload = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/tsaservice/'+servicename+'/get');
const serviceData = await getservicepayload.json();
console.log('Service Data:', serviceData);
let description=serviceData.body['DESCRIPTION'];
console.log("Descrition: "+description);
const myArr=description.split(" ");
console.log(myArr);
console.log(myArr[2]);
let bankName=myArr[2];
console.log(typeof bankName);

function Table({ shouldStartTimer }) {
 
  
  const value=useContext(Context);
console.log(value.selectedCOB);
servicename=value.selectedCOB;
const [timerRunning, setTimerRunning] = useState(false);
  const onStart = () => {
    setTimerRunning(true);
  };  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        if (typeof bankName === "string" && bankName.length === 0) {
          console.log("The string is empty");
        } else if (bankName === null) {
          console.log("The string is null");
        } else {
          let bnkName;
          if(servicename==="COB-1"){
            bnkName="BNK"
          }
          else if(servicename==="COB-2"){
            bnkName="UK";
          }
          else if(servicename==="COB-3"){
            bnkName="MX"
          }
          else if(servicename==="COB-4"){
            bnkName="US1"
          }
          else if(servicename==="COB-5"){
            bnkName="AU1"

          }
          const response = await fetch(`http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/batch/stage/${bnkName}?page_size=1000`);
          const newData = await response.json();
          setData(newData.body);
          console.log("The string is not empty or null");
        }

        // const response = await fetch("http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/batch/stage/MX1?page_size=1000");
        // const newData = await response.json();
        // setData(newData.body);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const calculateRows = () => {
    if (!data || !data.length) return [];

    let totals = {
      'Application': 0,
      'System Wide': 0,
      'Reporting': 0,
      'Start of the Day': 0,
      'Online': 0
    };

    let processedCounts = {
      'Application': 0,
      'System Wide': 0,
      'Reporting': 0,
      'Start of the Day': 0,
      'Online': 0
    };

    data.forEach(item => {
      let batchStage = item['BATCH STAGE'];
      let jobStage = item['JOB.STATUS'];

      if (typeof batchStage === 'string' && typeof jobStage === 'string') {
        let stage = getStageFromBatchStage(batchStage);
        if (stage) {
          totals[stage]++;
          if (jobStage === '2') {
            processedCounts[stage]++;
          }
        }
      }
    });

    return Object.keys(totals).map(stage => ({
      stage,
      progressBar: totals[stage] > 0 ? (processedCounts[stage] / totals[stage]) * 100 : 0,
      processed: processedCounts[stage],
      total: totals[stage]
    }));
  };

  const getStageFromBatchStage = (batchStage) => {
    if (batchStage.charAt(0) === 'A') {
      return 'Application';
    } else if (batchStage.charAt(0) === 'S') {
      return 'System Wide';
    } else if (batchStage.charAt(0) === 'R') {
      return 'Reporting';
    } else if (batchStage.charAt(0) === 'D') {
      return 'Start of the Day';
    } else if (batchStage.charAt(0) === 'O') {
      return 'Online';
    }
    return null;
  };

  return (
    <div className="parent">
      <div className="container my-5 cobStage">
        <div className='headerrun'>Cob Stage</div>

        <table className="table">
          <thead>
            <tr>
              <th>Stage</th>
              <th className='progressHead'>Progress Bar</th>
              <th className='processedHead'>Processed</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {calculateRows().map((row, index) => (
              <tr key={index} className='stage'>
                <td className='stagerow'>{row.stage}</td>
                <td className='progressbar'>
                  <ProgressBar completed={parseInt(row.progressBar)} />
                </td>
                <td>{row.processed}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="completionTime">
        <div className="first">
          <h6 className='cobruntimeheader'>COB Run Time</h6>
          <div className='cobClock'>
          <Timer shouldStartTimer={timerRunning} onStart={onStart}/> 
          </div>
          <div></div>
        </div>
        <div className="second">
          <h6 className='cobruntimeheader'>Expected Completion Time</h6>
          {/* <DisplayPausedTime/> */}
          {/* <DisplayPausedTime shouldStartTimer={shouldStartTimer} /> */}

        </div>
      </div>
    </div>
  );
}

export default Table;


