 import './cobRuntime_CobCompletiontime.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2'
import CobRunningTime from '../Timer/CobRunningTime';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from '../../App';
 
const fetch = require("node-fetch");
 
function Table({ shouldStartTimer }) {
  let applicationCounter = 0;
    let systemWideCounter = 0;
    let reportingCounter = 0;
    let startOfDayCounter = 0;
    let onlineCounter = 0;
  const value = useContext(Context);
  const [progressPercent, setProgressPercent] = useState(0);
  const[starOfDayDone, setStarOfDayDone]=useState(false);
  const[onlineReset,setOnlineReset]=useState(false);
  const [hasProgressData, sethasProgressData] = useState(false);
  const [totals, setTotals] = useState({
    'Application': { total: 0, processed: 0 },
    'System Wide': { total: 0, processed: 0 },
    'Reporting': { total: 0, processed: 0 },
    'Start of the Day': { total: 0, processed: 0 },
    'Online': { total: 0, processed: 0 }
  });
 
 
  useEffect(() => {
    const fetchStartData = async () => {      
      try {
        const response = await fetch('http://localhost:81/accountViewCont/api/v1.0.0/party/cobProgress');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        // setJsonData(jsonData);
 
       
 
       const progressData = jsonData.body.some(item => {
          const progressParts = item.Progress.split(' ');
          const progressValue = parseInt(progressParts[2]);
          return progressValue > 90;
        });
        sethasProgressData(progressData);
        // console.log("hasProgressData: "+hasProgressData);
        // if (hasProgressData) {
        //   // console.log("Clock started");
        //   handleStart();
        // } else {
        //   if(COBStartedFlag){
        //     handleReset(); // Reset the timer if there's no progress data
        //   }
        // }
        return hasProgressData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log("hasProgressData1: "+hasProgressData+" starOfDayDone1: "+starOfDayDone);
 
    };
    fetchStartData();
    const intervalId = setInterval(fetchStartData, 1000);
    return () => clearInterval(intervalId);
  }, []);
 
  useEffect(() => {
    const FetchData = async () => {
      try {
        console.log(value.isCOBRunning);
     
        console.log("value.selectedCOB: " + value.selectedCOB);
 
                  if (value.isCOBRunning && value.selectedCOB) {
          // Set COBName in localStorage
          localStorage.setItem('COBName', value.selectedCOB);
        }
        console.log("localStorage.getItem('COBName'): " + localStorage.getItem('COBName'));
 
 
        localStorage.setItem('isCOBRunningLocal', value.isCOBRunning);
        if(value.isCOBRunning){
 
        }
        const response = await fetch(`http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/tsaservice/${localStorage.getItem('COBName')}/get`);
        const serviceData = await response.json();
        const description = serviceData.body['DESCRIPTION'];
        const bankName = description.split(" ")[2];
 
        const cobResponse = await fetch(`http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/batch/stage/${bankName}?page_size=1000`);
        const cobData = await cobResponse.json();
        const newData = cobData.body;
        let newTotals = {
          'Application': { total: 0, processed: 0 },
          'System Wide': { total: 0, processed: 0 },
          'Reporting': { total: 0, processed: 0 },
          'Start of the Day': { total: 0, processed: 0 },
          'Online': { total: 0, processed: 0 }
        };
 
 
        newData.forEach(item => {
          console.log("value.onlineReset: "+value.onlineReset);
          let batchStage = item['BATCH STAGE'];
          let jobStage = item['JOB STATUS'];
          if (typeof batchStage === 'string' && typeof jobStage === 'string') {
            let stage = getStageFromBatchStage(batchStage);
            if (stage) {
              if (stage === 'System Wide' && newTotals['System Wide'].processed > 0) {
                newTotals['Application'].processed = newTotals['Application'].total;
                if(applicationCounter===0){
                      sendValue('Application');
                      applicationCounter++;
                  }
              } else if (stage === 'Reporting' && newTotals['Reporting'].processed > 0) {
                newTotals['System Wide'].processed = newTotals['System Wide'].total;
                if(systemWideCounter===0){
                  sendValue('System Wide');
                  systemWideCounter++;
              }
              } else if (stage === 'Start of the Day' && newTotals['Start of the Day'].processed > 0) {
                newTotals['Reporting'].processed = newTotals['Reporting'].total;
               
                if(reportingCounter===0){
                    sendValue('Reporting');
                    reportingCounter++;
                  }
              } else if (stage === 'Online' && newTotals['Online'].processed > 0) {
                newTotals['Start of the Day'].processed = newTotals['Start of the Day'].total;
                if(startOfDayCounter===0){
                    sendValue('Start of the Day');
                     startOfDayCounter++;
                  }
              }
             
              newTotals[stage].total++;
              if (jobStage === '2') {
                newTotals[stage].processed++;
              }
            }
            // else if (starOfDayDone) {
            //   console.log("starOfDayDone :"+starOfDayDone+" value.onlineReset: "+value.onlineReset);
            //   // Set "Online" processed count to total
            //   console.log("Setting Online as total");
            //   newTotals['Online'].processed = newTotals['Online'].total;
            //   if (onlineCounter === 0) {
            //     sendValue('Online');
            //     onlineCounter++;
            //   }
            // }
          }
        });
     
    // //Setting Online to reset
    // console.log("totals['Online'].processed: "+totals['Online'].processed);
    // console.log("newTotals['Online'].processed: "+newTotals['Online'].processed);
 
    console.log("hasProgressData: "+hasProgressData+" starOfDayDone: "+starOfDayDone);
    if(hasProgressData&&starOfDayDone){
      // newTotals['Online'].processed = newTotals['Online'].total;
      if (onlineCounter === 0) {
        Swal.fire({
          title: localStorage.getItem('COBName'),
          text: "Completed Succesfully",
          icon: "success"
        });
            sendValue('Online');
            localStorage.removeItem('COBName');
            onlineCounter++;
           
          }
    }
 
 
    // if (totals['Online'].processed>20 && starOfDayDone ) {
    //   // Set "Online" processed count to total
    //   newTotals['Online'].processed = newTotals['Online'].total;
    //   console.log("Setting Online as total.....");
    //   if (onlineCounter === 0) {
    //     sendValue('Online');
    //     onlineCounter++;
    //   }
    // }
 
 
        setTotals(newTotals);
        let totalCount = 0;
        let processedCount = 0;
        Object.values(newTotals).forEach(({ total, processed }) => {
          totalCount += total;
          processedCount += processed;
        });
 
        const percentage = totalCount > 0 ? (processedCount / totalCount) * 100 : 0;
        setProgressPercent(percentage);
      }
     
      catch (error) {
        console.error('Error fetching data:', error);
      }
     
   
     
     
    };
   
    FetchData();
    const interval = setInterval(FetchData, 3000);
    return () => clearInterval(interval);
  }, [value.selectedCOB, value.COBStarted,value.isCOBRunning, starOfDayDone]);
 
 
 
 
  const sendValue = async (stage) => {
    console.log("Inside send Value: "+stage);
    if(stage==='Start of the Day'){
      setStarOfDayDone(true);
    }
    try {
      const response = await fetch('http://localhost:5000/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: stage
        }),
      });
 
      if (!response.ok) {
        throw new Error('Failed to edit the record');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
 
 
 
  const getStageFromBatchStage = (batchStage) => {
   
    switch (batchStage.charAt(0)) {
      case 'A': {
        return 'Application';
      }
      case 'S': {
        return 'System Wide';
      }
      case 'R': {
        return 'Reporting';
      }
      case 'D': {
        return 'Start of the Day';
      }
      case 'O': {
        return 'Online';
      }
      default:
        return null;
    }
  };
  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-12 tab px-3">
          <table className="table p-0 my-1">
            <thead>
              <tr className='stage text-center'>
              <th style={{ color: "#4A0575", padding: "0.5rem", fontSize: "17px", fontWeight: 600, margin: 0 }}>COB Stage</th>

                <th className='progressHead'>Progress Bar</th>
                <th className='processedHead'>Processed</th>
                <th className='progressHead'>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totals).map(([stage, { total, processed }]) => (
                <tr key={stage}>
                  <td className='stagerow d-flex justify-content-center'>{stage}</td>
                  <td className='progressbar text-center'>
                    <ProgressBar completed={total > 0 ? parseInt((processed / total) * 100) : 0} height="12px"/>
                  </td>
                  <td className='text-center'>{processed}</td>
                  <td className='text-center'>{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
export default Table;