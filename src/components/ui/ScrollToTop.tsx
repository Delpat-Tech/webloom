'use client';

import { useScrollToTop } from '@/hooks/useScrollToTop';

const ScrollToTop = () => {
  useScrollToTop();
  
  // This component doesn't render anything, it just handles the scroll behavior
  return null;
};

export default ScrollToTop; 