import React, { createContext, useState } from 'react';

// Create a context for managing the timerFlag state
export const TimerFlagContext = createContext();

// Provide the context value to child components
export const TimerFlagProvider = ({ children }) => {
  const [timerFlag, setTimerFlag] = useState(0);

  const startTimerFlag = () => {
    console.log("Inside button....");
    setTimerFlag(1);
  };

  return (
    <TimerFlagContext.Provider value={{ timerFlag, startTimerFlag }}>
      {children}
    </TimerFlagContext.Provider>
  );
};