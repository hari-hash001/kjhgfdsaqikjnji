// import React, { useState } from 'react'
// import {  useNavigate } from 'react-router-dom';
// import "./Login.css";
// import { Link } from "react-router-dom";


// const LoginSignup = () => {
//     const [login,setLogin]=useState(true);
//     const navigate = useNavigate();

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');

//     const handleClick=()=>{
//         setLogin(!login);
//     }

//     const navigateHome = () => {

//         // Perform login validation
//         if (login) {   
//             try {
//                 if (username.trim() === '') throw  new Error("*Enter the User Name Correctly");    
//                 if(password.trim() === '')  throw new Error("*Enter the password Correctly");
//                 alert("login Successfully");
//                 navigate('/');    
//             } catch (error) {
//                 document.getElementById("loginFeild").innerText=error.message
//             }            
//         } else {   
//             try {           
//                 if (username.trim() === '') throw  new Error("*Enter the User Name Correctly");
//                 if(email.trim() === '') throw new Error("*Enter the Email Correctly");       
//                 if(password.trim() === '')  throw new Error("*Enter the Password Correctly");
//                 alert("Register Successfully");
//                 navigate('/');               
//             } catch (error) {               
//                 document.getElementById("registerFeild").innerText=error.message         
//             }  
//         }
//     };

// return (
//     <div>
//       {login ? (
//         <div className="Container">
//           <div className="headercontainer">
//             <h1 className='header'>Login</h1>
//             <hr className="underscore" />
//             <p id="loginFeild" className="error"></p>
//             <div className="userContainer">
//               <label htmlFor="username">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="userinput"
//                 onChange={(event) => setUsername(event.target.value)}
//                 placeholder="Enter Username..."
//               />
//             </div>
//             <div className="passwordContainer">
//               <label htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="passwordinput"
//                 onChange={(event) => setPassword(event.target.value)}
//                 placeholder="Enter Password..."
//               />
//             </div>
//             <div className="others">
//               <div className='otherbuttons'>
//                 <button className="userbutton" onClick={handleClick}>New User?</button>
//                 <button className="forgotbutton">Forgot Password?</button>
//               </div>
//             </div>
//             <div className="submitContainer">
//               <button
//                 onClick={navigateHome}
//                 type="submit"
//                 className="submitbutton"
//               >
//                 Login
//                 <hr className='underscore'></hr>
//               </button>
//             </div>
//           </div>
//           {/* <iframe src="https://embed.lottiefiles.com/animation/144103" title="login animation"></iframe> */}
//         </div>
//       ) : (
//         <div className="Container">
//           <div className="headercontainer">
//             <h1 className="header">Register</h1>
//             <hr className="underscore" />
//             <p id="registerFeild" className="error"></p>
//             <div className="userContainer">
//               <label htmlFor="username">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="userinput"
//                 onChange={(event) => setUsername(event.target.value)}
//                 placeholder="Enter Username..."
//               />
//             </div>
//             <div className="mailContainer">
//               <label htmlFor="email" className="block text-base mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 id="email"
//                 className="mailinput"
//                 onChange={(event) => setEmail(event.target.value)}
//                 placeholder="Enter Email..."
//               />
//             </div>
//             <div className="passwordContainer">
//               <label htmlFor="password" className="block text-base mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="passwordinput"
//                 onChange={(event) => setPassword(event.target.value)}
//                 placeholder="Enter Password..."
//               />
//             </div>
//             <div className="textdisplay">
//               <div>
//                 {/* <a href="/" className="text-indigo-800 font-semibold" onClick={handleClick}>              
//                 </a>*/}
//                 <Link activeClass="active" to="/" spy={true} duration={500} className="text" >Existing User?</Link>
//               </div>
//             </div>
//             <div className="submitContainer">
//               <button
//                 onClick={navigateHome}
//                 type="submit"
//                 className="submitbutton"
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//           <iframe src="https://embed.lottiefiles.com/animation/144103" title="register animation" className='imageanimation'></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginSignup;



 
import React, { useState, useContext, createContext} from 'react';
import './Login.css'; // Import your CSS file
import aspire from './aspire_logo1.png'
import AIO from './AIOIcon.png';
import bg from './backGround.jpg';
import { Context } from '../../App';
import {  useNavigate } from 'react-router-dom';
// export const LoginContext = createContext();

 
const LoginForm = () => {
  const value = useContext(Context);
  const navigate = useNavigate();
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[isLogIn, setIsLogIn] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    if(username==='aspireCOBAdmin' && password==='123456'){
      setIsLogIn(true);
      value.setIsLoggedIn(true);
      try {
        if (username.trim() === '') throw  new Error("*Enter the User Name Correctly");    
        if(password.trim() === '')  throw new Error("*Enter the password Correctly");
        alert("login Successfully");
        navigate('/');    
    } catch (error) {
        document.getElementById("loginFeild").innerText=error.message
    }  
          alert("Your userName is: "+username);
 
    }
    else {  
      try {          
          if (username.trim() === '') throw  new Error("*Enter the User Name Correctly");
          if(password.trim() === '')  throw new Error("*Enter the Password Correctly");
          alert("Ivalid Login ");
          navigate('/login');              
      } catch (error) {              
          document.getElementById("registerFeild").innerText=error.message        
      }  
  }
  };
  const navigateHome = () => {

    console.log("Going to Home Page");
    if (value.isLoggedIn) {  
        try {
            if (username.trim() === '') throw  new Error("*Enter the User Name Correctly");    
            if(password.trim() === '')  throw new Error("*Enter the password Correctly");
            alert("login Successfully");
            navigate('/');    
        } catch (error) {
            document.getElementById("loginFeild").innerText=error.message
        }            
    } else {  
        try {          
            if (username.trim() === '') throw  new Error("*Enter the User Name Correctly");
            if(password.trim() === '')  throw new Error("*Enter the Password Correctly");
            alert("Ivalid Login ");
            navigate('/login');              
        } catch (error) {              
            document.getElementById("registerFeild").innerText=error.message        
        }  
    }
  };
  return (
    <div className="background">
       {/* <LoginContext.Provider value={{isLogIn, setIsLogIn}}> , password, setPassword, username, setUsername */}
          <img src={bg} alt='BackGround' className='bg'></img>
          <div className="center">
          <img src={AIO} alt='Aspire Logo' className='AIO'></img>
    
            <h2>Login</h2>
            <form onSubmit={handleSubmit} id="myForm">
              <div className="txt_field">
                <input
                  type="text"
                  required
                  name="userName"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span></span>
                <label>Username</label>
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span></span>
                <label>Password</label>
              </div>

              <input type="submit" value="Login"  />
              <div className="signup_link">

              </div>  
            </form>
          </div>
      {/* </LoginContext.Provider> */}

    </div>
  );
}
 
export default LoginForm;