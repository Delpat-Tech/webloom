'use client';

import { useEffect, useState } from 'react';

interface ThemeTransitionProps {
  isTransitioning: boolean;
  mousePosition: { x: number; y: number };
}

export default function ThemeTransition({ isTransitioning, mousePosition }: ThemeTransitionProps) {
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create overlay element if it doesn't exist
    if (!overlay) {
      const newOverlay = document.createElement('div');
      newOverlay.className = 'theme-transition-overlay';
      document.body.appendChild(newOverlay);
      setOverlay(newOverlay);
    }

    return () => {
      // Cleanup overlay on unmount
      if (overlay) {
        document.body.removeChild(overlay);
      }
    };
  }, [overlay]);

  useEffect(() => {
    if (overlay && isTransitioning) {
      // Update mouse position CSS variables
      overlay.style.setProperty('--mouse-x', `${mousePosition.x}px`);
      overlay.style.setProperty('--mouse-y', `${mousePosition.y}px`);
      
      // Activate overlay
      overlay.classList.add('active');
      
      // Add theme transitioning class to body for View Transition API
      document.body.classList.add('theme-transitioning');
      
             // Remove active class and body class after animation
       const timer = setTimeout(() => {
         overlay.classList.remove('active');
         document.body.classList.remove('theme-transitioning');
       }, 500);
      
      return () => {
        clearTimeout(timer);
        document.body.classList.remove('theme-transitioning');
      };
    }
  }, [isTransitioning, mousePosition, overlay]);

  return (
    <>
      {/* Ripple effect */}
      {isTransitioning && (
        <div
          className="fixed pointer-events-none z-[10000]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-0 h-0 bg-primary/20 rounded-full"
            style={{
              animation: 'circle-in-ripple 0.5s ease-out forwards',
              clipPath: 'circle(0% at center)',
            }}
          />
        </div>
      )}
    </>
  );
} 