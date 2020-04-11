import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from './firebase'

import Stores from './components/stores'
import AddFormEntry from './components/add-store'
import { firestore } from 'firebase';

// firebase
//   .firestore()
//   .collection('stores')
//   .add({
//     name
//   })

function App() {
  return (
    <div className="App">
      <div>
        <h1>Delvr.xyz</h1>
        <h3>List delivery services that delivery to you!</h3>
        <Stores />
        <AddFormEntry />
      </div>
    </div>
  );
}

export default App;
