import React from 'react';
import './Loader.css';

const Loader = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return children;
};

export default Loader;