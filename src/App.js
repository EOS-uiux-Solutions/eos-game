import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

function App() {

  const info = require('./players.json');
  const [count, setCount] = useState(info);

  console.log(count);


  return (
    <div className="container">
      <Game />
      <Leaderboard />
    </div>
  );
}


export default App;
