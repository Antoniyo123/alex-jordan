import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll behavior
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('menu-open');
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('menu-open');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Close menu on window resize (if desktop view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`}
    >
      <div className="navbar-container">
        <Link 
          to="/" 
          className="logo" 
          onClick={closeMenu}
          aria-label="Alex J - Home"
        >
          <span className="logo-text">Alex J</span>
          <span className="logo-dot" aria-hidden="true"></span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <nav className="nav-links" aria-label="Main navigation">
            <Link 
              to="/" 
              className="nav-link" 
              onClick={closeMenu}
              aria-label="Go to Home"
            >
              <span className="link-number" aria-hidden="true">01</span>
              <span className="link-text">Home</span>
            </Link>
            <Link 
              to="/projects" 
              className="nav-link" 
              onClick={closeMenu}
              aria-label="Go to Projects"
            >
              <span className="link-number" aria-hidden="true">02</span>
              <span className="link-text">Projects</span>
            </Link>
            <Link 
              to="/about" 
              className="nav-link" 
              onClick={closeMenu}
              aria-label="Go to About"
            >
              <span className="link-number" aria-hidden="true">03</span>
              <span className="link-text">About</span>
            </Link>
            <Link 
              to="/contact" 
              className="nav-link" 
              onClick={closeMenu}
              aria-label="Go to Contact"
            >
              <span className="link-number" aria-hidden="true">04</span>
              <span className="link-text">Contact</span>
            </Link>
          </nav>
        </div>

        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="nav-overlay" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;