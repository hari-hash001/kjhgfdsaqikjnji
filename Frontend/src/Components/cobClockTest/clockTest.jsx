// import TimeStarter from '../timeStater/TimeStarter';
import './cobClocktest.css';
import React, { useState, useEffect } from 'react';

const Clocktest = ({ timerFlag }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    let timer;

    useEffect(() => {
        if (timerFlag === 1) {
            startClock();
        }
    }, [timerFlag]);

    const startClock = () => {
        if (!isPaused) {
            timer = setInterval(() => {
                setElapsedTime(prevElapsedTime => prevElapsedTime + 1000);
            }, 1000);
        }
    };


    const stopClock = () => {
        clearInterval(timer);
        setIsPaused(true);
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
                    <h1>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</h1>
                    <button className="stop" onClick={stopClock}>Stop</button>

                </div>
            </div>
        </div>
    );
};



export default Clocktest;