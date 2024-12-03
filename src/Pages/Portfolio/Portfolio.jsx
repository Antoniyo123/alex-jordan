import React from 'react';
import '../Portfolio/Portfolio.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';

const Portfolio = () => {
  // const projects = [
  //   {
  //     title: "E-Commerce Dashboard",
  //     description: "A modern dashboard for tracking sales and inventory",
  //     tags: ["React", "Node.js", "MongoDB"],
  //     image: require('../../img/post_2.jpg')
  //   },
  //   {
  //     title: "Mobile Banking App",
  //     description: "Secure and intuitive banking application",
  //     tags: ["React Native", "Firebase"],
  //     image: require('../../img/post_2.jpg')
  //   },
  //   // {
  //   //   title: "Portfolio Website",
  //   //   description: "Personal portfolio with minimalist design",
  //   //   tags: ["React", "CSS3", "JavaScript"],
  //   //   image: require('../../img/post_2.jpg')
  //   // }
  // ];

  return (
    <div className="portfolio-container">
      <Hero />
      <About />
      <Projects/>
      <Contact />
    </div>
  );
};

export default Portfolio;