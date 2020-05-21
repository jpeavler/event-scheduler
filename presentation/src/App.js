import React from 'react';

import './App.css';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';

function App() {
  return (
    <div className="App">
      <ListView/>
      <CalendarView/>
    </div>
  );
}

export default App;
