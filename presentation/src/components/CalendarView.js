import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import '../stylesheets/MyCalendar.css';

const CalendarView = () => {
    const [list, setList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState('');

    const getList = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/scheduler`)
            .then(response => response.json())
            .then(list => setList(list))
            .then(setUpdate(false))
            .then(setEventToUpdate(''))
    }
    const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Sunday!</p> : null;
    return (
        <Calendar tileContent={tileContent}/>
    )
}

export default CalendarView;