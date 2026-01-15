// ProjectMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import './ProjectMe.css';

const ProjectDetailModal = ({ project, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  if (!project) return null;

  return (
    <div className={`project-modal ${isVisible ? 'project-modal--visible' : ''}`}>
      <div className="project-modal__overlay" onClick={handleClose}></div>
      <div className="project-modal__container">
        <div className="project-modal__content">
          <button className="project-modal__close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          
          <div className="project-modal__grid">
            {/* Image Section with Carousel */}
            <div className="project-modal__image-section">
              <div className="project-modal__image-container">
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="project-modal__image" 
                  key={currentImageIndex}
                />
              </div>

              {/* Carousel Controls */}
              {project.images.length > 1 && (
                <>
                  <button 
                    className="project-modal__carousel-btn project-modal__carousel-btn--prev"
                    onClick={prevImage}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <button 
                    className="project-modal__carousel-btn project-modal__carousel-btn--next"
                    onClick={nextImage}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  {/* Image Counter */}
                  <div className="project-modal__counter">
                    <span>{currentImageIndex + 1}</span>
                    <span className="project-modal__counter-separator">/</span>
                    <span>{project.images.length}</span>
                  </div>

                  {/* Image Indicators */}
                  <div className="project-modal__indicators">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        className={`project-modal__indicator ${currentImageIndex === index ? 'project-modal__indicator--active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Info Section */}
            <div className="project-modal__info-section">
              <div className="project-modal__header">
                <div className="project-modal__title-wrapper">
                  <h2>{project.title}</h2>
                  <div className="project-modal__title-line"></div>
                </div>
                <div className="project-modal__meta">
                  <span className="project-modal__meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {project.year}
                  </span>
                  <span className="project-modal__meta-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="project-modal__description">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  Project Overview
                </h3>
                <p>{project.description}</p>
              </div>

              <div className="project-modal__tech">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  Technologies
                </h3>
                <div className="project-modal__tech-list">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-modal__tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

             <div className="project-modal__actions">
  {project.websiteLink && (
    <a 
      href={project.websiteLink}
      target="_blank"
      rel="noopener noreferrer"
      className="project-modal__btn project-modal__btn--live"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      Visit Website
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
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsRef = useRef(null);

  const projects = [
{
  title: "Bali Social Integrated Website",
  year: "2022",
  category: "Web Development",
  description: "A full-stack e-commerce platform with advanced features like user authentication, product management, and secure payment integration. The project demonstrates scalable web application development.",
  technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
  images: [
    require('../../img/project1.png'),
    require('../../img/project1.png'),
    require('../../img/project1.png')
  ],
  websiteLink: "https://bali-social-integrated.com"
},
{
  title: "Carbon Free Viaje Website",
  year: "2022",
  category: "Web Development",
  description: "A comprehensive task management web app with real-time collaboration features, designed to improve team productivity and project tracking.",
  technologies: ["React", "Firebase", "Redux", "TypeScript"],
  images: [
    require('../../img/project2.png'),
    require('../../img/project2.png'),
    require('../../img/project2.png')
  ],
  websiteLink: "https://carbonfreeviaje.com"
},
{
  title: "BSI Web Concert",
  year: "2022",
  category: "Web Development",
  description: "A responsive and interactive personal portfolio website showcasing web development skills and previous projects with modern design principles.",
  technologies: ["React", "CSS3", "Responsive Design", "Framer Motion"],
  images: [
    require('../../img/project3.png'),
    require('../../img/project3.png')
  ],
  websiteLink: "https://bsiwebconcert.com"
},
{
  title: "IndoBizcorner Website",
  year: "2025",
  category: "Web Development",
  description: "A responsive and interactive personal portfolio website showcasing web development skills and previous projects with modern design principles.",
  technologies: ["React", "CSS3", "Responsive Design", "Framer Motion"],
  images: [
    require('../../img/indobiz1.png'),
    require('../../img/indobiz2.png'),
    require('../../img/indobiz3.png')
  ],
  websiteLink: "https://indobizcorner.com"
},
{
  title: "KacaKreatif",
  year: "2024",
  category: "Web Development",
  description: "A responsive and interactive personal portfolio website showcasing web development skills and previous projects with modern design principles.",
  technologies: ["React", "CSS3", "Responsive Design", "Framer Motion"],
  images: [
    require('../../img/kacaloader.png'),
    require('../../img/kacahome2.png'),
    require('../../img/kacaloader.png'),
    require('../../img/kacahome.png')
  ],
  websiteLink: "https://kacakreatif.com"
},
{
  title: "Merantau Website",
  year: "2025",
  category: "Web Development",
  description: "A responsive and interactive personal portfolio website showcasing web development skills and previous projects with modern design principles.",
  technologies: ["React", "CSS3", "Responsive Design", "Framer Motion"],
  images: [
    require('../../img/merantau1.png'),
    require('../../img/merantau2.png'),

  ],
  websiteLink: "https://merantau.co.id"
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectElements = document.querySelectorAll('.project-me__item');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="project-me">
      <div className="project-me__noise"></div>
      
      {/* Animated gradient background */}
      <div 
        className="project-me__gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)`
        }}
      ></div>

      {/* Floating elements */}
      <div className="project-me__floating-elements">
        <div className="project-me__floating-element project-me__floating-element--1"></div>
        <div className="project-me__floating-element project-me__floating-element--2"></div>
      </div>

      <div className={`project-me__container ${isVisible ? 'project-me__container--visible' : ''}`}>
        <header className="project-me__header">
          <div className="project-me__header-content">
            <h2>Web Development Projects</h2>
            <div className="project-me__header-line"></div>
          </div>
          <span className="project-me__year">2022—2024</span>
        </header>

        <div className="project-me__grid" ref={projectsRef}>
          {projects.map((project, index) => (
            <article 
              className={`project-me__item ${visibleProjects.includes(index) ? 'project-me__item--visible' : ''}`}
              key={index}
              data-index={index}
              onClick={() => openProjectModal(project)}
              style={{ animationDelay: `${(index % 2) * 0.1}s` }}
            >
              <div className="project-me__card">
                <div className="project-me__image-wrapper">
                  <img src={project.images[0]} alt={project.title} />
                  <div className="project-me__overlay">
                    <span className="project-me__view">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      View Project
                    </span>
                  </div>
                  <div className="project-me__image-border"></div>
                </div>
                
                <div className="project-me__content">
                  <div className="project-me__meta">
                    <span>{project.year}</span>
                    <span className="project-me__meta-separator">•</span>
                    <span>{project.category}</span>
                  </div>
                  <h3 className="project-me__title">{project.title}</h3>
                  <p className="project-me__description">{project.description}</p>
                  
                  <div className="project-me__tech-preview">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="project-me__tech-badge">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="project-me__tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
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