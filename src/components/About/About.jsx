import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__grid">
          {/* Image Section */}
          <div className="about__image-wrapper">
            <div className="about__image-container">
              <img 
                src={require('../../img/selfie.jpeg')}
                alt="Alex Jordan"
                className="about__image"
              />
            </div>
            {/* <div className="about__experience-badge">
              <div className="badge__number">5+</div>
              <div className="badge__text">Years Experience</div>
            </div> */}
          </div>

          {/* Content Section */}
          <div className="about__content">
            <div className="about__header">
              <span className="about__subtitle">About Me</span>
              <h2 className="about__title">
                Creating Digital Experiences That Matter
              </h2>
            </div>

            <p className="about__description">
              As a designer and developer, I blend creativity with technical precision 
              to craft digital experiences that are both intuitive and visually compelling. 
              My approach focuses on minimalist design, clean code, and user-centered solutions.
            </p>

            <div className="about__stats">
              <div className="stat">
                <div className="stat__number">50+</div>
                <div className="stat__label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat__number">30+</div>
                <div className="stat__label">Clients</div>
              </div>
              <div className="stat">
                <div className="stat__number">3</div>
                <div className="stat__label">Awards</div>
              </div>
            </div>

            <div className="about__skills">
              {['UI/UX Design', 'React', 'JavaScript', 'Responsive Design', 'Brand Identity']
                .map((skill) => (
                  <span 
                    key={skill}
                    className="skill-tag"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;