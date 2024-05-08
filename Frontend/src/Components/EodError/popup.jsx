import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './popup.scss';
const EodPopup = ({ errorDetailId, handleOkClick}) => {
  const [databody, setDatabody] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible,setModalVisible] =useState(false);
  const [recordsPerPage] = useState(4);
  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = databody.slice(indexOfFirstRecord, indexOfLastRecord);
  console.log(databody);
  const totalRecords = databody.length;
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

  useEffect(() => {
    const getEod = async () => {
      try {
        const response = await fetch(`http://localhost:81/accountViewCont/api/v1.0.0/party/errorid/${errorDetailId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setDatabody(jsonData.body);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getEod();
  }, [errorDetailId]);

  

  return (
    <div className="popup-eod row d-flex justify-content-center">
        <div className="col-md-12 d-flex flex-column">
        <div className="col-md-12 d-flex justify-content-end">
        <button className="close-button" onClick={handleOkClick}>  
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#4A0575"/>
        </svg>
        </button>
        </div>
    <table className="popup-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Application</th>
          <th>Description</th>
          <th>Time Date</th>
        </tr>
      </thead>
      <tbody>
        {currentRecords.length === 0 ? (
          <tr>
            <td colSpan="5">There is no data to display.</td>
          </tr>
        ) : (
          currentRecords.map((item, index) => (
            <tr key={index}>
              <td>{item.errorDetailId}</td>
              <td>{item.applicationId}</td>
              <td>{item.errorMessage}</td>
              <td>{item.dateTime}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <nav className='pop-btn'>
      <ul className="pop-pagination d-flex justify-content-center">
       {renderPageNumbers()}
      </ul>
    </nav>
    </div>
  </div>
  );
};

export default EodPopup;
