import React from 'react';
import './About.css';

const About = () => {
  const experience = [
    { number: "50+", label: "Projects", description: "Successfully delivered across various industries" },
    { number: "30+", label: "Clients", description: "Trusted partners worldwide" },
    { number: "3", label: "Awards", description: "For exceptional design & innovation" }
  ];

  const services = [
    { title: "UI/UX Design", description: "Creating intuitive and engaging user experiences" },
    { title: "Web Development", description: "Building responsive and performant web applications" },
    { title: "Brand Strategy", description: "Developing cohesive visual identities and guidelines" }
  ];

  return (
    <section className="about">
      <div className="about__noise"></div>
      <div className="about__container">
        <div className="about__profile">
          <div className="about__image-container">
            <div className="about__image-wrapper">
              <img src={require('../../img/selfie.jpeg')} alt="Alex Jordan" />
            </div>
          </div>
          <div className="about__location">
            <span>Based in Jakarta, Indonesia</span>
            <span className="about__availability">Available for freelance</span>
          </div>
        </div>

        <div className="about__content">
          <p className="about__bio">
            With over 4 years of experience in digital design and development,
            I specialize in creating minimalist yet powerful digital solutions
            that prioritize user experience and business objectives.
          </p>

          <div className="about__metrics">
            {experience.map((item, index) => (
              <div className="metric" key={index}>
                <div className="metric__header">
                  <span className="metric__number">{item.number}</span>
                  <span className="metric__label">{item.label}</span>
                </div>
                <p className="metric__description">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="about__services">
            <h2 className="section__title">Services</h2>
            <div className="services__grid">
              {services.map((service, index) => (
                <div className="service" key={index}>
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;