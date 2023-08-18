import React, { useState, useEffect } from 'react';

function Timer() {
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startTimer = () => {
    if (!isRunning) {
      const confirmation = window.confirm('Do you want to start your timer?');
      if (confirmation) {
        setStartTime(new Date());
        setIsRunning(true);
      }
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      const confirmation = window.confirm('Do you want to stop your timer?');
      if (confirmation) {
        setIsRunning(false);
        showCongratulations();
      }
    }
  };

  const showCongratulations = () => {
    const studyDuration = formatTime(elapsedTime);
    window.alert(`Congratulations! You've been studying for ${studyDuration}. Keep up the good work!`);
  };

  useEffect(() => {
    let timerInterval = null;

    if (isRunning) {
      timerInterval = setInterval(updateElapsedTime, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  const updateElapsedTime = () => {
    if (startTime) {
      const currentTime = new Date();
      const differenceInSeconds = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(differenceInSeconds);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  return (
    <div className="timer-container">
      <button
        className={`timer-button ${isRunning ? 'running' : ''}`}
        onClick={isRunning ? stopTimer : startTimer}
      >
        {isRunning ? (
          <span>
            Working Time: <span className="timer-display">{formatTime(elapsedTime)}</span>
          </span>
        ) : (
        'Working Time'
        )}
      </button>
    </div>
  );
}

export default Timer;