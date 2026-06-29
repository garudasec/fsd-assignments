import { useState, useEffect, useRef } from "react";
import "./Timer.css";

function Timer() {
  // Initial timer value (1 Hour, 1 Minute, 10 Seconds)
  const [time, setTime] = useState(3670);

  // Stores interval ID
  const timerRef = useRef(null);

  // Add leading zero if number is less than 10
  const getValue = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  // Convert seconds into HH:MM:SS
  const displayTime = (seconds) => {
    const sec = seconds % 60;
    const min = Math.floor((seconds % 3600) / 60);
    const hr = Math.floor(seconds / 3600);

    return `${getValue(hr)}:${getValue(min)}:${getValue(sec)}`;
  };

  // Start Timer
  const startTimer = () => {
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);
  };

  // Stop Timer
  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // Reset Timer
  const resetTimer = () => {
    stopTimer();
    setTime(3670);
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="timer-container">
      <h1>{displayTime(time)}</h1>

      <div className="buttons">
        <button onClick={startTimer}>Start Timer</button>

        <button onClick={stopTimer}>Stop Timer</button>

        <button onClick={resetTimer}>Reset Timer</button>
      </div>
    </div>
  );
}

export default Timer;