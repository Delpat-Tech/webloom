// ============================================================================
// MAIN INDEX FILE - Exports commonly used items from the project
// ============================================================================

// ============================================================================
// TYPES - All types are available through the types index
// ============================================================================
export * from './types';

// ============================================================================
// UI COMPONENTS - Most commonly used UI components
// ============================================================================
export { default as Button } from './components/ui/Button';
export { default as Input } from './components/ui/Input';
export { default as TextArea } from './components/ui/TextArea';
export { default as Heading } from './components/ui/Heading';
export { default as Link } from './components/ui/Link';
export { default as SimpleCard } from './components/ui/SimpleCard';
export { default as Card } from './components/ui/Card';
export { default as Timeline } from './components/ui/Timeline';
export { default as ScrollStack, ScrollStackItem } from './components/ui/ScrollStack';
export { default as Stepper, Step } from './components/ui/Stepper';
export { default as FormFeedback, useFormFeedback } from './components/ui/FormFeedback';
export { default as ElasticSlider } from './components/ui/ElasticSlider';
export { default as Loader } from './components/ui/Loader';
export { default as ScrollToTop } from './components/ui/ScrollToTop';
export { default as CookieConsent } from './components/ui/CookieConsent';
export { default as CookieManager } from './components/ui/CookieManager';
export { default as Modal } from './components/ui/Modal';

// ============================================================================
// LAYOUT COMPONENTS - Layout and structural components
// ============================================================================
export { default as Header } from './components/layout/Header';
export { default as Footer } from './components/layout/Footer';
export { default as ClientLayout } from './components/layout/ClientLayout';
export { default as LenisProvider } from './components/layout/LenisProvider';
export { default as Container } from './components/layout/Container';
export { default as Grid } from './components/layout/Grid';

// ============================================================================
// SECTION COMPONENTS - Page sections and content components
// ============================================================================
export { default as Hero } from './components/sections/Hero';
export { default as CTASection } from './components/sections/CTASection';
export { default as ContactForm } from './components/sections/ContactForm';
export { default as ContactQualificationQuiz } from './components/sections/ContactQualificationQuiz';
export { default as PartnerForm } from './components/sections/PartnerForm';
export { default as TestimonialsCarousel } from './components/sections/TestimonialsCarousel';
export { default as ProjectShowcase } from './components/sections/ProjectShowcase';
export { default as PortfolioShowcase } from './components/sections/PortfolioShowcase';
export { default as CaseStudyGrid } from './components/sections/CaseStudyGrid';
export { default as ServicesGrid } from './components/sections/ServicesGrid';
export { default as ServiceRecommender } from './components/sections/ServiceRecommender';
export { default as PricingTiers } from './components/sections/PricingTiers';
export { default as CostCalculator } from './components/sections/CostCalculator';
export { default as FAQAccordion } from './components/sections/FAQAccordion';
export { default as InfiniteScroll } from './components/sections/InfiniteScroll';
export { default as PersonaSection } from './components/sections/PersonaSection';
export { default as HowWeThink } from './components/sections/HowWeThink';
export { default as ToolsAndStack } from './components/sections/ToolsAndStack';
export { default as TrustSignals } from './components/sections/TrustSignals';
export { default as SocialProof } from './components/sections/SocialProof';
export { default as Team } from './components/sections/Team';
export { default as CoreValues } from './components/sections/CoreValues';
export { default as Culture } from './components/sections/Culture';
export { default as DelpatEthos } from './components/sections/DelpatEthos';
export { default as EngagementModels } from './components/sections/EngagementModels';
export { default as ProcessOverview } from './components/sections/ProcessOverview';
export { ScrollTimeline } from './components/sections/ScrollTimeline';
export { default as MagicBento } from './components/sections/MagicBento';
export { default as AddOnsList } from './components/sections/AddOnsList';
export { default as CalendlyEmbed } from './components/sections/CalendlyEmbed';
export { default as FounderQuote } from './components/sections/FounderQuote';
export { default as GeoMap } from './components/sections/GeoMap';

// ============================================================================
// ANALYTICS COMPONENTS - Analytics and tracking components
// ============================================================================
export { default as AnalyticsProvider } from './components/analytics/AnalyticsProvider';
export { default as GoogleAnalytics } from './components/analytics/GoogleAnalytics';
export { default as Hotjar } from './components/analytics/Hotjar';
export { default as PerformanceMonitor } from './components/analytics/PerformanceMonitor';

// ============================================================================
// HOOKS - Custom React hooks
// ============================================================================
export { useScrollToTop } from './hooks/useScrollToTop';
export { useMobileOptimization, getOptimizedAnimationConfig } from './hooks/useMobileOptimization';
export { useAnalytics } from './hooks/useAnalytics';

// ============================================================================
// UTILITIES - Utility functions
// ============================================================================
export { cn } from './utils/cn';
export { validateForm, COMMON_VALIDATION_RULES, getFirstError } from './utils/formValidation';
export { lockBodyScroll, isBodyScrollLocked } from './utils/scrollLock';
export { scrollToTop, scrollToElement, isSmoothScrollingSupported } from './utils/scrollUtils';
export { pageview, event, trackContactForm, trackCTAClick, trackServiceView, trackProjectView, trackCalendlyBooking } from './lib/analytics';
export { getCookieConsent, setCookieConsent, clearCookieConsent } from './lib/cookieConsent';

// ============================================================================
// API & DATA - API utilities and data functions
// ============================================================================
export { API_CONFIG, apiUtils } from './lib/api-client';
export { DatabaseService } from './lib/api';
export { generateMetadata, generateDynamicMetadata } from './lib/metadata';
export { portfolioItems, type PortfolioItem } from './data/portfolio-data';
export { getFeaturedCaseStudies } from './data/case-studies';

// ============================================================================
// MODELS - Data models and types
// ============================================================================
export type { ILead } from './lib/models/Lead';
export type { IProject } from './lib/models/Project';
export type { ITestimonial } from './lib/models/Testimonial';
export type { ICaseStudy } from './lib/models/CaseStudy'; 