import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../Styles/Navbar.css';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Menentukan arah scroll dan visibility navbar
      setVisible(
        (prevScrollPos > currentScrollPos) || // Scrolling ke atas
        currentScrollPos < 10 // Di bagian paling atas halaman
      );
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className="navbar" 
      style={{ 
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className="navbar-container">
      <Link to="/" className="logo">
    Alex J
  </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/projects" onClick={toggleMenu}>Project</Link>
          <Link to="/about" onClick={toggleMenu}>About Me</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'change' : ''}`} ></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;