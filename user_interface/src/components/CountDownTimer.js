import React, { useState, useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';

function CountDownTimer({ endTime, onTimerEnd }) {
    const [time, setTime] = useState(1000);
    const timerEnded = useRef(false);

    useEffect(() => {
        const timeLeft = () => {
            return Math.max(
                new Date(parseFloat(endTime)).getTime() - Date.now(),
                0
            );
        };

        timerEnded.current = false;
        setTime(timeLeft());

        const countDown = setInterval(() => {
            const remainingTime = timeLeft();
            setTime(remainingTime);

            if (remainingTime <= 0 && !timerEnded.current) {
                timerEnded.current = true;
                onTimerEnd();
                clearInterval(countDown);
            }
        }, [1000]);

        return () => {
            clearInterval(countDown);
        };
    }, [endTime]);

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        if (milliseconds <= 0) return ['00', '00', '00'];

        return [formattedHours, formattedMinutes, formattedSeconds]; //`${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <>
            <ListGroup horizontal as="div">
                <ListGroup.Item variant="info" active className="me-1">
                    {formatTime(time)[0]}
                </ListGroup.Item>
                <ListGroup.Item active variant="info" className="me-1">
                    {formatTime(time)[1]}
                </ListGroup.Item>
                <ListGroup.Item active variant="danger">
                    {formatTime(time)[2]}
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}

export default CountDownTimer;
