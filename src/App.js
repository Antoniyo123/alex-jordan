import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Portfolio from './Pages/Portfolio/Portfolio';
import AboutMe from './components/AbouMe/AboutMe';
import ContactMe from './components/ContactMe/ContactMe';
import ProjectMe from './components/ProjectMe/ProjectMe';

// Splash Screen Component
const SplashScreen = () => {
  const [visibleText, setVisibleText] = useState('');
  const fullText = 'Alex Jordan';
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const intervalTime = 150; 
  
    const typeText = () => {
      if (currentIndex < fullText.length) {
        // This ensures the entire word is added at once when it's not a single character
        setVisibleText(prevText => fullText.slice(0, currentIndex + 1));
        currentIndex++;
      }
    };
  
    const interval = setInterval(typeText, intervalTime);
    return () => clearInterval(interval);
  }, []);

  // Dot loading animation
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  const renderDots = () => {
    return (
      <div className="loading-dots">
        {[0, 1, 2].map((dot) => (
          <span 
            key={dot} 
            className={`dot ${dot < dotCount ? 'active' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="splash-screen">
      <div className="splash-overlay"></div>
      <div className="splash-content">
        <div className="name-wrapper">
          <h1 className="name-text">
            {visibleText}
            <span className="cursor">|</span>
          </h1>
        </div>
        <p className="subtitle">Portfolio Website</p>
        {renderDots()}
      </div>
      <p className="copyright__splash">
        &copy; {new Date().getFullYear()} Alex Jordan. All Rights Reserved.
      </p>
    </div>
  );
};

// Enhanced Page Loader Component
const PageLoader = () => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="page-loader">
      <div className="loader-container">
        <div className="loading-dots">
          {[0, 1, 2].map((dot) => (
            <span 
              key={dot} 
              className={`dot ${dot === activeDot ? 'active' : ''}`}
            />
          ))}
        </div>
        <p className="loading-text">Loading</p>
      </div>
    </div>
  );
};


const AppContent = () => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // Trigger page loader on route change
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000); // Simulated loading time for page transition

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="App">
      {isPageLoading && <PageLoader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<ProjectMe />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<ContactMe />} />
      </Routes>
    </div>
  );
};

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;