import React from 'react';
import './About.css';

const About = () => {
  const experience = [
    {
      number: "50+",
      label: "Projects",
      description: "Successfully delivered across various industries"
    },
    {
      number: "30+",
      label: "Clients",
      description: "Trusted partners worldwide"
    },
    {
      number: "3",
      label: "Awards",
      description: "For exceptional design & innovation"
    }
  ];

  const skills = [
    { name: 'UI/UX Design', level: 'Expert' },
    { name: 'React', level: 'Advanced' },
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'Responsive Design', level: 'Expert' },
    { name: 'Brand Identity', level: 'Advanced' },
    { name: 'Web Animation', level: 'Intermediate' },
    { name: 'Design Systems', level: 'Advanced' }
  ];

  const services = [
    {
      title: "UI/UX Design",
      description: "Creating intuitive and engaging user experiences"
    },
    {
      title: "Web Development",
      description: "Building responsive and performant web applications"
    },
    {
      title: "Brand Strategy",
      description: "Developing cohesive visual identities and guidelines"
    }
  ];

  return (
    <div className="about">
      <div className="about__container">
        <section className="about__content">
          <div className="about__profile">
            <div className="about__image-wrapper">
              <img 
                src={require('../../img/selfie.jpeg')}
                alt="Alex Jordan"
                className="about__image"
              />
            </div>
            <h1 className="about__title">Alex Jordan</h1>
            <p className="about__subtitle">Designer & Developer</p>
            <div className="about__location">
              <span>Based in Jakarta, Indonesia</span>
              <span className="about__availability">Available for freelance</span>
            </div>
          </div>

          <div className="about__bio">
            <p>
              With over 4 years of experience in digital design and development,
              I specialize in creating minimalist yet powerful digital solutions
              that prioritize user experience and business objectives.
            </p>
          </div>

          <div className="about__metrics">
            {experience.map((item, index) => (
              <div className="metric" key={index}>
                <span className="metric__number">{item.number}</span>
                <span className="metric__label">{item.label}</span>
                <span className="metric__description">{item.description}</span>
              </div>
            ))}
          </div>

          <div className="about__services">
            <h2 className="section-title">Services</h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <div className="service-card" key={index}>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="about__skills">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div className="skill-tag" key={index}>
                  <span className="skill-tag__name">{skill.name}</span>
                  <span className="skill-tag__level">{skill.level}</span>
                </div>
              ))}
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default About;