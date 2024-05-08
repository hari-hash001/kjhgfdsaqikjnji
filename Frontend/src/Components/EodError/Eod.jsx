import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import EodPopup from './popup';
import './Eod.scss';
import './eod.css';
// import { TimerContext } from '../Timer/CobRunningTime.jsx';

const EodErrorPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [resolveClicked, setResolveClicked] = useState(false);
  const [errorDetailId, seterrorDetailId] = useState('');
  const [isResolved, setIsResolved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [body, setBody] = useState([]);
  const [databody, setDatabody] = useState([]);
  const [selectedError, setSelectedError] = useState(null);
  // const [Data, setData] = useState[null];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = body.filter(item => item.errorDetailId).slice(indexOfFirstRecord, indexOfLastRecord);
  console.log(databody);
  const totalRecords = body.filter(item => item.errorDetailId).length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // const cobStartValue = useContext(TimerContext);
  // localStorage.setItem('cobFlag', cobStartValue.cobFlag);
  // const cobStatus = localStorage.getItem('cobFlag');

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    var companyId;
    const handleResolveClick = async () => {
      try {
        const datesResponse = await fetch(`http://localhost:81/irf-provider-container/api/v1.1.0/reference/dates`);
        console.log('Dates API Response status:', datesResponse.status);
        const datesJsonData = await datesResponse.json();
        companyId = datesJsonData.body[0].companyId;

        console.log("currentdate" + companyId);
        console.log("curDate" + companyId);
        if (!datesResponse.ok) {
          throw new Error('Failed to fetch dates');
        } else {
          console.log('Successfully fetched dates');
        }
      } catch (error) {
        console.error('Error handling resolve click:', error);
      }
    };
    const getEodData = async () => {
      try {
        const response = await fetch(`http://localhost:81/irf-miniproject-bonds/api/v1.0.0/party/ebeoderror/${companyId}`);
        if (!response.ok) {
          const errorMessge = 404;
          console.log(errorMessge);
          console.log(response.status);
          if (errorMessge === response.status) {
            setIsError(true);
          } else {
            setIsError(false);
          }
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setBody(jsonData.body);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log("isis :" + isResolved);
    getEodData();
    handleResolveClick();
    return () => {
      setIsResolved(false);
    };

  }, [isResolved]);

  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Adjust pagination based on total pages
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
      // Add ellipsis and handle showing pages based on current page
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      if (currentPage > 1) {
        pageNumbers.push(
          <li key={1} className="page-item">
            <button onClick={() => paginate(1)} className="page-link">
              1
            </button>
          </li>
        );
        if (currentPage > 2) {
          pageNumbers.push(<li key="ellipsis-start" className="page-item">...</li>);
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button onClick={() => paginate(i)} className="page-link">
              {i}
            </button>
          </li>
        );
      }
      if (currentPage < totalPages) {
        if (currentPage < totalPages - 1) {
          pageNumbers.push(<li key="ellipsis-end" className="page-item">...</li>);
        }
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

  useEffect(() => {
    var currentDate;
    var dateTime = [];
    const getDatetime = () => {
      return fetch(`http://localhost:81/CobMonitor/api/v1.0.0/party/ebeoderror/${errorDetailId}`)
        .then(response => {
          console.log(response);
          console.log('Response status:', response.status);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          // const jsonData = await response.json();
          // setData(response.json());
          return response.json();
        })
        .then(jsonData => {
          console.log('JSON Data:', jsonData);
          dateTime = jsonData.body.fatalError.map((time) => ({
            timeDate: time.dateTime,
            dateResolved: currentDate
          }));
          console.log('printed Successfully datetime get');
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    const resolveError = async () => {
      try {
        const response = await fetch(`http://localhost:81/irf-provider-container/api/v2.0.2/system/companies/${errorDetailId}/errorMessages`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "body": {
              fatalError: dateTime
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to edit the record');
        }
        console.log('Successfully edited the record');
        //console.log("isisis :"+isResolved);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };


    const handleResolveClick = async () => {
      try {
        const datesResponse = await fetch(`http://localhost:81/irf-provider-container/api/v1.1.0/reference/dates`);
        console.log('Dates API Response status:', datesResponse.status);
        const datesJsonData = await datesResponse.json();
        currentDate = datesJsonData.body[0].currentWorkingDate;

        console.log("currentdate" + currentDate);
        console.log("curDate" + currentDate);
        if (!datesResponse.ok) {
          throw new Error('Failed to fetch dates');
        } else {
          console.log('Successfully fetched dates');
        }
        await getDatetime();
        await resolveError();
        setIsResolved(true);

      } catch (error) {
        console.error('Error handling resolve click:', error);
      }
    }
    if (resolveClicked) {
      handleResolveClick();
      setResolveClicked(false);
    }
  }, [resolveClicked, errorDetailId]);

  const handleClick = (errorDetailId) => {
    const date = errorDetailId;
    seterrorDetailId(date);
    setShowPopup(true);
  };

  const handleOkClick = async () => {
    setShowPopup(false);
    setResolveClicked(true);
  };

  // useEffect(() => {
  //   const countErrorDetailIds = (Data) => {
  //     let count = 0;
  //     Data.body.forEach(entry => {
  //         if (entry.errorDetailId) {
  //             count++;
  //         }
  //     });
  //   }
  //   countErrorDetailIds();
  //   const intervalId = setInterval(countErrorDetailIds, 1000);
  //     return () => clearInterval(intervalId);
  // }, [cobStatus,Data]);

  const handleSearch = (id) => {
    setSelectedError(id);
    setShowTable(true);
  };

  const handleItemClick = () => {
    setShowTable(false);
};

  return (
    <div className="Containernew w-100">
      <div className="options grid justify-items-center">
        <h2>EB.EOD.ERROR</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>BussinessClosureDate</th>
            <th>Time Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          {isError ? (
            <tr>
              <td colSpan="5">There is no error data to display.</td>
            </tr>
          ) : (
            currentRecords.map((item, index) => (
              <tr key={index}>
                <td><FontAwesomeIcon icon={faSearch} className="search-icon" onClick={() => handleSearch(item.errorDetailId)} /></td>
                <td>{item.errorDetailId}</td>
                <td>{item.businessClosureDate}</td>
                <td>{item.dateTime}</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => handleClick(item.errorDetailId)}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Resolve</button>
                  <div className="w-100">
                    {showPopup && (
                      <div className="popup">
                        <p>Before proceeding, Make sure you resolved this error ? </p>
                        <button onClick={handleOkClick}>OK</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
            )}
        </tbody>
      </table>
      <nav>
        {isError ? (<p></p>) : (
          <ul className="pagination">
           <button>{renderPageNumbers()}</button> 
          </ul>
        )}
      </nav>
      {showTable && <EodPopup errorDetailId={selectedError} handleOkClick={handleItemClick} />}
    </div>

  );

}


export default EodErrorPage;
