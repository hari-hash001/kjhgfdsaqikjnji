import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import './navbar.scss';
import DatePickerValidation from '../Settings/shedule';
import Smtp from '../Settings/smtp';
import NodeParam from '../Settings/nodeparam';
import SelectBox from '../Selectbox/Cobselectbox';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../App";
 
const Navbar = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [status, setStatus] = useState([]);
   // const [showButton, setShowButton] = useState(true);
    const contextValue=useContext(Context);
    const [serviceName,setServiceNames]=useState([]);
    console.log(status);
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/service/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                const statusData = jsonData.body.map(item => item['Status']);
                const names = jsonData.body.map(item => item['Service Name']);
                setServiceNames(names);
                setStatus(statusData);
               // const anyStart = statusData.some(s => s.toUpperCase() === 'START');
                //setShowButton(!anyStart);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
 
        fetchData();
    }, []);
 
    const handleClick = async () => {
        setModalVisible(true);
    };
 
    const handleItemClick = (value) => {
        setSelectedValue(value);
        setModalVisible(false);
    };
 
    const closeModal = () => {
        setModalVisible(false);
    };
     
    const handleSelectChange = (value) => {
        console.log(value);
        setSelectedValue(value);
        console.log(contextValue.selectedCOB);
        contextValue.setSelectedCOB(value);
        console.log(contextValue.selectedCOB);
    };
     
    const startCob = async () => {
        try {
          const response = await fetch('http://localhost:5000/service/startCob', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "body": {
                cobName: selectedValue
              }
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to edit the record');
          }
          else {
            closeModal();
            toast.success(selectedValue + " Started successfully");
            contextValue.setIsCOBRunning(true);
          }
        } catch (error) {
          console.error('Error updating data:', error);
          toast.error('Failed to start COB');
        }
    };
   
    function statusCheck()
    {
        for (let stat = 0; stat < status.length; stat++) {
            if (status[stat].toUpperCase() !== 'STOP') {
                return stat;
            }
          }
          return false;
    }
     
      const handleOkClick = () => {
        if (selectedValue !== null) {
            const startIndex = statusCheck();
            if (startIndex !== false) {
                toast.error(serviceName[startIndex] + " is already started");
            } else {
                startCob();
            }
        } else {
          toast.error("Please select a value");
        }
      };
 
    return (
        <div>
            <nav className='navBar d-flex justify-content-between'>
                <div className='logo d-flex grid gap-0 column-gap-1 align-items-center '>
                    {/* <img src=".\public\HomeAssets\logo.jpg" alt="logo" /> */}
                    <img src="/HomeAssets/logo.jpg" alt="logo" />
                    <label className='logo-txt'>AIO</label>
                </div>
                <div className="topNavcContent d-flex align-items-center grid gap-0 column-gap-3 justify-content-end">
                <div className="icons d-flex gap-4">
                <NavLink
                exact
                to="/"
                activeClassName="active-link "
                className="logo px-0"
              >
                   <strong>Home</strong>
              </NavLink>
              <NavLink
                exact
                to="/EbEodError"
                activeClassName="active-link"
                className="logo"
              >
               <strong>Error Info</strong>
              </NavLink>
                </div>
                <div className='settings'>
                    <ul>
                        <li>
                        <strong>
                            Settings</strong>
                            <ul className='submenu ml-3'>
                                <li onClick={() => handleItemClick('Schedule')}>
                                <p><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 2.25C7.16421 2.25 7.5 2.58579 7.5 3V4.5H16.5V3C16.5 2.58579 16.8358 2.25 17.25 2.25C17.6642 2.25 18 2.58579 18 3V4.5H18.75C20.4069 4.5 21.75 5.84315 21.75 7.5V18.75C21.75 20.4069 20.4069 21.75 18.75 21.75H5.25C3.59315 21.75 2.25 20.4069 2.25 18.75V7.5C2.25 5.84315 3.59315 4.5 5.25 4.5H6V3C6 2.58579 6.33579 2.25 6.75 2.25ZM20.25 11.25C20.25 10.4216 19.5784 9.75 18.75 9.75H5.25C4.42157 9.75 3.75 10.4216 3.75 11.25V18.75C3.75 19.5784 4.42157 20.25 5.25 20.25H18.75C19.5784 20.25 20.25 19.5784 20.25 18.75V11.25Z" fill="#0F172A"/>
                                </svg>
                                    Schedule</p>
                                    </li>
                                <li onClick={() => handleItemClick('SMTP')}>
                                <p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.7214 12.7517C21.7404 12.5036 21.75 12.2529 21.75 11.9999C21.75 10.4758 21.4003 9.03328 20.7767 7.74835C19.5396 8.92269 18.0671 9.85146 16.4374 10.4565C16.4789 10.9655 16.5 11.4803 16.5 11.9999C16.5 13.1011 16.4051 14.1802 16.2229 15.2293C18.2163 14.7277 20.0717 13.8792 21.7214 12.7517Z" fill="#0F172A"/>
                                <path d="M14.6343 15.5501C14.874 14.4043 15 13.2168 15 11.9999C15 11.6315 14.9885 11.2659 14.9657 10.9032C14.0141 11.1299 13.021 11.2499 12 11.2499C10.979 11.2499 9.98594 11.1299 9.0343 10.9032C9.01155 11.2659 9 11.6315 9 11.9999C9 13.2168 9.12601 14.4043 9.3657 15.5501C10.2246 15.6817 11.1043 15.7499 12 15.7499C12.8957 15.7499 13.7754 15.6817 14.6343 15.5501Z" fill="#0F172A"/>
                                <path d="M9.77224 17.119C10.5028 17.2054 11.2462 17.2499 12 17.2499C12.7538 17.2499 13.4972 17.2054 14.2278 17.119C13.714 18.7746 12.9575 20.3235 12 21.724C11.0425 20.3235 10.286 18.7746 9.77224 17.119Z" fill="#0F172A"/>
                                <path d="M7.77705 15.2293C7.59493 14.1802 7.5 13.1011 7.5 11.9999C7.5 11.4803 7.52114 10.9655 7.56261 10.4565C5.93286 9.85146 4.46039 8.92269 3.22333 7.74835C2.59973 9.03328 2.25 10.4758 2.25 11.9999C2.25 12.2529 2.25964 12.5036 2.27856 12.7517C3.92826 13.8792 5.78374 14.7277 7.77705 15.2293Z" fill="#0F172A"/>
                                <path d="M21.3561 14.7525C20.3404 18.2104 17.4597 20.8705 13.8776 21.5693C14.744 20.1123 15.4185 18.5278 15.8664 16.8508C17.8263 16.44 19.6736 15.7231 21.3561 14.7525Z" fill="#0F172A"/>
                                <path d="M2.64395 14.7525C4.32642 15.7231 6.17372 16.44 8.13356 16.8508C8.58146 18.5278 9.25602 20.1123 10.1224 21.5693C6.54027 20.8705 3.65964 18.2104 2.64395 14.7525Z" fill="#0F172A"/>
                                <path d="M13.8776 2.43055C16.3991 2.92245 18.5731 4.3862 19.9937 6.41599C18.9351 7.48484 17.6637 8.34251 16.2483 8.92017C15.862 6.58282 15.0435 4.39132 13.8776 2.43055Z" fill="#0F172A"/>
                                <path d="M12 2.27588C13.4287 4.36548 14.4097 6.78537 14.805 9.39744C13.9083 9.62756 12.9684 9.74993 12 9.74993C11.0316 9.74993 10.0917 9.62756 9.19503 9.39744C9.5903 6.78537 10.5713 4.36548 12 2.27588Z" fill="#0F172A"/>
                                <path d="M10.1224 2.43055C8.95648 4.39132 8.13795 6.58282 7.75171 8.92017C6.33629 8.34251 5.06489 7.48484 4.00635 6.41599C5.42689 4.3862 7.60085 2.92245 10.1224 2.43055Z" fill="#0F172A"/>
                                </svg>
                                    SMTP
                                </p>
                                    </li>
                                {/* <li onClick={() => handleItemClick('Node param')}> */}
                                    {/* <p>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.625 6.75C2.625 6.12868 3.12868 5.625 3.75 5.625C4.37132 5.625 4.875 6.12868 4.875 6.75C4.875 7.37132 4.37132 7.875 3.75 7.875C3.12868 7.875 2.625 7.37132 2.625 6.75ZM7.5 6.75C7.5 6.33579 7.83579 6 8.25 6H20.25C20.6642 6 21 6.33579 21 6.75C21 7.16421 20.6642 7.5 20.25 7.5H8.25C7.83579 7.5 7.5 7.16421 7.5 6.75ZM2.625 12C2.625 11.3787 3.12868 10.875 3.75 10.875C4.37132 10.875 4.875 11.3787 4.875 12C4.875 12.6213 4.37132 13.125 3.75 13.125C3.12868 13.125 2.625 12.6213 2.625 12ZM7.5 12C7.5 11.5858 7.83579 11.25 8.25 11.25H20.25C20.6642 11.25 21 11.5858 21 12C21 12.4142 20.6642 12.75 20.25 12.75H8.25C7.83579 12.75 7.5 12.4142 7.5 12ZM2.625 17.25C2.625 16.6287 3.12868 16.125 3.75 16.125C4.37132 16.125 4.875 16.6287 4.875 17.25C4.875 17.8713 4.37132 18.375 3.75 18.375C3.12868 18.375 2.625 17.8713 2.625 17.25ZM7.5 17.25C7.5 16.8358 7.83579 16.5 8.25 16.5H20.25C20.6642 16.5 21 16.8358 21 17.25C21 17.6642 20.6642 18 20.25 18H8.25C7.83579 18 7.5 17.6642 7.5 17.25Z" fill="#0F172A"/>
                                    </svg>
                                    Node param
                                    </p> */}
                                    {/* </li> */}
                                   
                                    <li>
                                    <a href="/MailParam">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 8.6691V17.25C1.5 18.9069 2.84315 20.25 4.5 20.25H19.5C21.1569 20.25 22.5 18.9069 22.5 17.25V8.6691L13.5723 14.1631C12.6081 14.7564 11.3919 14.7564 10.4277 14.1631L1.5 8.6691Z" fill="black"/>
                                    <path d="M22.5 6.90783V6.75C22.5 5.09315 21.1569 3.75 19.5 3.75H4.5C2.84315 3.75 1.5 5.09315 1.5 6.75V6.90783L11.2139 12.8856C11.696 13.1823 12.304 13.1823 12.7861 12.8856L22.5 6.90783Z" fill="black"/>
                                    </svg>
                                    Mail Alert
                                    </a>
                                    </li>
                                    {/* <li>
                                    <NavLink
                                        exact
                                        to="/MailParam"
                                        className="d-flex "
                                    >
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 8.6691V17.25C1.5 18.9069 2.84315 20.25 4.5 20.25H19.5C21.1569 20.25 22.5 18.9069 22.5 17.25V8.6691L13.5723 14.1631C12.6081 14.7564 11.3919 14.7564 10.4277 14.1631L1.5 8.6691Z" fill="black"/>
                                    <path d="M22.5 6.90783V6.75C22.5 5.09315 21.1569 3.75 19.5 3.75H4.5C2.84315 3.75 1.5 5.09315 1.5 6.75V6.90783L11.2139 12.8856C11.696 13.1823 12.304 13.1823 12.7861 12.8856L22.5 6.90783Z" fill="black"/>
                                    </svg>
                                    Mail Param
                                    </NavLink>
                                   
                                    </li> */}
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="button ">
                    <button className="submit-btn px-4 rounded py-2" onClick={handleClick}>START</button>
                    <div className={`modal-box p-4 ${modalVisible ? 'visible' : 'hidden'}`}>
                    <div className="selectbox">
                     <SelectBox onChange={handleSelectChange} />
                    </div>
                    <div className="buttons pt-4">
                     <button className="close-btn px-4 py-2 rounded" onClick={closeModal}>Close</button>
                     <button className="btn submit" onClick={handleOkClick}>Okay</button>
                     </div>
                     </div>
                </div>
                </div>
            </nav>
            {selectedValue === 'Schedule' && <DatePickerValidation modalVisible={true} handleItemClick={handleItemClick}/>}
            {selectedValue === 'SMTP' && <Smtp modalVisible={true} handleItemClick={handleItemClick}/>}
            {selectedValue === 'Node param' && <NodeParam modalVisible={true} handleItemClick={handleItemClick} />}
        </div>
    );
};
 
export default Navbar;