import React from 'react';

export default function TopPlayers(props) {

  function displayLeaders(leaders) {  
    //1. Order the users by score.
    const allUsers = leaders.sort((a, b) => (b.score - a.score));
    //2. Keep just the first five users.
    const firstFiveUsers = [];
    for (let i = 0; i < 5; i++) {
      firstFiveUsers.push(allUsers[i])      
    }
    //3. Display dynamically the first users using JSX
    const users = firstFiveUsers.map((user) => (
      <li className="list-group-item" key={user.name} id="user">
        {user.name}
        <span id="score">
          {user.score}
        </span>
      </li>
    ));    
    return <ul className="list-group">{users}</ul>  
  }

  return (
    <div className="all-time">
      <h3>{props.title}</h3>
        {
          displayLeaders(props.leaders)
        }
    </div>
  )
}