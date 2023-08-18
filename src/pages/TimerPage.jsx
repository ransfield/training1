import React, { useState } from 'react';
import './TimerPage.css';
import Timer from '../components/Timer';
import StudyCalendar from '../components/StudyCalendar';
import SessionList from '../components/SessionList';
import DebugInfo from '../components/DebugInfo';

function TimerPage() {
    const [studySessions, setStudySessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const calculateTotalStudyTime = (date) => {
        const selectedDay = date.toLocaleDateString();
        const totalStudyTime = studySessions
            .filter((session) => session.date === selectedDay)
            .reduce((total, session) => total + session.time, 0);
        return totalStudyTime;
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Training Friday, 18th August</h1>
            </header>
            <main>
                <Timer onChange={(elapsedTime) => {
                    console.log('Elapsed Time:', elapsedTime);
                    setStudySessions([...studySessions, elapsedTime]);
                }} />
            </main>
            <footer className="footer">
                <StudyCalendar studySessions={studySessions} onDateClick={handleDateClick} />
                {selectedDate && (
                    <p>Total study time for {selectedDate.toLocaleDateString()}: {calculateTotalStudyTime(selectedDate)} seconds</p>
                )}
                <SessionList sessions={studySessions}>ß</SessionList>
            </footer>
        </div>
    );
}

export default TimerPage;