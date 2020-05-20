import React, {useState, useEffect} from 'react';
import EventForm from './EventForm'

const ListView = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/scheduler`)
            .then(response => response.json())
            .then(list => setList(list))
    }
    const displayList = list.map((event) => {
        const displayDate = new Date(event.date);
        let midday = "AM";
        let displayHour = displayDate.getHours();
        if (parseInt(displayHour) > 12) {           //Converts military time to actual time
            displayHour = parseInt(displayHour) - 12;
            midday = "PM";
        }
        let displayMin = displayDate.getMinutes(); 
        if (parseInt(displayMin) < 10){             //Ensures that minute display is always 2 digits
            displayMin = '0'.concat(displayMin);
        }
        return (
            <>
                <h3>{event.name}- {displayDate.toDateString()} at {displayHour}:{displayMin}{midday}</h3> 
                <button>Edit</button>
                <button>Delete</button> 
                <p>{event.type}. {event.desc}</p>
            </>
        )
    })
    return (
        <div className="listview">
            <EventForm/>
            {displayList}
        </div>
    )
}

export default ListView;