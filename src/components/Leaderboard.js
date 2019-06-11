import React from 'react';
import AllTimeTop from './AllTimeTop';
import MonthlyTop from './MonthlyTop';

export default function Leaderboard() {
  return (
    <div className="leaderboard">
      <AllTimeTop />
      <MonthlyTop />
    </div>
  )
}
