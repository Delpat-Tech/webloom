/**
 * Locks body scrolling to prevent background page scrolling
 * @param lock - Whether to lock or unlock scrolling
 */
export const lockBodyScroll = (lock: boolean = true) => {
  if (typeof window === 'undefined') return;

  if (lock) {
    // Store current scroll position
    const scrollY = window.scrollY;
    
    // Add styles to prevent scrolling
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    
    // Store scroll position for restoration
    document.body.setAttribute('data-scroll-y', scrollY.toString());
  } else {
    // Restore scroll position and styles
    const scrollY = document.body.getAttribute('data-scroll-y');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    
    // Restore scroll position
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
    }
    
    // Clean up
    document.body.removeAttribute('data-scroll-y');
  }
};

/**
 * Checks if body scroll is currently locked
 */
export const isBodyScrollLocked = (): boolean => {
  if (typeof window === 'undefined') return false;
  return document.body.style.position === 'fixed';
}; 