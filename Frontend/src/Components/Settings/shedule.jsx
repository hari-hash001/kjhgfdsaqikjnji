import React, { useState, useEffect } from 'react';
import SelectBox from '../Selectbox/Cobselectbox';
import './shedule.scss';
import "react-toastify/dist/ReactToastify.css";
 
 
const DatePickerValidation = (param) => {
    const [dateAvailability, setDateAvailability] = useState({});
    const [monthAvailability, setMonthAvailability] = useState({});
    const [selectedCOB, setSelectedCOB] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [dateid, setCompanyid] = useState('');
    const [modalVisible, setModalVisible] = useState(param.modalVisible);
    const [isHoliday, setIsHoliday] = useState(true);
    const [visible,setvisible] = useState(false)
    const [currentdate, setCurrentDate] = useState('');
    const [errors, setErrors] = useState({
        date: false,
        time: false,
        cob: false
    });
 
   console.log("current"+currentdate);
 
 
    const closeModal = async () => {
       
        setModalVisible(false);
        param.handleItemClick("");
 
    };
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datesResponse = await fetch(`http://localhost:81/irf-provider-container/api/v1.1.0/reference/dates`);
                console.log('Dates API Response status:', datesResponse.status);
                if (!datesResponse.ok) {
                    throw new Error('Failed to fetch dates');
                }
                const datesJsonData = await datesResponse.json();
                const companyId = datesJsonData.body[0].companyId.substring(0, 4);
                const currentDate = datesJsonData.body[0].currentWorkingDate;
                setCurrentDate(currentDate);
                const year = currentDate.split('-')[0];
                const mainId = companyId + year;
                setCompanyid(mainId);
                console.log('Successfully fetched dates');
            } catch (error) {
                console.error('Error fetching dates:', error);
            }
        };
 
        fetchData();
    }, []);
 
    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await fetch(`http://localhost:81/irf-provider-container/api/v1.1.0/reference/dates/holidays/${dateid}`);
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Failed to fetch holidays');
                }
                const jsonData = await response.json();
                const workingDaysCalendar = jsonData.body.workingDaysCalendar[0];
                setMonthAvailability(workingDaysCalendar);
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        };
 
        if (dateid) {
            fetchHolidays();
        }
    }, [dateid]);
 
   
    useEffect(() => {
        const today = new Date(currentdate);
        console.log("today "+today);
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day =today.getDate();
        const minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        console.log(minDate);
        let maxDate = `${year}-12-31`;
        console.log(maxDate);
        if (month === 12 && day === 1) {
            maxDate = `${year + 1}-12-31`;
        }
       
        const removeDummyValues = (monthData) => {
            return monthData.replace(/X/g, '');
        };
 
        const tempDateAvailability = {};
 
        for (const key in monthAvailability) {
            if (monthAvailability.hasOwnProperty(key)) {
                const monthData = monthAvailability[key];
                const monthNumber = parseInt(key.slice(-2), 10);
                const daysInMonth = new Date(year, monthNumber, 0).getDate();
                const monthDataWithoutX = removeDummyValues(monthData);
 
                for (let i = 0; i < daysInMonth; i++) {
                    const formattedDate = `${monthNumber.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`;
                    tempDateAvailability[formattedDate] = monthDataWithoutX.charAt(i) === 'W';
                }
            }
        }
        setDateAvailability(tempDateAvailability);
        document.getElementById("datepicker").value = minDate;
        document.getElementById("datepicker").setAttribute('min', minDate);
        document.getElementById("datepicker").setAttribute('max', maxDate);
       
    }, [monthAvailability,currentdate]);
 
    const handleDatePickerChange = (event) => {
        const selectedDate = event.target.value;
        const dateParts = selectedDate.split('-');
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);
        const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const availability = dateAvailability[formattedDate];
        const isHoliday = !availability;
        console.log(isHoliday)
        console.log(availability);
        setIsHoliday(isHoliday);
        setvisible(isHoliday);
        setSelectedDate(selectedDate);
        setErrors(prevErrors => ({
            ...prevErrors,
            date: selectedDate === ''
        }));
    };
 
    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        // Validate the time format (HH:mm)
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(selectedTime)) {
            // If the time format is invalid, set selectedTime to an empty string
            setSelectedTime('');
            setErrors(prevErrors => ({
                ...prevErrors,
                time: true // Set time error to true
            }));
        } else {
            setSelectedTime(selectedTime);
            setErrors(prevErrors => ({
                ...prevErrors,
                time: false // Clear time error
            }));
        }
    };
    console.log("date:"+selectedDate);
    console.log("time"+selectedTime);
    console.log("cob"+selectedCOB);
 
    const sendValue = async () => {
        try {
            const response = await fetch('http://localhost:5000/cob/shedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "body": {
                        date: selectedDate,
                        time: selectedTime,
                        cobname: selectedCOB
                    }
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to edit the record');
            } else {
                closeModal();
            }
        } catch (error) {
            console.error('Error updating data:', error);
            closeModal();
        }
    };
 
    const handleSubmit = () => {
        const newErrors = {
            date: selectedDate === '',
            time: selectedTime === '', // Check if selectedTime is empty
            cob: selectedCOB === ''
        };
        setErrors(newErrors);
   
        if (Object.values(newErrors).some(error => error)) {
            return;
        }
        sendValue();
    };
 
    return (
     <>
 
        {  modalVisible ?
 
            <div className={`date-picker-container d-flex flex-column justify-content-center grid gap-3 pt-4 pb-4 px-4`}>
            <h2 className='head d-flex justify-content-center m-0'>Scheduler </h2>
           
            <div className="input-container pt-2">
                   <div className="label">
                   <label htmlFor="Date" className={errors.date ? 'required-field' : ''}>Date</label>
                   </div>
                   <div className="input">
                   <input className={`date-input ${errors.date ? 'required' : ''}px-3`} type="date" id="datepicker"    onChange={handleDatePickerChange} />
                   </div>
               </div>
               <div className={`not-date ${visible ? 'visible d-flex justify-content-end' :'hidden'}`}><p>Selected date is Holiday</p></div>
               <div className="input-container">
                   <div className="label">
                   <label htmlFor="Time" className={errors.time ? 'required-field' : ''}>Time</label>
                   </div>
                   <div className="input">
                   <input className={`time-input ${errors.time ? 'required' : ''}px-3`}  type="time"  disabled={isHoliday} id="appt" name="appt" onChange={handleTimeChange} />
                   </div>
               </div>
               <div className="input-container">
                   <div className="label">
                   <label htmlFor="username" className={errors.cob ? 'required-field' : ''}>COB</label>
                   </div>
                   <div className="input selectbox">
                   <SelectBox className="SelectBox" onChange={(selectedValue) => setSelectedCOB(selectedValue)} />
                   </div>
               </div>
               <div className="buttons m-0">
                      <button className="close-btn px-4 py-2 rounded" onClick={closeModal}>Close</button>
                      <button className="btn submit px-4" onClick={handleSubmit}>Submit</button>
               </div>
       </div>:<></>
        }
 
</>
       
       
    );
};
 
export default DatePickerValidation;