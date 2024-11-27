import React, { useState, useEffect } from 'react';

function CountDownTimer({ duration }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const endTime = Date.now() + duration;
        localStorage.setItem('endtime', endTime);
        setTime(localStorage.getItem('endtime'));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1000);
        }, 1000);
    }, [time]);

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours =
            hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    }

    return <div>{formatTime(time)}</div>;
}

export default CountDownTimer;
