import React from 'react';

export default function (props) {  
  //1. Order the users by score.
  const allUsers = props.leaders.sort((a, b) => (b.score - a.score));
  //2. Keep just the first five users.
  const firstFiveUsers = [];
  for (let i = 0; i < 5; i++) {
    firstFiveUsers.push(allUsers[i])      
  }
  //3. Display dynamically the first users using JSX
  const users = firstFiveUsers.map((user) => (
    <li className="list-group-item user" key={user.name} >
      {user.name}
      <span className="score">
        {user.score}
      </span>
    </li>
  ));    

  return <ul className="list-group">{users}</ul>  
}
