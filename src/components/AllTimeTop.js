import React from 'react';

export default function AllTimeTop() {
  return (
    <div className="all-time">
      <h3>All time top players</h3>
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
        // <li class="list-group-item">Cras justo odio<span>score</span></li>
        // <li class="list-group-item">Dapibus ac facilisis in<span>score</span></li>
        // <li class="list-group-item">Morbi leo risus<span>score</span></li>
        // <li class="list-group-item">Porta ac consectetur ac<span>score</span></li>
        // <li class="list-group-item">Vestibulum at eros<span>score</span></li>