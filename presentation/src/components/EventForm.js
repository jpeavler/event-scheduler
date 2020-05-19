import React, {useState} from 'react';

const EventForm = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');   //Stores Month, Day, and Year
    const [time, setTime] = useState('');   //Stores Hour, Minutes, and AM/PM
    const [type, setType] = useState('');

    const handleSubmit = (e) => {           //While I usually spell out event, I don't here because of event becoming overloaded
        e.preventDefault();
        const archived = false;
        const fullDate = new Date(date);
        console.log("Time: ", time);
        fullDate.setDate(fullDate.getDate() + 1);   //have to add one to date since date value captured by form starts at index 0
        fullDate.setHours(time.slice(0, 2));
        fullDate.setMinutes(time.slice(3, 5));
        console.log('stringed date', fullDate.toString());
        const addedEvent = {name, desc, date: fullDate, type, archived};
        console.log("New Event: ", addedEvent);
        fetch(`${process.env.REACT_APP_API_URL}/api/scheduler`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(addedEvent)
        }).then(() => setName(''))
            .then(() => setDesc(''))
            .then(() => setDate(''))
            .then(() => setTime(''))
            .then(() => setType(''));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Event Name" value={name} type="text" 
                onChange={({target}) => setName(target.value)}/>
            <textarea placeholder="Event Description" value={desc} type="text" 
                onChange={({target}) => setDesc(target.value)}/>
            <label htmlFor="date">Event Date:</label>
            <input value={date} id="date" type="date" 
                onChange={({target}) => setDate(target.value)}/>
            <label htmlFor="date">Event Time:</label>
            <input value={time} id= "time" type="time" 
                onChange={({target}) => setTime(target.value)}/>
            <label htmlFor="type">Event Type:</label>
            <select value={type} id="type" 
                onChange={({target}) => setType(target.value)}>
                <option value= "Appointment">Appointment</option>
                <option value= "Meeting">Meeting</option>
                <option value= "Reminder">Reminder</option>
            </select>
            <input value="Add Event" type="submit"/>
        </form>
    )
}

export default EventForm;
