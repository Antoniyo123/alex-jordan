// AboutMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import './AboutMe.css';

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleMetrics, setVisibleMetrics] = useState([]);
  const [visibleServices, setVisibleServices] = useState([]);
  const metricsRef = useRef(null);
  const servicesRef = useRef(null);

  const experience = [
    { number: "20+", label: "Projects", description: "Successfully delivered across various industries" },
    { number: "20+", label: "Clients", description: "Trusted partners worldwide" },
    // { number: "3", label: "Awards", description: "For exceptional design & innovation" }
  ];

  const services = [
    { 
      title: "UI/UX Design", 
      description: "Creating intuitive and engaging user experiences",
      icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
    },
    { 
      title: "Web Development", 
      description: "Building responsive and performant web applications",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    },
    { 
      title: "Brand Strategy", 
      description: "Developing cohesive visual identities and guidelines",
      icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    }
  ];

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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleMetrics(experience.map((_, i) => i));
        }
      });
    }, observerOptions);

    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleServices(services.map((_, i) => i));
        }
      });
    }, observerOptions);

    if (metricsRef.current) metricsObserver.observe(metricsRef.current);
    if (servicesRef.current) servicesObserver.observe(servicesRef.current);

    return () => {
      if (metricsRef.current) metricsObserver.unobserve(metricsRef.current);
      if (servicesRef.current) servicesObserver.unobserve(servicesRef.current);
    };
  }, []);

  return (
    <section className="about-me">
      <div className="about-me__noise"></div>
      
      {/* Animated gradient background */}
      <div 
        className="about-me__gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)`
        }}
      ></div>

      {/* Floating elements */}
      <div className="about-me__floating-elements">
        <div className="about-me__floating-element about-me__floating-element--1"></div>
        <div className="about-me__floating-element about-me__floating-element--2"></div>
      </div>

      <div className={`about-me__container ${isVisible ? 'about-me__container--visible' : ''}`}>
        <div className="about-me__profile">
          <div className="about-me__image-container">
            <div className="about-me__image-wrapper">
              <div className="about-me__image-border"></div>
              <img src={require('../../img/profil.jpg')} alt="Alex Jordan" />
              <div className="about-me__image-overlay"></div>
            </div>
          </div>
          
          <div className="about-me__location">
            <div className="about-me__location-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Based in Jakarta, Indonesia</span>
            </div>
            <div className="about-me__availability">
              <span className="about-me__availability-dot"></span>
              <span>Available for freelance</span>
            </div>
          </div>

          {/* Social links */}
          <div className="about-me__social">
            <a href="#" className="about-me__social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href="#" className="about-me__social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
            </a>
            <a href="#" className="about-me__social-link" aria-label="Dribbble">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2c-1.85 0-3.55.63-4.9 1.69 1.56 2.07 3.97 4.45 7.73 5.96.11-.23.2-.46.3-.69.26-.64.5-1.33.73-2.07-2.33-1.07-4.4-1.74-5.96-2.15A7.94 7.94 0 0 1 12 4m-5.79 2.47c1.68.5 3.83 1.18 6.24 2.27a35.68 35.68 0 0 1-.85-3.18A8.04 8.04 0 0 0 6.21 6.47M14.09 6.07c.33 1.18.61 2.26.85 3.25 1.75-.21 3.59-.1 5.47.29a8.04 8.04 0 0 0-3.65-4.1c-.56.45-1.23.94-2.04 1.49-.27.18-.49.35-.63.07m6.59 4.68c-1.99-.37-3.88-.48-5.68-.28.15.56.29 1.12.4 1.68 2.16.8 4.03 2.03 5.31 3.57.53-1.49.78-3.11.53-4.8-.21-.06-.37-.11-.56-.17m-6.3.59c-.12-.49-.25-1-.4-1.53-3.94-1.57-6.5-3.99-8.13-6.16A8.01 8.01 0 0 0 4 12c0 .35.03.69.07 1.03 1.79-.04 4-.23 6.48-.82.49-.14.97-.28 1.44-.43-.08-.25-.15-.5-.23-.76-.14-.49-.27-1-.38-1.68m.84 2.92c-.52.16-1.04.31-1.57.44-2.35.55-4.54.72-6.35.76.85 2.66 2.83 4.8 5.43 5.81.16-2.2.63-4.42 1.32-6.46l1.17-.55m1.59-.09c-.68 2.03-1.13 4.21-1.29 6.38a8.01 8.01 0 0 0 5.45-3.29c-1.21-1.41-2.91-2.54-4.94-3.22l.78.13z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="about-me__content">
          <div className="about-me__intro">
            <span className="about-me__eyebrow">About Me</span>
            <div className="about-me__eyebrow-line"></div>
          </div>

          <p className="about-me__bio">
            With over 4 years of experience in digital design and development,
            I specialize in creating minimalist yet powerful digital solutions
            that prioritize user experience and business objectives.
          </p>

          <div className="about-me__metrics" ref={metricsRef}>
            {experience.map((item, index) => (
              <div 
                className={`metric ${visibleMetrics.includes(index) ? 'metric--visible' : ''}`}
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="metric__inner">
                  <div className="metric__header">
                    <span className="metric__number">{item.number}</span>
                    <span className="metric__label">{item.label}</span>
                  </div>
                  <p className="metric__description">{item.description}</p>
                  <div className="metric__decoration"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="about-me__services">
            <h2 className="section__title">
              <span>Services</span>
              <div className="section__title-line"></div>
            </h2>
            <div className="services__grid" ref={servicesRef}>
              {services.map((service, index) => (
                <div 
                  className={`service ${visibleServices.includes(index) ? 'service--visible' : ''}`}
                  key={index}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="service__inner">
                    <div className="service__icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d={service.icon} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="service__title">{service.title}</h3>
                    <p className="service__description">{service.description}</p>
                    <div className="service__decoration"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;