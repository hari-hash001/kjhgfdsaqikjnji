import './smtp.css';
import React, { useState } from 'react';
 
const Smtp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [host, setHost] = useState('');
 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
 
  const handleHostChange = (event) => {
    setHost(event.target.value);
  };
 
  return (
    <div className="smtp">
      <h1 className='smtpheader'>SmtpPage</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="host">Host:</label>
        <input
          type="text"
          id="host"
          value={host}
          onChange={handleHostChange}
        />
      </div>
    </div>
  );
};
 
export default Smtp;