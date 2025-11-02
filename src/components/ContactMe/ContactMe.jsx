// ContactMe.jsx
import React, { useState, useEffect } from 'react';
import './ContactMe.css';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState(null);

  const socialLinks = [
    { 
      platform: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/riswan-ton/',
      icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z'
    },
    { 
      platform: 'GitHub', 
      url: 'https://github.com/riswanto-png',
      icon: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z'
    },
    { 
      platform: 'Dribbble', 
      url: 'https://dribbble.com/riswanto',
      icon: 'M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2c-1.85 0-3.55.63-4.9 1.69 1.56 2.07 3.97 4.45 7.73 5.96.11-.23.2-.46.3-.69.26-.64.5-1.33.73-2.07-2.33-1.07-4.4-1.74-5.96-2.15A7.94 7.94 0 0 1 12 4m-5.79 2.47c1.68.5 3.83 1.18 6.24 2.27a35.68 35.68 0 0 1-.85-3.18A8.04 8.04 0 0 0 6.21 6.47M14.09 6.07c.33 1.18.61 2.26.85 3.25 1.75-.21 3.59-.1 5.47.29a8.04 8.04 0 0 0-3.65-4.1c-.56.45-1.23.94-2.04 1.49-.27.18-.49.35-.63.07m6.59 4.68c-1.99-.37-3.88-.48-5.68-.28.15.56.29 1.12.4 1.68 2.16.8 4.03 2.03 5.31 3.57.53-1.49.78-3.11.53-4.8-.21-.06-.37-.11-.56-.17m-6.3.59c-.12-.49-.25-1-.4-1.53-3.94-1.57-6.5-3.99-8.13-6.16A8.01 8.01 0 0 0 4 12c0 .35.03.69.07 1.03 1.79-.04 4-.23 6.48-.82.49-.14.97-.28 1.44-.43-.08-.25-.15-.5-.23-.76-.14-.49-.27-1-.38-1.68m.84 2.92c-.52.16-1.04.31-1.57.44-2.35.55-4.54.72-6.35.76.85 2.66 2.83 4.8 5.43 5.81.16-2.2.63-4.42 1.32-6.46l1.17-.55m1.59-.09c-.68 2.03-1.13 4.21-1.29 6.38a8.01 8.01 0 0 0 5.45-3.29c-1.21-1.41-2.91-2.54-4.94-3.22l.78.13z'
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className='contact__me__wrapper'>
      <div className="contactme__noise"></div>
      
      {/* Animated gradient background */}
      <div 
        className="contactme__gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)`
        }}
      ></div>

      {/* Floating elements */}
      <div className="contactme__floating-elements">
        <div className="contactme__floating-element contactme__floating-element--1"></div>
        <div className="contactme__floating-element contactme__floating-element--2"></div>
      </div>

      <div id="contact" className={`contactme-section ${isVisible ? 'contactme-section--visible' : ''}`}>
        <div className="contactme-content">
          <div className="contactme-text">
            <div className="contactme-text-wrapper">
              <div className="contactme-eyebrow-wrapper">
                <span className="contactme-subtitle">Get In Touch</span>
                <div className="contactme-eyebrow-line"></div>
              </div>
              
              <h2 className="contactme-title">
                <span className="contactme-title-line">Let's Work</span>
                <span className="contactme-title-line">Together</span>
              </h2>
              
              <p className="contactme-description">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <a href="mailto:alexjor1997@gmail.com" className="contactme-email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>alexjor1997@gmail.com</span>
              </a>
              
              <div className="contactme-socials">
                {socialLinks.map((social, index) => (
                  <a 
                    key={social.platform} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contactme-social-link"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.icon}/>
                    </svg>
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contactme-form">
            <div className={`form-group ${focusedField === 'name' ? 'form-group--focused' : ''}`}>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required 
              />
              <div className="form-group__line"></div>
            </div>
            
            <div className={`form-group ${focusedField === 'email' ? 'form-group--focused' : ''}`}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required 
              />
              <div className="form-group__line"></div>
            </div>
            
            <div className={`form-group ${focusedField === 'message' ? 'form-group--focused' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message"
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required 
              />
              <div className="form-group__line"></div>
            </div>
            
            <button type="submit" className="submit-btn">
              <span>Send Message</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <div className='copyright__contact'>
        <div className="copyright__line"></div>
        <p className="copyright__contact__me">
          &copy; {new Date().getFullYear()} Alex Jordan. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ContactMe;