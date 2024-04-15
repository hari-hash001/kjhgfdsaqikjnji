

import './navbar.css';
import { Link } from "react-router-dom";
import React, { useContext, useState} from "react";
import SelectBox from '../Selectbox/Cobselectbox';
import { Context } from '../../App';
 import { useSelector, useDispatch } from 'react-redux';
import ButtonClicked, { click } from '../store/ButtonClicked'; // Import the reducer
 let timerFlag=0;
 
const Navbar = ({onStart}) => {
  // const isClicked = useSelector((state) => state.ButtonClicked.isClicked);
  const isClicked = useSelector((state) => console.log("from navbar state: "+(state.buttonClicked.isClicked)));
  // console.log(isClicked);
  const dispatch=useDispatch();
  const { setTimerFlag } = useContext(Context);
    const [showMenu, setShowMenu] = useState(false);
    var [selectedCOB, setSelectedCOB] = useState('');

   const value=useContext(Context);
  //  console.log("timerFlag: "+value.timerFlag);

  //  console.log(value);
    const handleCOBStart = async () => {
      dispatch(click());
      onStart();
      setTimerFlag(1);
      // console.log("timerFlag: "+value.timerFlag);
      timerFlag=1;
      // console.log(value.setTimerFlag('1'));
      // console.log("timerFlag: "+value.timerFlag);
  // console.log(value.selectedCOB);
        try {
            const response = await fetch('http://localhost:5000/startCob', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "body":
                {
                  cobName:value.selectedCOB//
                }
            }),
            });
            //const responseData = await response.json();
            //console.log(responseData.body);
            if (!response.ok) {
              throw new Error('Failed to edit the record');
            }
          } catch (error) {
            console.error('Error updating data:', error);
          }
    };
   
    return (
        <nav className='navbar'>
          <Link activeClass="active" to="/" spy={true} duration={500} className='logo'>AIO - COB Monitor</Link>
            <nav className='navbarLinks'>
              
                {/* <Link activeClass="active" to="/" spy={true} duration={500} className="ebEodError">EB.EOD.ERROR</Link> */}
                <div className="settingContainer">
                    {/* <Link activeClass="active" spy={true} duration={500} className="setting" onClick={() => setShowMenu(!showMenu)}>Setting</Link> */}
                    {showMenu && (
                        <div className="navSetting">
                            <Link activeClass="active" to="/schedule" className="schedulePage" onClick={() => setShowMenu(false)}>Schedule</Link>
                            <Link activeClass="active" to="/Smtp" className="smtpPage" onClick={() => setShowMenu(false)}>SMTP</Link>
                        </div>
                    )}
                </div>
                <SelectBox onSelect={setSelectedCOB} /> {/* Pass onSelect handler to SelectBox */}
                <button type="submit" className="cobStart" onClick={handleCOBStart}>COB Start</button>

            </nav>
        </nav>
    );
}
 
export default Navbar;


