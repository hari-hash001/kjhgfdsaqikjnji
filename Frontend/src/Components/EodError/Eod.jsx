// EodErrorPage.js

// import React from 'react';

// const EodErrorPage = () => {
//   return (
//     <div>
//       <h2>EOD Error Page</h2>
//       {/* Add your content here */}
//     </div>
//   );
// };

// export default EodErrorPage;



import React, { useState } from 'react';
import './Eod.scss';

function EodErrorPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = body.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalRecords = body.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button onClick={() => paginate(i)} className="page-link">
              {i}
            </button>
          </li>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <button onClick={() => paginate(i)} className="page-link">
                {i}
              </button>
            </li>
          );
        }
        pageNumbers.push(<li key="ellipsis1" className="page-item">...</li>);
        pageNumbers.push(
          <li key={totalPages} className="page-item">
            <button onClick={() => paginate(totalPages)} className="page-link">
              {totalPages}
            </button>
          </li>
        );
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          <li key={1} className="page-item">
            <button onClick={() => paginate(1)} className="page-link">
              1
            </button>
          </li>
        );
        pageNumbers.push(<li key="ellipsis2" className="page-item">...</li>);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <button onClick={() => paginate(i)} className="page-link">
                {i}
              </button>
            </li>
          );
        }
      } else {
        pageNumbers.push(
          <li key={1} className="page-item">
            <button onClick={() => paginate(1)} className="page-link">
              1
            </button>
          </li>
        );
        pageNumbers.push(<li key="ellipsis3" className="page-item">...</li>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <button onClick={() => paginate(i)} className="page-link">
                {i}
              </button>
            </li>
          );
        }
        pageNumbers.push(<li key="ellipsis4" className="page-item">...</li>);
        pageNumbers.push(
          <li key={totalPages} className="page-item">
            <button onClick={() => paginate(totalPages)} className="page-link">
              {totalPages}
            </button>
          </li>
        );
      }
    }
    return pageNumbers;
  };

  return (
    
      
      <div class="Containernew">
        <div class="options grid justify-items-center">
          <h2>EB.EOD.ERROR</h2>
        </div>
        <table class=" table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Application</th>
              <th>Description</th>
              <th>Time Date</th>
              <th>Fix Required</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {currentRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.errorDetailId}</td>
                <td>{item.applicationId}</td>
                <td>{item.errorMessage}</td>
                <td>{item.dateTime}</td>
                <td style={{ color: item.dateResolved ? 'red' : 'green' }}>
                  {item.dateResolved ? 'NO' : 'YES'}
                </td>
                <td>
                  {item.dateResolved ? (
                    <span className=" bg-green-500 text-black">RESOLVED</span>
                  ) : (
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">RESOLVE</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
        <ul className="pagination">
            {renderPageNumbers()}
          </ul>
        </nav>
      </div>
  );
}





var body=[
  {
    "dateTime": "13:15:29 01 MAR 2024",
    "errorDetailId": "MY0010001.20240304",
    "companyId": "MY0010001",
    "dateResolved": "2024-03-01T00:00:00.000Z",
    "errorMessage": "Runtime Exception IndexOutOfBoundsException Index: 0, Size: 0",
    "isFixRequired": "YES",
    "detailKey": "205156025498929.00",
    "applicationId": "BNK/KDB.FT.ATM.TRANS.REF-KDB.FT.ATM.TRANS.REF",
    "businessClosureDate": "2024-03-04"
},
{
    "dateTime": "13:01:52 08 MAR 2024",
    "errorDetailId": "MY0010001.20240308",
    "companyId": "MY0010001",
    "errorMessage": "EB.RTN.DATE2024031",
    "isFixRequired": "YES",
    "detailKey": "205226292902912.00",
    "applicationId": "SYSTEM.END.OF.DAY1-STO.BALANCES.EOD",
    "businessClosureDate": "2024-03-08"
},
{
    "dateTime": "13:00:57 15 MAR 2024",
    "errorDetailId": "MY0010001.20240315",
    "companyId": "MY0010001",
    "dateResolved": "2024-03-18T00:00:00.000Z",
    "errorMessage": "EB.RTN.DATE2024031",
    "isFixRequired": "NO",
    "detailKey": "205295153507657.00",
    "applicationId": "SYSTEM.END.OF.DAY1-STO.BALANCES.EOD",
    "businessClosureDate": "2024-03-15"
},
{
    "dateTime": "08:38:22 20 MAR 2024",
    "errorDetailId": "MY0010001.20240319",
    "companyId": "MY0010001",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205341893223902.00",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY",
    "businessClosureDate": "2024-03-19"
},
{
    "dateTime": "08:38:25 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "NO",
    "detailKey": "205348980523905.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:38:29 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "NO",
    "detailKey": "205344657723909.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:38:47 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "NO",
    "detailKey": "205340560023927.00",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:39:02 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205342883523942.00",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:39:45 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205342317123985.00",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:40:41 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205342082324041.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:40:42 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205345386524042.00",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:40:47 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205349424024047.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:40:49 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205343721124049.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:40:54 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205347512924054.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "08:40:57 20 MAR 2024",
    "dateResolved": "2024-03-20T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205340332624057.00",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY"
},
{
    "dateTime": "06:40:14 21 MAR 2024",
    "errorDetailId": "MY0010001.20240320",
    "companyId": "MY0010001",
    "dateResolved": "2024-03-21T00:00:00.000Z",
    "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
    "isFixRequired": "YES",
    "detailKey": "205350533203214.01",
    "applicationId": "FT.START.OF.DAY-FT.STO.PAY",
    "businessClosureDate": "2024-03-20"
},{
  "dateTime": "07:40:15 23 MAR 2024",
  "errorDetailId": "MY0010005.20240320",
  "companyId": "MY0010005",
  "dateResolved": "2024-03-21T00:00:00.000Z",
  "errorMessage": "NO FILE.CONTROL RECORD - FOREX - F.FOREX , MNEMONIC =  , IN.PARAMETER = F.FOREX , COMPANY = MY0010001 , CALL.ROUTINE = F.READ,FX.GET.UTILISATION.RATE,PAYMENT.ORDER.AUTHORISE",
  "isFixRequired": "NO",
  "detailKey": "205350533203214.01",
  "applicationId": "FT.START.OF.DAY-FT.STO.PAY",
  "businessClosureDate": "2024-03-20"
}
]
  

export default EodErrorPage;
