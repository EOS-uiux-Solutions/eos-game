import React from 'react';
import Leaders from './Leaders';

export default function TopPlayers(props) {

  return (
    <div className="all-time">
      <h3>{props.title}</h3>
          <Leaders leaders={props.leaders}/>
    </div>
  )
}