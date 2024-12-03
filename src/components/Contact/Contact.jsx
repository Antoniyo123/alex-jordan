import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-content">
        <span className="section-subtitle">Get In Touch</span>
        <h2 className="section-title">Let's Work Together</h2>
        <p className="contact-description">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <a href="mailto:riswantonr2015@gmail.com" className="email-link">
          riswantonr2015@gmail.com
        </a>
        <div className="social-links">
          {['LinkedIn', 'GitHub', 'Dribbble'].map((platform) => (
            <a key={platform} href="#" className="social-link">
              {platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;