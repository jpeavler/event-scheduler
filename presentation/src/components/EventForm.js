import React, {useState, useEffect} from 'react';

const EventForm = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');   //Stores Month, Day, and Year
    const [time, setTime] = useState('');   //Stores Hour, Minutes, and Seconds
    const [type, setType] = useState('');



    return (
        <form>
            <input placeholder="Event Name" value={name} type="text" onChange={({target}) => setName(target.value)}/>
            <textarea placeholder="Event Description" value={desc} type="text" onChange={({target}) => setDesc(target.value)}/>
            <input placeholder="" value={date} type="date" onChange={({target}) => setDate(target.value)}/>
            <input placeholder="" value={time} type="time" onChange={({target}) => setTime(target.value)}/>
            <label for="type">Event Type:</label>
            <select value={type} id="type" onChange={({target}) => setType(target.value)}>
                <option value= "Appointment">Appointment</option>
                <option value= "Meeting">Meeting</option>
                <option value= "Reminder">Reminder</option>
            </select>
            <input value="Add Event" type="submit"/>
        </form>
    )
}

export default EventForm;
