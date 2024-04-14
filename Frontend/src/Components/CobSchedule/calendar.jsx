import React, { useState } from 'react';
import TextField from '@mui/x-date-pickers/TextField'; // Import TextField from @mui/x-date-pickers
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers'; // Import DesktopDatePicker from @mui/x-date-pickers

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Use AdapterDayjs */}
      <DesktopDatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />} 
      />
    </LocalizationProvider>
  );
};

export default CalendarComponent;
