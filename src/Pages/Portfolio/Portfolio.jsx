import React, { useEffect, useRef } from 'react';
import '../Portfolio/Portfolio.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';

const Portfolio = () => {
  const sectionsRef = useRef([]);
  const contentRefs = useRef([]);
  const rafRef = useRef(null);
  const targetValues = useRef({});
  const currentValues = useRef({});
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  // Ultra smooth interpolation with velocity-based easing
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // Advanced easing functions
  const easeOutQuint = (t) => {
    return 1 - Math.pow(1 - t, 5);
  };

  const easeInOutQuint = (t) => {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  };

  const easeOutExpo = (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    // Track scroll velocity for smoother animations
    let lastTime = Date.now();
    
    const calculateProgress = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll velocity
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      const deltaScroll = scrollY - lastScrollY.current;
      scrollVelocity.current = Math.abs(deltaScroll / deltaTime);
      lastScrollY.current = scrollY;
      lastTime = currentTime;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;
        
        if (!targetValues.current[index]) {
          targetValues.current[index] = {};
        }
        
        if (index === 0) {
          // Hero section - enhanced zoom out with velocity
          const scrollPercent = Math.min(1, scrollY / (windowHeight * 1.5));
          const easedScroll = easeOutQuint(scrollPercent);
          
          // Adaptive effects based on velocity
          const velocityMultiplier = Math.min(1.5, 1 + (scrollVelocity.current / 2000));
          
          const scaleAmount = isMobile ? 0.2 : 0.5;
          const translateAmount = isMobile ? 120 : 300;
          const blurAmount = isMobile ? 6 : 20;
          const opacityAmount = isMobile ? 0.6 : 0.9;
          const brightnessAmount = isMobile ? 0.4 : 0.75;
          
          targetValues.current[index] = {
            scale: 1 - (easedScroll * scaleAmount * velocityMultiplier * 0.1 + easedScroll * scaleAmount * 0.9),
            translateY: easedScroll * translateAmount,
            blur: easedScroll * blurAmount,
            opacity: Math.max(0.15, 1 - (easedScroll * opacityAmount)),
            brightness: Math.max(0.4, 1 - (easedScroll * brightnessAmount))
          };
        } else {
          // Other sections - enhanced slide and scale
          const distanceFromTop = rect.top;
          const sectionCenter = distanceFromTop + (sectionHeight / 2);
          const viewportCenter = windowHeight / 2;
          
          // Multi-phase animation
          const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
          const maxDistance = windowHeight * 1.2;
          
          // Center-based progress with exponential easing
          const centerProgress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
          const easedCenter = easeOutExpo(centerProgress);
          
          // Entry progress with smoother threshold
          const entryProgress = Math.max(0, Math.min(1, 
            (windowHeight - distanceFromTop + sectionHeight * 0.2) / (windowHeight * 0.8)
          ));
          const easedEntry = easeInOutQuint(entryProgress);
          
          // Exit progress (when scrolling past)
          const exitProgress = Math.max(0, Math.min(1,
            (distanceFromTop + sectionHeight) / (windowHeight * 0.5)
          ));
          const easedExit = 1 - easeOutQuint(Math.max(0, exitProgress - 1));
          
          // Combine all progress values
          const combinedProgress = Math.max(easedCenter, easedEntry * 0.85) * easedExit;
          
          const scaleRange = isMobile ? 0.18 : 0.35;
          const translateAmount = isMobile ? 80 : 180;
          const rotateAmount = isMobile ? 4 : 12;
          const blurAmount = isMobile ? 3 : 8;
          
          targetValues.current[index] = {
            scale: (1 - scaleRange) + (combinedProgress * scaleRange),
            translateY: (1 - combinedProgress) * translateAmount,
            opacity: Math.max(0.25, combinedProgress),
            rotateX: (1 - combinedProgress) * rotateAmount,
            blur: (1 - combinedProgress) * blurAmount
          };
        }
      });

      // Animate content elements
      contentRefs.current.forEach((content) => {
        if (!content) return;

        const rect = content.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const triggerPoint = windowHeight * 0.75;

        // Progressive reveal
        if (elementTop < triggerPoint && elementTop + elementHeight > 0) {
          content.classList.add('visible');
        }
      });
    };

    // Enhanced smooth animation loop
    const animate = () => {
      sectionsRef.current.forEach((section, index) => {
        if (!section || !targetValues.current[index]) return;

        if (!currentValues.current[index]) {
          currentValues.current[index] = { ...targetValues.current[index] };
        }

        const target = targetValues.current[index];
        const current = currentValues.current[index];

        // Adaptive lerp factor based on scroll velocity
        const baseLerpFactor = 0.06;
        const velocityFactor = Math.min(0.15, scrollVelocity.current / 5000);
        const lerpFactor = baseLerpFactor + velocityFactor;

        Object.keys(target).forEach(key => {
          current[key] = lerp(current[key], target[key], lerpFactor);
        });

        // Apply transforms with sub-pixel precision
        if (index === 0) {
          const { scale, translateY, blur, opacity, brightness } = current;
          section.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
          section.style.filter = `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(3)})`;
          section.style.opacity = opacity.toFixed(3);
        } else {
          const { scale, translateY, opacity, rotateX, blur } = current;
          section.style.transform = `
            translateY(${translateY.toFixed(2)}px) 
            scale(${scale.toFixed(4)}) 
            perspective(2000px) 
            rotateX(${rotateX.toFixed(2)}deg)
          `;
          section.style.opacity = opacity.toFixed(3);
          section.style.filter = `blur(${blur.toFixed(2)}px)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      calculateProgress();
    };

    const handleResize = () => {
      calculateProgress();
    };

    // Initialize with slight delay for smoother first render
    setTimeout(() => {
      calculateProgress();
    }, 50);
    
    animate();

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

  const addToContentRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  return (
    <div className="portfolio-container">
      <div ref={addToRefs} className="portfolio-section portfolio-section--hero">
        <div ref={addToContentRefs} className="content-animate-scale">
          <Hero />
        </div>
        <div className="section-fade-bottom"></div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--about">
        <div className="section-glow"></div>
        <div ref={addToContentRefs} className="content-animate">
          <About />
        </div>
        <div className="section-fade-bottom"></div>
      </div>
      
      <div ref={addToRefs} className="portfolio-section portfolio-section--projects">
        <div className="section-glow"></div>
        <div ref={addToContentRefs} className="content-animate-stagger">
          <Projects />
        </div>
        <div className="section-fade-bottom"></div>
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