/**
 * Smoothly scrolls to the top of the page
 * @param options - Scroll options
 */
export const scrollToTop = (options: {
  behavior?: ScrollBehavior;
  smooth?: boolean;
  offset?: number;
} = {}) => {
  const { behavior = 'smooth', smooth = true, offset = 0 } = options;

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
};

/**
 * Smoothly scrolls to a specific element
 * @param elementId - The ID of the element to scroll to
 * @param options - Scroll options
 */
export const scrollToElement = (
  elementId: string, 
  options: {
    behavior?: ScrollBehavior;
    smooth?: boolean;
    offset?: number;
  } = {}
) => {
  const { behavior = 'smooth', smooth = true, offset = 0 } = options;
  const element = document.getElementById(elementId);

  if (element) {
    try {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        left: 0,
        behavior: smooth ? 'smooth' : 'auto'
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      console.warn('Smooth scrolling not supported, using instant scroll');
      const elementPosition = element.offsetTop - offset;
      window.scrollTo(0, elementPosition);
    }
  }
};

/**
 * Checks if smooth scrolling is supported by the browser
 */
export const isSmoothScrollingSupported = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style;
}; 