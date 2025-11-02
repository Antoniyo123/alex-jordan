// Hero.jsx - Enhanced Version
import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const heroRef = useRef(null);
  const cursorTrailRef = useRef([]);

  useEffect(() => {
    // Delayed entrance for smoother initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let animationFrame;
    let lastX = 50;
    let lastY = 50;

    const handleMouseMove = (e) => {
      // Cancel previous frame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      // Smooth interpolation for mouse position
      animationFrame = requestAnimationFrame(() => {
        const targetX = (e.clientX / window.innerWidth) * 100;
        const targetY = (e.clientY / window.innerHeight) * 100;
        
        // Lerp for smooth transition
        lastX += (targetX - lastX) * 0.1;
        lastY += (targetY - lastY) * 0.1;
        
        setMousePosition({
          x: lastX,
          y: lastY
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Enhanced smooth scroll with easing
  const handleScrollDown = () => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const nextSection = heroElement.nextElementSibling;
    
    if (nextSection) {
      const targetPosition = nextSection.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // ms
      let start = null;

      // Easing function
      const easeInOutCubic = (t) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    } else {
      // Fallback
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  // Skills with enhanced data
  const skills = [
    { name: 'React', delay: 0 },
    { name: 'UI/UX', delay: 0.1 },
    { name: 'Web Design', delay: 0.2 }
  ];

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__noise"></div>
      
      {/* Multi-layered gradient background */}
      <div 
        className="hero__gradient"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(26, 26, 26, 0.15) 0%, 
              rgba(245, 158, 11, 0.08) 30%,
              rgba(59, 130, 246, 0.06) 60%,
              transparent 80%
            )
          `
        }}
      ></div>

      {/* Animated lines */}
      <div className="hero__line hero__line--horizontal"></div>
      <div className="hero__line hero__line--vertical"></div>
      
      {/* Floating elements with enhanced colors */}
      <div className="hero__floating-elements">
        <div className="hero__floating-element hero__floating-element--1"></div>
        <div className="hero__floating-element hero__floating-element--2"></div>
        <div className="hero__floating-element hero__floating-element--3"></div>
      </div>
      
      <div className={`hero__content ${isVisible ? 'visible' : ''}`}>
        <div className="hero__eyebrow-wrapper">
          <span className="hero__eyebrow">Portfolio 2025</span>
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
            
            {/* Enhanced availability badge */}
            <div className="hero__availability">
              <span className="hero__availability-dot"></span>
              <span>Available for work</span>
            </div>
          </div>
        </div>

        <div className="hero__footer">
          <div className="hero__skills">
            {skills.map((skill, index) => (
              <span 
                key={skill.name} 
                className="hero__skill"
                style={{ 
                  animationDelay: `${skill.delay}s`,
                  transitionDelay: `${skill.delay}s`
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
          
          <div className="hero__actions">
            <Link 
              to="/about" 
              className="hero__link"
              aria-label="Learn more about me"
            >
              <span className="hero__link-text">About</span>
              <svg 
                className="hero__link-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                aria-hidden="true"
              >
                <path 
                  d="M3 8h10M9 4l4 4-4 4" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a 
              href="mailto:alexjor1997@gmail.com" 
              className="hero__link"
              aria-label="Send me an email"
            >
              <span className="hero__link-text">Contact</span>
              <svg 
                className="hero__link-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                aria-hidden="true"
              >
                <path 
                  d="M3 8h10M9 4l4 4-4 4" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <button 
          className="hero__scroll"
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
          type="button"
        >
          <div className="hero__scroll-circle">
            <div className="hero__scroll-wheel"></div>
          </div>
          <div className="hero__scroll-line"></div>
          <span className="hero__scroll-text">Scroll</span>
          <div className="hero__scroll-arrow">
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none"
              aria-hidden="true"
            >
              <path 
                d="M6 1v10M1 6l5 5 5-5" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;