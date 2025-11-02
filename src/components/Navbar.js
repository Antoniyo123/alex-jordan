import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Update scrolled state untuk backdrop blur effect
      setScrolled(currentScrollPos > 50);
      
      // Menentukan visibility navbar
      setVisible(
        (prevScrollPos > currentScrollPos) || 
        currentScrollPos < 10
      );
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}
    >
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-text">Alex J</span>
          <span className="logo-dot"></span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              <span className="link-number">01</span>
              <span className="link-text">Home</span>
            </Link>
            <Link to="/projects" className="nav-link" onClick={closeMenu}>
              <span className="link-number">02</span>
              <span className="link-text">Projects</span>
            </Link>
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              <span className="link-number">03</span>
              <span className="link-text">About</span>
            </Link>
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              <span className="link-number">04</span>
              <span className="link-text">Contact</span>
            </Link>
          </div>
        </div>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;