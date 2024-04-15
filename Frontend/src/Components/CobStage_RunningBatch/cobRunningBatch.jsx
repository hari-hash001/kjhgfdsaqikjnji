
import './cobRunningBatch.css';
import React, { useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
const fetch = require("node-fetch");



const CobRunningBatch = ({ batchName }) => {
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/runningbatch?page_size=1000');
        const result = await response.json();
        // console.log(result.body);
        setBatchData(result.body);
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
      name: 'Batch Name', // Use the batchName prop for column name
      selector: (row) => row['ID'],
      wrap: true, // Enable text wrapping for this column
      width: '11.8rem', // Adjust width as needed

    },
    {
      name: 'JOB Name',
      selector: (row) => row['JOB NAME'],
      wrap: true, // Enable text wrapping for this column
      width: '11.8rem', // Adjust width as needed

    },
    {
      name: 'Status',
      selector: (row) => row['JOB STATUS'],
      wrap: true, // Enable text wrapping for this column
      width: '11.8rem', // Adjust width as needed

    },
    {
      name: 'Batch Stage',
      selector: (row) => row['BATCH STAGE'],
      wrap: true, // Enable text wrapping for this column
      width: '11.8rem', // Adjust width as needed

    },

  ];



 

  return (
    <div className='cobRunningBatch'>
      <div className='header'>Running Batch</div>
      <DataTable className="cob-running-batch-table"
        columns={columns}
        data={batchData}
        fixedHeader
        noHeader
        text-overflow='clip'
        overflowY
      />
    </div>
  );
};

export default CobRunningBatch;


// const CobRunningBatch = ({ batchName }) => {
//   const [batchData, setBatchData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:81/accountViewCont/api/v1.0.0/party/runningbatch');
//         const result = await response.json();
//         setBatchData(result.body);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const columns = [
//     {
//       name: 'Batch Name', // Use the batchName prop for column name
//       selector: (row) => row['ID'],
//     },
//     {
//       name: 'JOB Name',
//       selector: (row) => row['JOB NAME'],
//     },
//     {
//       name: 'Status',
//       selector: (row) => row['JOB STATUS'],
//     },
//   ];

//   return (
//     <div>
//               <div className='header'>Running Batch</div>

//       <DataTable columns={columns} data={batchData} fixedHeader title="" />
//     </div>
//   );
// };

// export default CobRunningBatch;
