import React, { useState, useEffect } from 'react';
import { formatTime } from '../common/utils';

function Timer({onChange}) {
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [studySessions, setStudySessions] = useState([]);


  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };


  const startTimer = () => {
    const confirmation = window.confirm('Do you want to start your timer?');
    if (confirmation) {
      setStartTime(new Date());
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      const confirmation = window.confirm('Do you want to stop your timer?');
      if (confirmation) {
        setIsRunning(false);
        const currentTime = new Date();
        const differenceInSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(differenceInSeconds);
        storeStudySession(differenceInSeconds); // Call storeStudySession here
        showCongratulations();
        const newStudySession = {
          date: new Date().toLocaleDateString(), // Use the same format as in StudyCalendar
          time: elapsedTime,
        };
        onChange(newStudySession);
      }
    }
  };

  const storeStudySession = (elapsedTime) => {
    const newStudySession = {
      date: new Date().toLocaleDateString(), // Use the same format as in StudyCalendar
      time: elapsedTime,
    };
    setStudySessions([...studySessions, newStudySession]);
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

  


  return (
    <div className="timer-container">
      <button
        className={`timer-button ${isRunning ? 'running' : ''}`}
        onClick={toggleTimer}
      >
        <p className="btntxt">Working Time: {isRunning && <span className="timer-display">{formatTime(elapsedTime)}</span>}</p>
      </button>
      
    </div>
  );
}

export default Timer;

