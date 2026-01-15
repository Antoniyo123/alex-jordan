import React, { useEffect, useRef } from 'react';
import '../Portfolio/Portfolio.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';

const Portfolio = () => {
  const sectionsRef = useRef([]);
  const contentRefs = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // Simple IntersectionObserver for content animations
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe content elements
    contentRefs.current.forEach(content => {
      if (content) {
        observer.observe(content);
      }
    });

    // Add visible class to hero immediately
    if (contentRefs.current[0]) {
      contentRefs.current[0].classList.add('visible');
    }

    // Simple parallax effect for hero
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking && heroRef.current) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const parallaxSpeed = 0.5;
          
          // Simple translateY parallax - very lightweight
          heroRef.current.style.transform = `translate3d(0, ${scrolled * parallaxSpeed}px, 0)`;
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToContentRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  return (
    <div className="portfolio-container">
      <div ref={addToRefs} className="portfolio-section portfolio-section--hero">
        <div 
          ref={(el) => {
            heroRef.current = el;
            addToContentRefs(el);
          }} 
          className="content-animate-scale"
        >
          <Hero />
        </div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--about">
        <div className="section-glow"></div>
        <div ref={addToContentRefs} className="content-animate">
          <About />
        </div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--projects">
        <div className="section-glow"></div>
        <div ref={addToContentRefs} className="content-animate-stagger">
          <Projects />
        </div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--contact">
        <div className="section-glow"></div>
        <div ref={addToContentRefs} className="content-animate">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;