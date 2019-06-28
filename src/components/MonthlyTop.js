import React from 'react';

export default function MonthlyTop() {
  return (
    <div className="monthly">
      <h3>Top players of the week</h3>
      <ul class="list-group">
        <li className="list-group-item" id="user">Mark<span id="score">123</span></li>
        <li className="list-group-item" id="user">María<span id="score">222</span></li>
        <li className="list-group-item" id="user">Thomas<span id="score">432</span></li>
        <li className="list-group-item" id="user">Cynthia<span id="score">111</span></li>
        <li className="list-group-item" id="user">Sorin<span id="score">223</span></li>
      </ul>
    </div>
  )
}
