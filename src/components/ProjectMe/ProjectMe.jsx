import React, { useState, useEffect } from 'react';
import './ProjectMe.css';

const ProjectDetailModal = ({ project, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);
  
    const handleClose = () => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Match animation duration
    };
  
    if (!project) return null;
  
    return (
      <div className={`project-modal ${isVisible ? 'project-modal--visible' : ''}`}>
        <div className="project-modal__overlay" onClick={handleClose}></div>
        <div className="project-modal__container">
          <div className="project-modal__content">
            <button className="project-modal__close" onClick={handleClose}>
              <span>&times;</span>
            </button>
            
            <div className="project-modal__grid">
              <div className="project-modal__image-section">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-modal__image" 
                />
              </div>
              
              <div className="project-modal__info-section">
                <div className="project-modal__header">
                  <h2>{project.title}</h2>
                  <div className="project-modal__meta">
                    <span>{project.year}</span>
                    <span>{project.category}</span>
                  </div>
                </div>
  
                <div className="project-modal__description">
                  <h3>Project Overview</h3>
                  <p>{project.description}</p>
                </div>
  
                <div className="project-modal__tech">
                  <h3>Technologies</h3>
                  <div className="project-modal__tech-list">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="project-modal__tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
  
                <div className="project-modal__actions">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-modal__btn project-modal__btn--github"
                    >
                      View on GitHub
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-modal__btn project-modal__btn--live"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

const ProjectMe = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Bali Social Integrated Website",
      year: "2022",
      category: "Web Development",
      description: "A full-stack e-commerce platform with advanced features like user authentication, product management, and secure payment integration. The project demonstrates scalable web application development.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      image: require('../../img/project1.png'),
      githubLink: "https://github.com/yourusername/ecommerce-project"
    },
    {
      title: "Carbon Free Viaje Website",
      year: "2022",
      category: "Web Development",
      description: "A comprehensive task management web app with real-time collaboration features, designed to improve team productivity and project tracking.",
      technologies: ["React", "Firebase", "Redux", "TypeScript"],
      image: require('../../img/project2.png'),
      githubLink: "https://github.com/yourusername/task-management-app"
    },
    {
      title: "BSI Web Concert",
      year: "2022",
      category: "Web Development",
      description: "A responsive and interactive personal portfolio website showcasing web development skills and previous projects with modern design principles.",
      technologies: ["React", "CSS3", "Responsive Design", "Framer Motion"],
      image: require('../../img/project3.png'),
      githubLink: "https://github.com/yourusername/personal-portfolio"
    },
    {
      title: "BSI & Viaje Apps",
      year: "2022",
      category: "Web Development",
      description: "A responsive and interactive personal portfolio website showcasing web development skills and previous projects with modern design principles.",
      technologies: ["React", "CSS3", "Responsive Design", "Framer Motion"],
      image: require('../../img/project4.png'),
      githubLink: "https://github.com/yourusername/personal-portfolio"
    }
  ];

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="project-me">
      <div className="project-me__noise"></div>
      <div className="project-me__container">
        <header className="project-me__header">
          <h2>Web Development Projects</h2>
          <span className="project-me__year">2022—2024</span>
        </header>

        <div className="project-me__grid">
          {projects.map((project, index) => (
            <article 
              className="project-me__item" 
              key={index} 
              onClick={() => openProjectModal(project)}
            >
              <div className="project-me__image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="project-me__overlay">
                  <span className="project-me__view">View Project</span>
                </div>
              </div>
              
              <div className="project-me__content">
                <div className="project-me__meta">
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="project-me__title">{project.title}</h3>
                <p className="project-me__description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        
        {/* <footer className="project-me__footer">
          <a href="#archive" className="project-me__link">
            View All Projects
            <span className="project-me__link-arrow">→</span>
          </a>
        </footer> */}
      </div>

      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={closeProjectModal} 
        />
      )}
    </section>
  );
};

export default ProjectMe;