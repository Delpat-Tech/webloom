import { useCallback } from 'react';
import { 
  trackServiceView, 
  trackCTAClick, 
  trackContactForm, 
  trackProjectView, 
  trackCalendlyBooking,
  event 
} from '@/lib/analytics';

export const useAnalytics = () => {
  const trackService = useCallback((serviceName: string) => {
    trackServiceView(serviceName);
  }, []);

  const trackCTA = useCallback((ctaType: string, page: string) => {
    trackCTAClick(ctaType, page);
  }, []);

  const trackForm = useCallback((formType: string) => {
    trackContactForm(formType);
  }, []);

  const trackProject = useCallback((projectId: string, projectName: string) => {
    trackProjectView(projectId, projectName);
  }, []);

  const trackBooking = useCallback(() => {
    trackCalendlyBooking();
  }, []);

  const trackCustomEvent = useCallback((action: string, category: string, label?: string, value?: number) => {
    event({ action, category, label, value });
  }, []);

  return {
    trackService,
    trackCTA,
    trackForm,
    trackProject,
    trackBooking,
    trackCustomEvent,
  };
}; 