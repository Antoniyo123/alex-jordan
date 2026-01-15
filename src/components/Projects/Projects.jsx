// Projects.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectsRef = useRef(null);

  const projects = [
    {
      title: "Bali Social Integrated Website",
      year: "2022",
      category: "Web Development",
      description: "A concise description of the first project showcasing its key features and innovative approach.",
      image: require('../../img/kacaloader.png'),
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Carbon Free Viaje Website",
      year: "2022",
      category: "Web Development",
      description: "Brief insight into the second project, highlighting its unique design and creative solution.",
      image: require('../../img/indobiz1.png'),
      tags: ["React", "Firebase", "TypeScript"]
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

    const projectElements = document.querySelectorAll('.project');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects">
      <div className="projects__noise"></div>
      
      {/* Animated gradient background */}
      <div 
        className="projects__gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.06) 0%, transparent 50%)`
        }}
      ></div>

      {/* Floating elements */}
      <div className="projects__floating-elements">
        <div className="projects__floating-element projects__floating-element--1"></div>
        <div className="projects__floating-element projects__floating-element--2"></div>
      </div>

      <div className={`projects__container ${isVisible ? 'projects__container--visible' : ''}`}>
        <header className="projects__header">
          <div className="projects__header-content">
            <h2>Featured Work</h2>
            <div className="projects__header-line"></div>
          </div>
          <span className="projects__year">2022—2024</span>
        </header>

        <div className="projects__grid" ref={projectsRef}>
          {projects.map((project, index) => (
            <article 
              className={`project ${visibleProjects.includes(index) ? 'project--visible' : ''}`}
              key={index}
              data-index={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project__card">
                <div className="project__image-wrapper">
                  <img src={project.image} alt={project.title} />
                  <div className="project__overlay">
                    <span className="project__view">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      View Project
                    </span>
                  </div>
                  <div className="project__image-border"></div>
                </div>
                
                <div className="project__content">
                  <div className="project__meta">
                    <span className="project__meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {project.year}
                    </span>
                    <span className="project__meta-separator">•</span>
                    <span className="project__meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="project__title">{project.title}</h3>
                  <p className="project__description">{project.description}</p>
                  
                  {/* Tech Tags */}
                  <div className="project__tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <footer className="projects__footer">
          <Link to="/projects" className="projects__link">
            <span>View All Projects</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default Projects;