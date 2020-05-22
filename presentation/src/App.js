import React, {useState} from 'react';

import './stylesheets/App.css';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';

const App = () => {
  const [isCalView, setCalView] = useState(true);
  let toggleViewButton;
  let view;
  if(isCalView) {
    view = <CalendarView/>
    toggleViewButton = <button className='myButton' 
      onClick={() => setCalView(false)}>Switch to List View</button>
  } else {
    view = <ListView/>
    toggleViewButton = <button className='myButton' 
      onClick={() => setCalView(true)}>Switch to Calendar View</button>
  }
  return (
    <div className="App">
      <h1>Event Scheduler</h1>
      {toggleViewButton}
      {view}
    </div>
  );
}

export default App;
