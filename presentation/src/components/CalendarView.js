import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import EventForm from './EventForm'

const CalendarView = () => {
    const [list, setList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState('');
    const [dateClicked, setDateClicked] = useState('');

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/scheduler`)
            .then(response => response.json())
            .then(list => setList(list))
            .then(setUpdate(false))
            .then(setEventToUpdate(''))
    }
    const handleUpdate = (eventUp) => {
        setEventToUpdate(eventUp);
        setUpdate(true);
    }
    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/scheduler/${id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(getList)
    }
    const tileContent = ({ date, view }) => {
        let calDate = new Date(date);
        let eventDays = list.filter(event => {
            let tempDate = new Date(event.date);
            return tempDate.getFullYear() == calDate.getFullYear() 
                && tempDate.getMonth() == calDate.getMonth()
                && tempDate.getDate() == calDate.getDate()
        });
        return eventDays.map((myEvent) => {
            const displayDate = new Date(myEvent.date);
            let midday = "AM";
            let displayHour = displayDate.getHours();
            if (parseInt(displayHour) >= 12) {           //Converts military time to actual time
                midday = "PM";
            }
            if (parseInt(displayHour) > 12) {
                displayHour = parseInt(displayHour) - 12;
            }
            if (parseInt(displayHour) == 0) {
                displayHour = parseInt(displayHour) + 12;
            }
            let displayMin = displayDate.getMinutes(); 
            if (parseInt(displayMin) < 10){             //Ensures that minute display is always 2 digits
                displayMin = '0'.concat(displayMin);
            }
            return (
                <div key={myEvent._id}  className="Event">
                   {displayHour}:{displayMin}{midday}
                </div>
            )
        });
    }
    const tileClassName = ({date, view}) => {
        let calDate = new Date(date);
        let eventDays = list.filter(event => {
            let tempDate = new Date(event.date);
            return tempDate.getFullYear() == calDate.getFullYear()
                && tempDate.getMonth() == calDate.getMonth()
                && tempDate.getDate() == calDate.getDate()               
        });
        return eventDays.length ? 'EventDays' : null;
    }
    let dateEventDisplay;
    if(dateClicked) {
        let clickedDate = new Date(dateClicked);
        let eventOnClickedDay = list.filter(event => {
            let tempDate = new Date(event.date);
            return tempDate.getFullYear() == clickedDate.getFullYear() 
                && tempDate.getMonth() == clickedDate.getMonth()
                && tempDate.getDate() == clickedDate.getDate()

        });
        dateEventDisplay = eventOnClickedDay.map((myEvent) => {
                const displayDate = new Date(myEvent.date);
                let midday = "AM";
                let displayHour = displayDate.getHours();
                if (parseInt(displayHour) >= 12) {           //Converts military time to actual time
                    midday = "PM";
                }
                if (parseInt(displayHour) > 12) {
                    displayHour = parseInt(displayHour) - 12;
                }
                if (parseInt(displayHour) == 0) {
                    displayHour = parseInt(displayHour) + 12;
                }
                let displayMin = displayDate.getMinutes(); 
                if (parseInt(displayMin) < 10){             //Ensures that minute display is always 2 digits
                    displayMin = '0'.concat(displayMin);
                }
                let displayPast;
                if(displayDate < Date.now()){
                    displayPast = "Past Event: "
                }
                return (
                    <div key={myEvent._id}>
                        <h4>{displayPast}{myEvent.name} at {displayHour}:{displayMin}{midday}</h4>
                        <button className='myButton' 
                            onClick={() => handleUpdate(myEvent)}>Edit</button>
                        <button className='myButton' 
                            onClick={() => handleDelete(myEvent._id)}>Delete</button> 
                        <p>{myEvent.type}. {myEvent.desc}</p>
                    </div>
                )
        });
        if(eventOnClickedDay.length == 0){
            dateEventDisplay = <div key= "empty">No events for this date</div>
        }
    } else {
        dateEventDisplay = <div key="nodate">Select a date for its event content</div>
    }
    const onClickDay = (value, event) => {
        setDateClicked(new Date(value));
    }
    
    let renderForm;
    if(update) {
        renderForm = <EventForm key={eventToUpdate._id} 
            isUpdate={update} refresh={getList} 
            myEvent ={eventToUpdate} 
            id={eventToUpdate._id}/>
    } else {
        renderForm = <EventForm key="Create" 
            isUpdate={update} refresh={getList}/>
    }

    return (
        <div className="calview">
            <Calendar tileContent={tileContent} 
                onClickDay={onClickDay} 
                className="myCalendar" 
                tileClassName={tileClassName}/>
            {renderForm}
            <h3>Events for Selected Date {dateClicked.toString().slice(0,15)}</h3>
            {dateEventDisplay}
        </div>
    )
}

export default CalendarView;