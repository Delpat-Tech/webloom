import { useState, useEffect } from 'react';

export interface MobileOptimizationConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  shouldReduceAnimations: boolean;
  devicePixelRatio: number;
  screenWidth: number;
  screenHeight: number;
}

export const useMobileOptimization = (): MobileOptimizationConfig => {
  const [config, setConfig] = useState<MobileOptimizationConfig>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    shouldReduceAnimations: false,
    devicePixelRatio: 1,
    screenWidth: 1920,
    screenHeight: 1080,
  });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      
      // Detect mobile device
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      // Determine screen size categories
      const isMobile = isMobileDevice || width <= 768;
      const isTablet = !isMobile && width <= 1024;
      const isDesktop = !isMobile && !isTablet;
      
      // Determine if animations should be reduced
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const shouldReduceAnimations = prefersReducedMotion || isMobile;
      
      setConfig({
        isMobile,
        isTablet,
        isDesktop,
        shouldReduceAnimations,
        devicePixelRatio: Math.min(dpr, isMobile ? 1 : 2), // Cap DPR for mobile
        screenWidth: width,
        screenHeight: height,
      });
    };

    updateConfig();
    
    // Listen for changes
    window.addEventListener('resize', updateConfig);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', updateConfig);
    
    return () => {
      window.removeEventListener('resize', updateConfig);
      mediaQuery.removeEventListener('change', updateConfig);
    };
  }, []);

  return config;
};

// Performance optimization utilities
export const getOptimizedAnimationConfig = (isMobile: boolean) => ({
  // Framer Motion optimizations
  springConfig: {
    damping: isMobile ? 25 : 30,
    stiffness: isMobile ? 80 : 100,
    mass: isMobile ? 1.5 : 2,
  },
  
  // Animation durations
  duration: {
    fast: isMobile ? 0.2 : 0.3,
    normal: isMobile ? 0.4 : 0.6,
    slow: isMobile ? 0.8 : 1.2,
  },
  
  // GSAP optimizations
  gsapConfig: {
    duration: isMobile ? 0.4 : 0.6,
    ease: isMobile ? "power2.out" : "power3.out",
  },
  
  // Scroll optimizations
  scrollConfig: {
    touchMultiplier: isMobile ? 1.5 : 2,
    wheelMultiplier: isMobile ? 0.8 : 1,
    lerp: isMobile ? 0.15 : 0.1,
  },
});

// Utility to check if device supports WebGL
export const useWebGLSupport = () => {
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setSupportsWebGL(!!gl);
    } catch (e) {
      setSupportsWebGL(false);
    }
  }, []);
  
  return supportsWebGL;
}; 

/**
 * Utility to temporarily disable theme transitions during other animations
 * This helps prevent theme transitions from interfering with other animations
 */
export const disableThemeTransitions = (duration: number = 1000) => {
  if (typeof document !== 'undefined') {
    document.body.classList.add('animating');
    document.body.setAttribute('data-animating', 'true');
    
    setTimeout(() => {
      document.body.classList.remove('animating');
      document.body.removeAttribute('data-animating');
    }, duration);
  }
};

/**
 * Check if theme transitions are currently disabled
 */
export const areThemeTransitionsDisabled = (): boolean => {
  if (typeof document !== 'undefined') {
    return document.body.classList.contains('animating') || 
           document.body.hasAttribute('data-animating');
  }
  return false;
}; 