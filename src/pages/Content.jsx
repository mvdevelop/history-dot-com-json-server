
import React from 'react';
import { useState, useEffect } from 'react';

import './styles/Content.css';

export default function Content() {
  const [dados, setDados] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/content')
      .then(response => response.json())
      .then(data => setDados(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);
    
  return (
    <div className='content-container'>
        <h1>Content</h1>
        <ul>
            {dados.map(item => (
            <li key={item.id}>
                <img src={item.img} alt="" />
                <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </div>
            </li>
            ))}
        </ul>
        <ul className='p-5'>
            {users.map(item => (
            <li key={item.id}>
                <img src={item.img} alt="" />
                <div>
                    <h2>{item.name}</h2>
                    <p>{item.ocupation}</p>
                </div>
            </li>
            ))}
        </ul>
    </div>
  )
}
