import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger initial animation
    const animationTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <section 
      className="hero" 
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`
      }}
    >
      <div className="hero__background"></div>
      <div className="hero__grid"></div>
      <div className="hero__geometric-shape"></div>
      <div className="hero__container">
        <div className={`hero__content ${isAnimating ? 'animate' : ''}`}>
          <div className="hero__name-wrapper">
            <h1 className="hero__name">
              <span>A</span>
              <span>l</span>
              <span>e</span>
              <span>x</span>
              {' '}
              <span>J</span>
              <span>o</span>
              <span>r</span>
              <span>d</span>
              <span>a</span>
              <span>n</span>
            </h1>
          </div>
          <p className="hero__role">Design & Development</p>
          <p className="hero__description">
            Creative problem solver crafting digital experiences 
            that blend elegant design with functional innovation.
          </p>
          <div className="hero__skills">
            <span>React</span>
            <span>UI/UX</span>
            <span>Web Design</span>
          </div>
          <div className="hero__actions">
            <a href="#portfolio" className="hero__link">Selected Works</a>
            <a href="#about" className="hero__link">About Me</a>
          </div>
          <div className="hero__contact">
            <a href="mailto:your.email@example.com" className="hero__contact-btn">
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;