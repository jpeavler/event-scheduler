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
        const displayHour = displayDate.getHours();
        const displayMin = displayDate.getMinutes();
        return (
            <>
                <h3>{event.name}</h3>
                <ul>    
                    <li>{event.desc}</li>
                    <li>{displayDate.toDateString()}</li>
                    <li>{displayHour}:{displayMin}</li>
                    <li>{event.type}</li>
                    <li>{event.archived}</li>
                </ul>
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