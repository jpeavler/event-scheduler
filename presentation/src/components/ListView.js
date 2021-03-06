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
    const displayList = list.map((myEvent) => {
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
            <div key={myEvent._id} className="event">
                
                <h3>{displayPast}{myEvent.name}- {displayDate.toDateString()} at {displayHour}:{displayMin}{midday}</h3> 
                <button onClick={() => handleUpdate(myEvent)}>Edit</button>
                <button onClick={() => handleDelete(myEvent._id)}>Delete</button> 
                <p>{myEvent.type}. {myEvent.desc}</p>
            </div>
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