import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 font-sans flex flex-col">
      <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster here */}
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Dashboard darkMode={darkMode} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
