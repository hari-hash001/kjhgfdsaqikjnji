import React, { createContext, useState,useRef } from 'react';
import CobRunningBatch from '../CobStage_RunningBatch/cobRunningBatch.jsx';
import CobProgressChart from '../CobProgressChart/cobProgressChart.jsx';
import Table from '../CobRuntime_CobCompletiontime/cobRuntime_CobCompletiontime.jsx';
import CobRunningTime from '../Timer/CobRunningTime.jsx';
import './home.scss';
 
 
export const Context=createContext()
 
const Homecomponent = () => {
 
    const [selectedCOB, setSelectedCOB] = useState('');
    const [timerFlag, setTimerFlag]=useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const tiktikRef = useRef(null);
 
    const handleDrag = (event) => {
        event.preventDefault();
        const tiktik = tiktikRef.current;
        const boundingRect = tiktik.parentElement.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const offsetY = event.clientY;
    
        const handleMouseMove = (e) => {
            e.preventDefault();
            tiktik.style.left = e.clientX - offsetX + 'px';
            tiktik.style.top = e.clientY - offsetY + 'px';
        };
    
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
 
    return (
        <div className="row">
            <div className='col-md-12 d-flex flex-wrap justify-content-center mt-3'>
                <div className='progressChart col-md-6 col-sm-11 col-xl-6'>
                    <CobProgressChart />
                </div>
                <div className='RunningBatch col-md-6 col-sm-11 col-xl-6'>
                    <CobRunningBatch/>
                </div>
            </div>
            <div className='col-md-12 d-flex justify-content-between flex-wrap px-1' style={{ paddingTop: '1.3rem' }}>
        <div className="col-md-3 col-xl-3 col-sm-12 d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
            <div className="tiktik" ref={tiktikRef} onMouseDown={handleDrag} style={{ position: 'absolute', width:'22rem' }}>
                <div className="col-md-11">
                    <CobRunningTime />
                </div>
            </div>
        </div>
        <div className='col-md-9 col-xl-9 col-sm-12'>
            <Table />
        </div>
    </div>
             
               
             
        </div>
         
        );
};
 
export default Homecomponent;