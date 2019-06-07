import React from 'react';
import AllTimeTop from './AllTimeTop';
import MonthlyTop from './MonthlyTop';

export default function Leaderboard() {
  return (
    <div class="leaderboard">
      <AllTimeTop />
      <MonthlyTop />
    </div>
  )
}
