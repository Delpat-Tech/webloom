import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  smooth?: boolean;
  offset?: number;
}

export const useScrollToTop = (options: ScrollToTopOptions = {}) => {
  const pathname = usePathname();
  const { behavior = 'smooth', smooth = true, offset = 0 } = options;

  useEffect(() => {
    // Small delay to ensure the page has rendered
    const timer = setTimeout(() => {
      try {
        window.scrollTo({
          top: offset,
          left: 0,
          behavior: smooth ? 'smooth' : 'auto'
        });
      } catch (error) {
        // Fallback for browsers that don't support smooth scrolling
        console.warn('Smooth scrolling not supported, using instant scroll');
        window.scrollTo(0, offset);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, behavior, smooth, offset]);
}; 