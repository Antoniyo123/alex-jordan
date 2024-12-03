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

  useEffect(() => {
    let currentIndex = 0;
    const intervalTime = 200; // Waktu antar huruf

    // Fungsi untuk menambahkan huruf satu per satu
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setVisibleText(prevText => prevText + fullText.charAt(currentIndex));
        currentIndex++;
      }
    };

    // Interval untuk memperbarui teks setiap intervalTime
    const interval = setInterval(() => {
      typeText();
    }, intervalTime);

    // Cleanup: Menghentikan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []); // Efek dijalankan sekali saat komponen pertama kali dimount

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <h1>{visibleText}</h1>
        <p>Portfolio Website</p>
        <div className="loader"></div>
      </div>
      <p className="copyright">
        &copy; {new Date().getFullYear()} Alex Jordan. All rights reserved.
      </p>
    </div>
  );
};

// Page Loader Component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

const AppContent = () => {
  const location = useLocation(); // Get current route
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
