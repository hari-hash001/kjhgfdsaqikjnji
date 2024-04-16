// import React, { createContext, useState } from 'react';
// // import CalendarComponent from './Components/CobSchedule/calendar.jsx';
// import CobProgressChart from './Components/CobProgressChart/cobProgressChart.jsx';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MonthlyCalendar from './Components/Settings/settings.jsx';
// import CobRunningBatch from './Components/CobStage_RunningBatch/cobRunningBatch.jsx';
// import Table from "./Components/CobRuntime_CobCompletiontime/cobRuntime_CobCompletiontime.jsx";
// import Clocktest from './Components/cobClockTest/clockTest.jsx';
// import Navbar from './Components/Navbar/navbar.jsx';
// import EodErrorPage from './Components/EodError/Eod.jsx';
// import HamburgerMenu from './Components/Navbar/hamburg.jsx';
// import DatePickerValidation from './Components/Shedule/shedule.jsx';
// import Timer from './Components/Timer/Timer.jsx';
// import DisplayPausedTime from './Components/Timer/DisplayPausedTime.jsx';
// export const Context=createContext();
// function App() {

//  const [selectedCOB, setSelectedCOB] = useState(' ');
//   return (
//     <Context.Provider value={{selectedCOB:selectedCOB,setSelectedCOB:setSelectedCOB}}>

//     <Router>
//       <div className="App">
      


//       <Navbar setSelectedCOB={setSelectedCOB} />        
//       <CobProgressChart/>
//         <Table/>
//         <Timer/>
//         <DisplayPausedTime/>
       
//           <Routes>
//           <Route path="/" element={<HamburgerMenu />} />
//           <Route path="/eod-error" element={<EodErrorPage />} />
//             <Route path="/schedule" element={< DatePickerValidation/>} />
//             {/* <Route path="/" element={<CobProgressChart />} />
//             <Route path="/Setting" element={<MonthlyCalendar />} /> */}
            
//           </Routes>
//       </div>
//       <Clocktest/>
//     </Router>
//     </Context.Provider>

//   );
// }

// export default App;



import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar.jsx';
import EodErrorPage from './Components/EodError/Eod.jsx';
import HamburgerMenu from './Components/Navbar/hamburg.jsx';
import DatePickerValidation from './Components/Shedule/shedule.jsx';

import Smtp from './Components/SMTP/smtp.jsx';

import Sidebar from './Components/sideNavbar/sidenav.jsx';
import './App.scss'
export const Context=createContext()//
function App() {
  const [selectedCOB, setSelectedCOB] = useState('');//
  // const [select,setSelected]=useState('')
 const [timerFlag, setTimerFlag]=useState(0);
 const [timerRunning, setTimerRunning] = useState(false);
 
 const onStart = () => {
   setTimerRunning(true);
 };
  return (
    // <Context.Provider value={{selectedCOB:selectedCOB,setSelectedCOB:setSelectedCOB}}>
    <Context.Provider value={{ selectedCOB, setSelectedCOB, timerFlag, setTimerFlag }}>

    <Router>
      <div className="wholepage">
      
        <Navbar setSelectedCOB={setSelectedCOB} onStart={onStart} />  
        <div class="Split">
          <div class="leftpane">
          </div>
          <div class="Rightpane">
          <Routes>
          {/* <Route path="/home" element={<Packer/>} /> */}
          <Route path="/eod-error" element={<EodErrorPage />} />
          <Route path="/schedule" element={<DatePickerValidation />} />
          <Route path="/Smtp" element={<Smtp />} />
          {/* Packer */}
        </Routes>
          </div>
        </div>
               
        
      </div>
    </Router>
    </Context.Provider>
  );
}
 
export default App;