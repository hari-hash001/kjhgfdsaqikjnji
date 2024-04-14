import React, { useState, useEffect } from 'react';
import SelectBox from '../Selectbox/Cobselectbox';
import './shedule.css';

const DatePickerValidation = () => {
    const [dateAvailability, setDateAvailability] = useState({});
    const [showTimePicker, setShowTimePicker] = useState(false); // Declaring showTimePicker state variable
    const [selectedCOB, setSelectedCOB] = useState('');
    const[selectedTime,setSelectedTime]= useState('');
    const[selectedDate,setSelectedDate]= useState('');
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        let maxDate = `${year}-12-31`;
        if (month === 12 && day === 1) {
            maxDate = `${year + 1}-12-31`;
        }

        const monthAvailability = {
            month01: "WWWWWHHWWWWWHHWWWWWHHWWWWWHHWWW",
            month02: "WWHHWWWWWHHWWWWWHHWWWWWHHWWWWXX",
            month03: "WHHWWWWWHHWWWWWHHWWWWWHHWWWWWHH",
            month04: "WWWWWHHWWWWWHHWWWWWHHWWWWWHHWWX",
            month05: "WWWHHWWWWWHHWWWWWHHWWWWWHHWWWWW",
            month06: "HHWWWWWHHWWWWWHHWWWWWHHWWWWWHHX",
            month07: "WWWWWHHWWWWWHHWWWWWHHWWWWWHHWWW",
            month08: "WWHHWWWWWHHWWWWWHHWWWWWHHWWWWWH",
            month09: "HWWWWWHHWWWWWHHWWWWWHHWWWWWHHWX",
            month10: "WWWWHHWWWWWHHWWWWWHHWWWWWHHWWWW",
            month11: "WHHWWWWWHHWWWWWHHWWWWWHHWWWWWHX",
            month12: "HWWWWWWHWWWWWHHWWWWWHHWWWWWHHWW"
        };

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
        document.getElementById("datepicker").setAttribute('min', new Date().toISOString().split('T')[0]);
        document.getElementById("datepicker").setAttribute('max', maxDate);
        
    }, []);
    
    
    const handleDatePickerChange = (event) => {
        const selectedDate = event.target.value;
        const dateParts = selectedDate.split('-');
        const month = parseInt(dateParts[1], 10);
        const day = parseInt(dateParts[2], 10);
        const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const availability = dateAvailability[formattedDate];
        console.log(`Availability for ${selectedDate}: ${availability}`);
        setShowTimePicker(availability);
        setSelectedDate(selectedDate);
    };
    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        setSelectedTime(selectedTime); // Update selectedTime state
    };

    const handleSubmit = () => {
        const newData = {
            date: selectedDate,
            time: selectedTime,
            cob: selectedCOB
        };
        setTableData([...tableData, newData]); // Adding new data to the table
    };

    return (
        <div className="date-picker-container">
            <h2>Date Picker Validation</h2>
            <div className="input-container">
                <label className="label" htmlFor="datepicker">Select a date:</label>
                <input className="date-input" type="date" id="datepicker" onChange={handleDatePickerChange} />
                {showTimePicker && (
                    <div style={{ display: 'block' }}>
                        <input className="time-input" type="time" id="appt" name="appt" onChange={handleTimeChange} />
                    </div>
                )}
                <SelectBox onSelect={(selectedValue) => setSelectedCOB(selectedValue)} />
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            <div className='listContainer'>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>COB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.time}</td>
                                <td>{data.cob}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default DatePickerValidation;
