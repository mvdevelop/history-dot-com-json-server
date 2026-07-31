import React, { useState, useEffect } from 'react';
import { Content } from '../types/content.types';
import { User } from '../types/user.types';
import './styles/Content.css';

const Content: React.FC = () => {
  const [contentData, setContentData] = useState<Content[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/content')
      .then(response => response.json())
      .then((data: Content[]) => setContentData(data))
      .catch(error => console.error('Error fetching content:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className='content-container'>
      <h1>Content</h1>
      <ul>
        {contentData.map(item => (
          <li key={item.id}>
            <img src={item.img} alt={item.title} />
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
            <img src={item.img} alt={item.name} />
            <div>
              <h2>{item.name}</h2>
              <p>{item.ocupation}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;