
import React from 'react';

import './styles/Header.css';

export default function Header() {
  return (
    <div className='header-container'>
        <div className='header-title'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHZ-xWd_s6CsSQcTb958dEIxk0tD35C1-UQ&s" alt="" />
            <h2>History.com</h2>
        </div>
        <nav>
            <a href="">Home</a>
            <a href="">Content</a>
            <a href="">Contact</a>
            <a href="">Extra</a>
        </nav>
    </div>
  )
}
