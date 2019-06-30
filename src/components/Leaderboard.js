import React from 'react';
import TopPlayers from './TopPlayers';

export default function Leaderboard(props) {
  const allTime = props.leaders.topScore.allTime;
  const lastMonth = props.leaders.topScore.lastMonth;
  return (
    <div className="leaderboard">
      <div className="row">
        <TopPlayers leaders={allTime} title="All time top players"/>
        <TopPlayers leaders={lastMonth} title="Last month top players"/>
      </div>
      <h3 className="btn-more">show more</h3>
    </div>
  )
}
