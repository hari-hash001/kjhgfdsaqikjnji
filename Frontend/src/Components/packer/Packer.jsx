import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CobProgressChart from '../CobProgressChart/cobProgressChart';
import Table from '../CobRuntime_CobCompletiontime/cobRuntime_CobCompletiontime';


function Packer(){
    return(
        <div>
        <CobProgressChart/>
        <Table/>
        </div>
    )
};

export default Packer;
