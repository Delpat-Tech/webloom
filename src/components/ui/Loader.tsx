import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface LoaderProps {
  show: boolean;
  onFadeOut?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ show, onFadeOut }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect theme
    const checkTheme = () => {
      if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || document.documentElement.classList.contains('dark')) {
          setIsDark(true);
        } else {
          setIsDark(false);
        }
      }
    };

    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!show) {
    // Call onFadeOut when loader is hidden
    if (onFadeOut) {
      onFadeOut();
    }
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 ${isDark ? 'bg-black/90' : 'bg-white/95'}`}>
      <div className="loader" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className={`box ${isDark ? 'dark-box' : 'light-box'}`} />
        <div className={`box ${isDark ? 'dark-box' : 'light-box'}`} />
        <div className={`box ${isDark ? 'dark-box' : 'light-box'}`} />
        <div className={`box ${isDark ? 'dark-box' : 'light-box'}`} />
        <div className={`box ${isDark ? 'dark-box' : 'light-box'}`} />
        <div className="logo">
          <Logo variant="png" size="lg" showText={false} />
        </div>
      </div>
    </div>
  );
};

export default Loader;