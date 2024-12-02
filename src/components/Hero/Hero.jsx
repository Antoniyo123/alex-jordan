// Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <span className="hero__greeting">Welcome to my portfolio</span>
        <h1 className="hero__name">Alex Jordan</h1>
        <div className="hero__divider"></div>
        <p className="hero__role">Designer & Developer</p>
        <div className="hero__buttons">
          <button className="hero__button hero__button--primary">View My Work</button>
          <button className="hero__button hero__button--secondary">About Me</button>
        </div>
      </div>
      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;