import './cobRunningBatch.scss';
import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
const fetch = require("node-fetch");
 
 
 
const CobRunningBatch = ({ batchName }) => {
  const [batchData, setBatchData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:81/fundsTransferContainer/api/v1.0.0/party/runningbatch?page_size=1000');
        const result = await response.json();
        console.log(result.body);
     
        setBatchData(result.body);
        console.log(batchData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
 
    fetchData();
    const interval = setInterval(fetchData, 4000);
 
    return () => clearInterval(interval);
  }, []);
 
  const columns = [
    {
      name: 'ID', // Use the batchName prop for column name
      selector: (row) => row['ID'],
      wrap: true, // Enable text wrapping for this column
      width: '10.8rem', // Adjust width as needed
 
    },
    {
      name: 'JOB Name',
      selector: (row) => row['JOB NAME'],
      wrap: true, // Enable text wrapping for this column
      width: '10.8rem', // Adjust width as needed
 
    },
    {
      name: 'Batch Stage',
      selector: (row) => row['BATCH STAGE'],
      wrap: true, // Enable text wrapping for this column
      width: '10.8rem', // Adjust width as needed
 
    },
 
  ];
 
  return (
    <div className="row">
      <div className='cobRunningBatch mt-3 col-md-12 col-sm-12 overflow-y-hidden'>
      <div className='header'>Running Batch</div>
      <DataTable className="cob-running-batch-table w-100"
        columns={columns}
        data={batchData}
        fixedHeader
        noHeader
        text-overflow='clip'
        overflowY
      />
    </div>
    </div>
   
  );
};
 
export default CobRunningBatch;