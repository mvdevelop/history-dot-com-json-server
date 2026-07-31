import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className='header-container'>
      <div className='header-title'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHZ-xWd_s6CsSQcTb958dEIxk0tD35C1-UQ&s" alt="" />
        <h2>History.com</h2>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/content">Content</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/extra">Extra</Link>
        <Link to="/add">Add Content</Link>
      </nav>
    </div>
  );
};

export default Header;