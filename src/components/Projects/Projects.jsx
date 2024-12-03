import React from 'react';
import './Projects.css';

const Projects = ({ projects }) => {
  return (
    <section className="featured-works">
      <div className="container">
        <div className="section-header">
          <h2>Featured Work</h2>
          <a href="#" className="see-more">See More</a>
        </div>
        <div className="works-grid">
          <div className="work-item landscape">
            <div className="work-image">
              <img src={require('../../img/post_2.jpg')} alt="Project 1"/>
              <h3 className="project-title">Web Design Project</h3>
            </div>
            <div className="work-details">
              <div className="work-meta">
                <span>2023</span>
                <span>Web Design</span>
              </div>
              <p>A concise description of the first project showcasing its key features and innovative approach.</p>
            </div>
          </div>
          <div className="work-item landscape">
            <div className="work-image">
              <img src={require('../../img/post_1.jpg')} alt="Project 2"/>
              <h3 className="project-title">Branding Project</h3>
            </div>
            <div className="work-details">
              <div className="work-meta">
                <span>2022</span>
                <span>Branding</span>
              </div>
              <p>Brief insight into the second project, highlighting its unique design and creative solution.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;