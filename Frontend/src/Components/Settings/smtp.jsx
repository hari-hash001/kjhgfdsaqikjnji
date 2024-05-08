import './smtp.scss';
import React, { useState, useEffect } from 'react';
 
const Smtp = (params) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [host, setHost] = useState('');
  const [modalVisible, setModalVisible] = useState(params.modalVisible);
  const [editDisabled, setEditDisabled] = useState(true); // Disable edit button by default
  const [showPopup, setShowPopup] = useState(false); // State variable for controlling the popup visibility
 
  useEffect(() => {
    // Fetch SMTP details from the server
    fetchSmtpDetails();
  }, []);
 
  const fetchSmtpDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/smtp');
      if (response.ok) {
        const data = await response.json();
        // Update state with fetched data
        setUsername(data.username || '');
        setPassword(data.password || '');
        setHost(data.host || '');
        if(data.username){
          setEditDisabled(false);
        }else{
          setEditDisabled(true);
        }
       
      } else {
        throw new Error('Failed to fetch SMTP details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  const closeModal = async () => {
    setModalVisible(false);
    params.handleItemClick('');
  };
  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const isValid = validatePassword(newPassword);
    if (isValid) {
      // Password is correct
     
      setShowPopup(false);
      setEditDisabled(true);
    } else {
      // Password is incorrect
      alert("Password is incorrect")
      console.log("Password is incorrect");
      // Handle incorrect password here (e.g., display error message)
    }
  };
 
  const validatePassword = (password) => {
    // Get current system date in the format "20240430"
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    return password === currentDate;
  };
 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
 
  const handleHostChange = (event) => {
    setHost(event.target.value);
  };
 
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/smtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, host }),
      });
      if (response.ok) {
        console.log('SMTP details stored successfully');
        alert('PARAM ADDED SUCCESSFULLY');
        closeModal();
        // Additional logic if needed
      } else {
        throw new Error('Failed to store SMTP details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const openPopup = () => {
    setShowPopup(true);
  };
 
  const closePopup = () => {
    setShowPopup(false);
  };
 
  return (
    <>
      {modalVisible ? (
        <div className={`smtp-container d-flex flex-column justify-content-center grid gap-3 pt-4 pb-4 px-4 ${showPopup ? 'blurred' : ''}`}>
          <h2 className='head d-flex justify-content-center'>SMTP</h2>
          <div className='input-container pt-2'>
            <div className='label'>
              <label htmlFor='username'>Username </label>
            </div>
            {editDisabled ? (
   
    <div className='input'>
            <input type='text' id='username' value={username} onChange={handleUsernameChange} />
            </div>
            ) : (
            <div className='input'>
            <input type='text' id='username' value="**********" onChange={handleUsernameChange} readonly/>
            </div>
          )}
          </div>
          <div className='input-container pt-2'>
            <div className='label'>
              <label htmlFor='password'>Password </label>
            </div>
            {editDisabled ? (
   
           <div className='input'>
          <input type='text' id='password' value={password} onChange={handlePasswordChange} />
          </div>
        ) : (
    <div className='input'>
      <input type='text' id='password' value="**********" onChange={handlePasswordChange} readonly/>
    </div>
  )}
          </div>
          <div className='input-container pt-2'>
            <div className='label'>
              <label htmlFor='host'>Host </label>
            </div>
            {editDisabled ? (
   
    <div className='input'>
          <input type='text' id='host' value={host} onChange={handleHostChange} />
          </div>
          ) : (
        <div className='input'>
        <input type='text' id='host' value="**********" onChange={handleHostChange} readonly/>
        </div>
)}
          </div>
          <div className='buttons m-0 pt-3'>
          <button className={` edit-btn px-3 ${editDisabled ? 'disabled' : ''}`} disabled={editDisabled} onClick={openPopup}>
              Edit
            </button>
            <button className='close-btn px-3 rounded' onClick={closeModal}>
              Close
            </button>
            <button className='submit btn' onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <></>
       
      )}
       {/* Popup */}
       {showPopup && (
        <div className="popup">
          <h2>Password</h2>
          <form>
            <div className="input-container">
              <input type="password" id="newPassword" />
            </div>
            <div className="buttons d-flex justify-content-end gap-1 m-0 p-3">
              <button type="button" className='btn clse-btn' onClick={closePopup}>Close</button>
              <button type="submit" className='btn ok-btn' onClick={handlePasswordSubmit}>OK</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default Smtp;