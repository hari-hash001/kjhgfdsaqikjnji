import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CobRunningBatch from './Components/CobStage_RunningBatch/cobRunningBatch.jsx';
import Navbar from './Components/Navbar/navbar.jsx';
import './App.scss'
import Smtp from './Components/Settings/smtp.jsx';
// import CobProgressChart from './Components/CobProgressChart/cobProgressChart.jsx';
// import Table from './Components/CobRuntime_CobCompletiontime/cobRuntime_CobCompletiontime.jsx';
// import Sidebar from './Components/sideNavbar/sidenav.jsx';
import Homecomponent from './Components/home/home.jsx';
// import CobRunningTime from './Components/Timer/CobRunningTime.jsx';
import EodErrorPage from './Components/EodError/Eod.jsx';
import MailParam from './Components/MailParam/MailParam.jsx';
import InternalServerError from './Components/ErrorPageDBnotStarted/internalServerError.jsx';
import LoginForm from './Components/Login/Login.jsx';
 
// import { LoginContext } from './Components/Login/Login.jsx';
 
export const Context=createContext();
 
 
 
const App=()=> {
  const [selectedCOB, setSelectedCOB] = useState('');
  const [timerFlag, setTimerFlag]=useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const[progressPercent, setProgressPercent]=useState(0);
  const[isCOBRunning, setIsCOBRunning]=useState(false);
  const[isLoggedIn, setIsLoggedIn]=useState(false);
 
// const { isLogIn } = useContext(LoginContext);
// console.log('isLogIn:', isLogIn);
// if (typeof isLogIn !== 'undefined') {
//   localStorage.setItem('loginStatus', isLogIn);
// }
 
// const cobStatus = localStorage.getItem('loginStatus');
// localStorage.setItem('loginStatus', isLogIn);
const cobStatus = localStorage.getItem('loginStatus');
 
 const onStart = () => {
   setTimerRunning(true);
 };
  return (
    <Router>
      <div className='container-fluid p-0'>
      <Context.Provider value={{ selectedCOB, setSelectedCOB, timerFlag, setTimerFlag, progressPercent: setProgressPercent, isCOBRunning, setIsCOBRunning, isLoggedIn, setIsLoggedIn}}>
        
            <div className='top-navbar fixed-top w-100'>
              <Navbar setSelectedCOB={setSelectedCOB} onStart={onStart} />
          </div>
           
 
          <div className='row w-100 ' style={{ paddingTop: '2rem' }}>
            {/* <Sidebar /> */}
            <div className='col-md-12 overcontent'>
              <Routes>
               <Route path='/login' element={<LoginForm/>}  />
                <Route path='/' element={<Homecomponent />} /> {/* Define your routes */}
                <Route path='/EbEodError' element={<EodErrorPage/>}/>
                <Route path='/smtp' element={<Smtp/>}/>
                <Route path='/MailParam' element={<MailParam/>}/>
                <Route path='/internalError' element={<InternalServerError/>}/>
              </Routes>
            </div>
          </div>
        </Context.Provider>
      </div>
    </Router>
 
  );
}
 
export default App;