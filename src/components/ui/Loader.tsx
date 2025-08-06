import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Logo from './Logo';

interface LoaderProps {
  show: boolean;
  onFadeOut?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ show, onFadeOut }) => {
  const [isDark, setIsDark] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    // Detect theme immediately
    const checkTheme = () => {
      if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        const hasDarkClass = document.documentElement.classList.contains('dark');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Priority: localStorage > class > system preference
        let isDarkMode = false;
        if (storedTheme) {
          isDarkMode = storedTheme === 'dark';
        } else if (hasDarkClass) {
          isDarkMode = true;
        } else {
          isDarkMode = prefersDark;
        }
        
        setIsDark(isDarkMode);
        setIsThemeLoaded(true);
      }
    };

    // Check theme immediately
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  // Handle onFadeOut in useEffect to avoid setState during render
  useEffect(() => {
    if (!show && onFadeOut) {
      onFadeOut();
    }
  }, [show, onFadeOut]);

  if (!show || !isThemeLoaded) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-blue-50 to-white'}`}>
      {/* Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 relative">
          <DotLottieReact
            src="/loader Animation.json"
            loop
            autoplay
            style={{
              width: '100%',
              height: '100%',
              filter: isDark ? 'brightness(0.8) contrast(1.2)' : 'brightness(1) contrast(1)'
            }}
          />
          
          {/* Logo positioned in the center of animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`p-6 rounded-full backdrop-blur-md shadow-lg ${
              isDark 
                ? 'bg-black/40 border-2 border-gray-600/60' 
                : 'bg-white/40 border-2 border-gray-400/60'
            }`}>
              <Logo size="xl" showText={false} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-32 right-32 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-32 left-32 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default Loader;