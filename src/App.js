import React from 'react';
import './App.css';

import firebase from './firebase'

import Stores from './components/stores'
import AddFormEntry from './components/add-store'
import { firestore } from 'firebase';

function App() {
  return (
    <div className="App">
      <div>
        <h1>🚚 Delvr</h1>
        <h3>List delivery services that delivery to you!</h3>
        <Stores />
        <AddFormEntry />
      </div>
    </div>
  );
}

export default App;
