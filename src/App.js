import React from 'react';
import './App.css';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <Game />
        <Leaderboard />
      </div>
    );
  }
}

export default App;
