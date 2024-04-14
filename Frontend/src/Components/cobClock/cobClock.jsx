import './cobClock.css';
import React, { useState, useEffect } from 'react';
 
const CobClock = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    let timer;
 
    useEffect(() => {
        startClock();
        return stopClock;
    }, []);
 
    const startClock = () => {
        if (!isPaused) {
            timer = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
            }, 1000);
        }
    };
 
    const stopClock = () => {
        clearInterval(timer);
    };
 
    const pauseClock = () => {
        setIsPaused(true);
        clearInterval(timer);
    };
 
    const resumeClock = () => {
        setIsPaused(false);
        startClock();
    };
 
    const restartClock = () => {
        setElapsedTime(0);
        setIsPaused(false);
    };
 
    const formatTime = (time) => {
        return time < 10 ? "0" + time : time;
    };
 
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
 
    return (
        <div className="clock">
            <div className='container'>
                <div className='clockContainer'>
                    <h1>Timer</h1>
                    <h1>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</h1>
                    <button className="start" onClick={startClock}>Start</button>
                    <button className="pause" onClick={pauseClock}>Pause</button>
                    <button className="resume" onClick={resumeClock}>Resume</button>
                    <button className="restart" onClick={restartClock}>Restart</button>
                </div>
            </div>
        </div>
    );
};
 
export default CobClock;