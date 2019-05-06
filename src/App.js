import React from 'react';
import logo from './logo.svg';
import Board from './components/board';
import './App.css';


// will use redux
// will use react bootstrap
// Sidebar with move-by move readout
//// able to download or send it to an email address

////stretch Goals:
/////////////////////////////////
// login with backend
// play against ME!
// each person gets an email when another play made a move


function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
