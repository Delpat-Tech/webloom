// Client-side API configuration (safe for browser)
export const API_CONFIG = {
  // Internal API endpoints
  ENDPOINTS: {
    LEADS: '/api/leads',
    PROJECTS: '/api/projects',
    TESTIMONIALS: '/api/testimonials',
    PERSONAS: '/api/personas',
  },
  
  // External service URLs (for reference)
  EXTERNAL: {
    CALENDLY: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/kaushikiagrawal283/30min',
    WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/919876543210',
    ANALYTICS: {
      GOOGLE: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
      HOTJAR: process.env.NEXT_PUBLIC_HOTJAR_ID,
    },
  },
  
  // Placeholder image service
  PLACEHOLDER: {
    BASE_URL: '/api/placeholder',
    getImage: (width: number, height: number) => `${API_CONFIG.PLACEHOLDER.BASE_URL}/${width}/${height}`,
    getAvatar: (size: number = 60) => `${API_CONFIG.PLACEHOLDER.BASE_URL}/${size}/${size}`,
  },
} as const;

// API utility functions (client-side only)
export const apiUtils = {
  // Fetch wrapper with error handling
  async fetch(endpoint: string, options?: RequestInit) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  },

  // POST request helper
  async post(endpoint: string, data: any) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // GET request helper
  async get(endpoint: string, params?: Record<string, string>) {
    const url = new URL(endpoint, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return this.fetch(url.toString());
  },
}; 