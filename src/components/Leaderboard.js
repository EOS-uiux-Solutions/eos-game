import React from 'react';
import AllTimeTop from './AllTimeTop';
import MonthlyTop from './MonthlyTop';

export default function Leaderboard() {
  return (
    <div className="leaderboard">
      <div className="row">
        <AllTimeTop />
        <MonthlyTop />
      </div>
      <h3 className="btn-more">show more</h3>
    </div>
  )
}
