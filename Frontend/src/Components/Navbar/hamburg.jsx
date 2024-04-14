import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 
import Packer from '../packer/Packer';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button className={`menu-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
        <div className="menu-bar"></div>
      </button>
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
      <nav className={`menu-items ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/eod-error">EOD Error</Link></li>
          <li><Link to="#">Services</Link></li>
          <li><Link to="#">Contact</Link></li>
        </ul>
      </nav>
      <Packer/>
    </div>
  );
};

export default HamburgerMenu;
