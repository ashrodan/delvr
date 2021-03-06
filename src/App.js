import React from 'react';
import './App.css';

// import Stores from './components/stores'
import StoresTable from './components/stores-table'
import TitlebarGridList from './components/stores-tile'
import AddFormEntry from './components/add-store'


function App() {
  return (
    <div className="App">
      <div>
        <h1>🚚 Delvr</h1>
        <h3 className='subtitle'>Find stores that deliver to you!</h3>
        <p>Lets find those favourite stores that are delivering, bread, fish, x,y,z to you.</p>
        <br />
        <TitlebarGridList />
        <br />
        <AddFormEntry />
      </div>
    </div>
  );
}

export default App;
