import React, {useState} from 'react';

const EventForm = ({refresh, myEvent, id}) => {
    let formName = "";
    let formDesc = "";
    let formDate = "";
    let formTime = "";
    let formType = "Appointment";
    if(myEvent){               //if I want an update form instead of an add form, I want to plug in the initial values
        formName = myEvent.name;
        formDesc = myEvent.desc;
        formDate = myEvent.date.slice(0, 10);
        let tempDate = new Date(myEvent.date);
        let tempHour = tempDate.getHours();     //the time input expects 12:00AM to be 00:00
        let tempMin = tempDate.getMinutes();
        if(tempHour < 10) {
            tempHour = '0' + tempHour;
        }
        if(tempMin < 10) {
            tempMin = '0' + tempMin;
        }
        formTime = tempHour + ":" + tempMin;
        formType = myEvent.type;
    }
    const [name, setName] = useState(formName);
    const [desc, setDesc] = useState(formDesc);
    const [date, setDate] = useState(formDate);   //Stores Month, Day, and Year
    const [time, setTime] = useState(formTime);   //Stores Hour, Minutes, and AM/PM
    const [type, setType] = useState(formType);

    const handleSubmit = (e) => {           //While I usually spell out event, I don't here because of event becoming overloaded
        e.preventDefault();
        const archived = false;
        const fullDate = new Date(date);
        fullDate.setDate(fullDate.getDate() + 1);   //have to add one to date since date value captured by form starts at index 0
        fullDate.setHours(time.slice(0, 2));
        fullDate.setMinutes(time.slice(3, 5));
        if(myEvent) {
            const updatedEvent = {name, desc, date: fullDate, type, archived}
            fetch(`${process.env.REACT_APP_API_URL}/api/scheduler/${id}`, {
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(updatedEvent)
            }).then(() => setName(''))
            .then(() => setDesc(''))
            .then(() => setDate(''))
            .then(() => setTime(''))
            .then(() => setType(''))
            .then(() => refresh())
        }else {
            const addedEvent = {name, desc, date: fullDate, type, archived};
            fetch(`${process.env.REACT_APP_API_URL}/api/scheduler`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(addedEvent)
            }).then(() => setName(''))
                .then(() => setDesc(''))
                .then(() => setDate(''))
                .then(() => setTime(''))
                .then(() => setType(''))
                .then(() => refresh())
        }
    }
    let renderSubmit;
    let cancel;
    if(myEvent){
        renderSubmit = <input key="Edit" value="Edit Event" type="submit"/>
        cancel = <button type="button" key="cancel" 
                onClick={() => refresh()}>Cancel Edit</button>
    } else {
        renderSubmit = <input key="Add" value="Add Event" type="submit"/>
    }
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Event Name" value={name} type="text" 
                onChange={({target}) => setName(target.value)} required/>
            <textarea placeholder="Event Description" value={desc} type="text" 
                onChange={({target}) => setDesc(target.value)}/>
            <label htmlFor="date">Event Date:</label>
            <input value={date} id="date" type="date" 
                onChange={({target}) => setDate(target.value)} required/>
            <label htmlFor="date">Event Time:</label>
            <input value={time} id= "time" type="time" 
                onChange={({target}) => setTime(target.value)} required/>
            <label htmlFor="type">Event Type:</label>
            <select value={type} id="type" 
                onChange={({target}) => setType(target.value)}>
                <option value= "Appointment">Appointment</option>
                <option value= "Meeting">Meeting</option>
                <option value= "Reminder">Reminder</option>
            </select>
            {renderSubmit}
            {cancel}
        </form>
    )
}

export default EventForm;
