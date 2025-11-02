import React, { useEffect, useRef } from 'react';
import '../Portfolio/Portfolio.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';

const Portfolio = () => {
  const sectionsRef = useRef([]);
  const rafRef = useRef(null);
  const targetValues = useRef({});
  const currentValues = useRef({});

  // Ultra smooth interpolation
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // Smooth easing functions
  const easeOutQuart = (t) => {
    return 1 - Math.pow(1 - t, 4);
  };

  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    const calculateProgress = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        
        // Initialize target values
        if (!targetValues.current[index]) {
          targetValues.current[index] = {};
        }
        
        if (index === 0) {
          // Hero section - zoom out effect
          const scrollPercent = Math.min(1, scrollY / (windowHeight * 1.2));
          const easedScroll = easeOutQuart(scrollPercent);
          
          // Lighter effects for mobile
          const scaleAmount = isMobile ? 0.15 : 0.4;
          const translateAmount = isMobile ? 100 : 250;
          const blurAmount = isMobile ? 5 : 15;
          const opacityAmount = isMobile ? 0.5 : 0.85;
          const brightnessAmount = isMobile ? 0.3 : 0.7;
          
          targetValues.current[index] = {
            scale: 1 - (easedScroll * scaleAmount),
            translateY: easedScroll * translateAmount,
            blur: easedScroll * blurAmount,
            opacity: Math.max(0.2, 1 - (easedScroll * opacityAmount)),
            brightness: Math.max(0.5, 1 - (easedScroll * brightnessAmount))
          };
        } else {
          // Other sections - slide and scale in
          const distanceFromTop = rect.top;
          
          // Calculate visibility progress - works both directions
          // When section is below viewport: progress = 0
          // When section is in center: progress = 1
          // When section is above viewport: progress decreases back to 0
          
          const sectionCenter = distanceFromTop + (sectionHeight / 2);
          const viewportCenter = windowHeight / 2;
          
          // Distance from viewport center
          const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
          const maxDistance = windowHeight;
          
          // Progress is 1 when centered, 0 when far away
          const centerProgress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
          
          // Also calculate entry progress for initial animation
          const entryProgress = Math.max(0, Math.min(1, 
            (windowHeight - distanceFromTop) / (windowHeight * 0.6)
          ));
          
          // Use the higher value between center and entry for smooth transitions
          const viewProgress = Math.max(centerProgress, entryProgress * 0.8);
          const easedView = easeInOutQuart(viewProgress);
          
          // Lighter effects for mobile
          const scaleRange = isMobile ? 0.15 : 0.3;
          const translateAmount = isMobile ? 60 : 150;
          const rotateAmount = isMobile ? 3 : 10;
          const blurAmount = isMobile ? 2 : 5;
          
          targetValues.current[index] = {
            scale: (1 - scaleRange) + (easedView * scaleRange),
            translateY: (1 - easedView) * translateAmount,
            opacity: Math.max(0.3, easedView),
            rotateX: (1 - easedView) * rotateAmount,
            blur: (1 - easedView) * blurAmount
          };
        }
      });
    };

    // Smooth animation loop
    const animate = () => {
      sectionsRef.current.forEach((section, index) => {
        if (!section || !targetValues.current[index]) return;

        // Initialize current values
        if (!currentValues.current[index]) {
          currentValues.current[index] = { ...targetValues.current[index] };
        }

        const target = targetValues.current[index];
        const current = currentValues.current[index];

        // Ultra smooth lerp factor
        const lerpFactor = 0.08;

        // Interpolate all values
        Object.keys(target).forEach(key => {
          current[key] = lerp(current[key], target[key], lerpFactor);
        });

        // Apply transforms
        if (index === 0) {
          const { scale, translateY, blur, opacity, brightness } = current;
          section.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          section.style.filter = `blur(${blur}px) brightness(${brightness})`;
          section.style.opacity = opacity;
        } else {
          const { scale, translateY, opacity, rotateX, blur } = current;
          section.style.transform = `
            translateY(${translateY}px) 
            scale(${scale}) 
            perspective(2000px) 
            rotateX(${rotateX}deg)
          `;
          section.style.opacity = opacity;
          section.style.filter = `blur(${blur}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Scroll handler with resize check
    const handleScroll = () => {
      calculateProgress();
    };

    const handleResize = () => {
      calculateProgress();
    };

    // Initialize
    calculateProgress();
    animate();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="portfolio-container">
      <div ref={addToRefs} className="portfolio-section portfolio-section--hero">
        <Hero />
        <div className="section-fade-bottom"></div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--about">
        <div className="section-glow"></div>
        <About />
        <div className="section-fade-bottom"></div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--projects">
        <div className="section-glow"></div>
        <Projects />
        <div className="section-fade-bottom"></div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--contact">
        <div className="section-glow"></div>
        <Contact />
      </div>
    </div>
  );
};

export default Portfolio;