import React from 'react';
 
const MailButton = () => {
  const handleEmailButtonClick = async () => {
    console.log("button enabled");
    try {
      const response = await fetch('http://localhost:5000/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: 'hh6995161@gmail.com'
        })
      });
      console.log(response);
      if (!response.ok) {
        alert("mail not sent");
      }
      else{
        alert("mail sent successfully");
      }
 
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
 
  return (
    <div>
      <button onClick={handleEmailButtonClick}>Send Email</button>
    </div>
  );
};
 
export default MailButton;
 