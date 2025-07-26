// Google Analytics 4 Configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom event tracking for Delpat-specific actions
export const trackServiceView = (serviceName: string) => {
  event({
    action: 'view_service',
    category: 'engagement',
    label: serviceName,
  });
};

export const trackCTAClick = (ctaType: string, page: string) => {
  event({
    action: 'cta_click',
    category: 'conversion',
    label: `${ctaType}_${page}`,
  });
};

export const trackContactForm = (formType: string) => {
  event({
    action: 'contact_form_submit',
    category: 'conversion',
    label: formType,
  });
};

export const trackProjectView = (projectId: string, projectName: string) => {
  event({
    action: 'view_project',
    category: 'engagement',
    label: `${projectId}_${projectName}`,
  });
};

export const trackCalendlyBooking = () => {
  event({
    action: 'calendly_booking',
    category: 'conversion',
    label: 'discovery_call',
  });
}; 