// Hero.jsx
import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero__noise"></div>
      
      {/* Animated gradient background */}
      <div 
        className="hero__gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)`
        }}
      ></div>

      {/* Animated lines */}
      <div className="hero__line hero__line--horizontal"></div>
      <div className="hero__line hero__line--vertical"></div>
      
      {/* Floating elements */}
      <div className="hero__floating-elements">
        <div className="hero__floating-element hero__floating-element--1"></div>
        <div className="hero__floating-element hero__floating-element--2"></div>
        <div className="hero__floating-element hero__floating-element--3"></div>
      </div>
      
      <div className={`hero__content ${isVisible ? 'visible' : ''}`}>
        <div className="hero__eyebrow-wrapper">
          <span className="hero__eyebrow">Portfolio 2024</span>
          <div className="hero__eyebrow-line"></div>
        </div>
        
        <div className="hero__main">
          <h1 className="hero__title">
            <span className="hero__title-line">
              <span className="hero__title-inner">Alex</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title-inner">Jordan</span>
            </span>
          </h1>
          
          <div className="hero__info">
            <p className="hero__role">
              <span className="hero__role-text">Design & Development</span>
            </p>
            <p className="hero__description">
              Creative problem solver crafting digital experiences 
              that blend elegant design with functional innovation.
            </p>
            
            {/* Added availability badge */}
            <div className="hero__availability">
              <span className="hero__availability-dot"></span>
              <span>Available for work</span>
            </div>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__skills">
            {['React', 'UI/UX', 'Web Design'].map((skill, index) => (
              <span 
                key={skill} 
                className="hero__skill"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="hero__actions">
            <Link to="/about" className="hero__link">
              <span className="hero__link-text">About</span>
              <svg className="hero__link-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="mailto:alexjor1997@gmail.com" className="hero__link">
              <span className="hero__link-text">Contact</span>
              <svg className="hero__link-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <div className="hero__scroll-line"></div>
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;