import React, {useState, useEffect} from 'react';
import EventForm from './EventForm'

const ListView = () => {
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
    }
    const handleUpdate = (eventUp) => {
        setEventToUpdate(eventUp);
        setUpdate(true);
    }
    console.log("Update Form rendered:", update);
    console.log("Event to Update:", eventToUpdate);

    const displayList = list.map((myEvent) => {
        const displayDate = new Date(myEvent.date);
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
                <h3>{myEvent.name}- {displayDate.toDateString()} at {displayHour}:{displayMin}{midday}</h3> 
                <button onClick={() => handleUpdate(myEvent)}>Edit</button>
                <button>Delete</button> 
                <p>{myEvent.type}. {myEvent.desc}</p>
            </>
        )
    });

    let renderForm;
    if(update) {
        renderForm = <EventForm key={eventToUpdate._id} isUpdate={update} refresh={getList} myEvent ={eventToUpdate} id={eventToUpdate._id}/>
    } else {
        renderForm = <EventForm key="Create" isUpdate={update} refresh={getList}/>
    }
    return (
        <div className="listview">
            {renderForm}
            {displayList}
        </div>
    )
}

export default ListView;