import React, { useState } from 'react';
import './ContactMe.css';

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    { 
      platform: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/riswan-ton/' 
    },
    { 
      platform: 'GitHub', 
      url: 'https://github.com/riswanto-png' 
    },
    { 
      platform: 'Dribbble', 
      url: 'https://dribbble.com/riswanto' 
    }
  ];

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
    <section id="contact" className="contactme-section">
      <div className="contactme-content">
        <div className="contactme-text">
          <span className="contactme-subtitle">Get In Touch</span>
          <h2 className="contactme-title">Let's Work Together</h2>
          <p className="contactme-description">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          <a href="mailto:riswantonr2015@gmail.com" className="contactme-email">
            riswantonr2015@gmail.com
          </a>
          <div className="contactme-socials">
            {socialLinks.map((social) => (
              <a 
                key={social.platform} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contactme-social-link"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="contactme-form">
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message"
              placeholder="Your Message" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;