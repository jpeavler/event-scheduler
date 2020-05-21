import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [list, setList] = useState([]);
    const [update, setUpdate] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState('');

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
    const tileContent = ({ date, view }) => {
        console.log("Calendar Comp date: ", date);
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
            let displayPast;
            if(displayDate < Date.now()){
                displayPast = "Past Event: "
            }
            return (
                <div>
                    <h3>{displayPast}{myEvent.name} at {displayHour}:{displayMin}</h3>
                    <p>{myEvent.type}. {myEvent.desc}</p>
                </div>
            )
        })
    }

    const displayCalendar = list.map((myEvent) => {
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
            <div>
                <h3>{displayPast}{myEvent.name} at {displayHour}:{displayMin}</h3>
                <p>{myEvent.type}. {myEvent.desc}</p>
            </div>
        )
    });

    return (
        <Calendar tileContent={tileContent}/>
    )
}

export default CalendarView;