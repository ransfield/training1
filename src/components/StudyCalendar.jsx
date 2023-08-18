import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { formatTime } from '../common/utils';

function StudyCalendar({ studySessions, onDateClick }) {
  const tileContent = ({ date }) => {
    console.log('date:', date);
    const studyDate = date.toLocaleDateString();
    const studySession = studySessions.find((session) => session.date === studyDate);
    const studyTime = studySession ? formatTime(parseInt(studySession.time)) : null;

    return (
      <div className="calendar-tile">
        {studyTime && <div className="study-time">{studyTime}</div>}
        <div className="studied-marker">{studySession ? '📚' : null}</div>
      </div>
    );
  };

  return <Calendar value={new Date()} onClickDay={onDateClick} tileContent={tileContent} />;
}

export default StudyCalendar;