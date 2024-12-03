import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero__noise"></div>
      <div className="hero__line"></div>
      
      <div className={`hero__content ${isVisible ? 'visible' : ''}`}>
        <span className="hero__eyebrow">Portfolio 2024</span>
        
        <div className="hero__main">
          <h1 className="hero__title">
            <span className="hero__title-line">Alex</span>
            <span className="hero__title-line">Jordan</span>
          </h1>
          
          <div className="hero__info">
            <p className="hero__role">Design & Development</p>
            <p className="hero__description">
              Creative problem solver crafting digital experiences 
              that blend elegant design with functional innovation.
            </p>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__skills">
            {['React', 'UI/UX', 'Web Design'].map((skill) => (
              <span key={skill} className="hero__skill">{skill}</span>
            ))}
          </div>
          
          <div className="hero__actions">
            <a href="#works" className="hero__link">Selected Works</a>
            <a href="#about" className="hero__link">About</a>
            <a href="mailto:your.email@example.com" className="hero__link">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;