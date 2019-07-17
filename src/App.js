import React, { useState, useEffect } from 'react';

import './App.css';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

const info = require('./players.json');

function App() {

  const [leaders, setLeaders] = useState(info);

  //There is a warning showed in console about 'setLeaders', I will use that later for update the local state. 
  useEffect(() => {
    //I will use this hook later, do not delete it!
    // console.log(leaders.topScore.allTime);
    // console.log(leaders.topScore.lastMonth);

  });


  return (
    <div className="container">
      <Game />
      <Leaderboard leaders={leaders}/>
    </div>
  );
}


export default App;
