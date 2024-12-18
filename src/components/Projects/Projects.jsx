import React from 'react';
import { Link } from 'react-router-dom';  // Impor Link dari react-router-dom

import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "Bali Social Integrated Website",
      year: "2022",
      category: "Web Development",
      description: "A concise description of the first project showcasing its key features and innovative approach.",
      image: require('../../img/project1.png')
    },
    {
      title: "Carbon Free Viaje Website",
      year: "2022",
      category: "Web Development",
      description: "Brief insight into the second project, highlighting its unique design and creative solution.",
      image: require('../../img/project2.png')
    }
  ];

  return (
    <section className="projects">
      <div className="projects__noise"></div>
      <div className="projects__container">
        <header className="projects__header">
          <h2>Featured Work</h2>
          <span className="projects__year">2022—2024</span>
        </header>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <article className="project" key={index}>
              <div className="project__image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="project__overlay">
                  <span className="project__view">View Project</span>
                </div>
              </div>
              
              <div className="project__content">
                <div className="project__meta">
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
        
        <footer className="projects__footer">
          {/* Gunakan Link untuk navigasi */}
          <Link to="/projects" className="projects__link">
            View All Projects
            <span className="projects__link-arrow">→</span>
          </Link>
        </footer>

      </div>
    </section>
  );
};

export default Projects;