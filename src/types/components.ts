import { ReactNode } from 'react';
import { Testimonial } from './business';

// Enhanced Testimonials Carousel
export interface EnhancedTestimonial extends Testimonial {
  projectTitle?: string;
  projectId?: string;
  metrics?: string[];
  serviceTrack?: string;
  headlineMetric?: {
    value: string;
    label: string;
    icon: string;
  };
}

export interface EnhancedTestimonialsCarouselProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

// GeoMap Component
export interface ClientLocation {
  id: number;
  name: string;
  country?: string;
  lat: number;
  lng: number;
  x?: number;
  y?: number;
  imageSrc?: string;
}

export interface GeoMapProps {
  clientLocations?: ClientLocation[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

// Header Component
export interface HeaderProps {
  showHeader?: boolean;
}

// Calendly Embed
export interface CalendlyEmbedProps {
  url: string;
  width?: string | number;
  height?: string | number;
  title?: string;
  variant?: 'full' | 'widget';
  inModal?: boolean;
  enableScroll?: boolean;
}

// Contact Components
export interface ContactQualificationQuizProps {
  onRecommendation?: (serviceType: string, tier: string) => void;
  selectedGoal?: string;
}

export interface ContactFormProps {
  selectedGoal?: string;
  selectedTier?: string;
}

// Engagement Models
export interface EngagementModel {
  // Add engagement model props here
}

// How We Think
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Elastic Slider (moved to ui.ts)

// Portfolio Card
export interface PortfolioCardProps {
  // Add portfolio card props here
}

// Process Overview
export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

export interface ProcessTimelineProps {
  steps: ProcessStep[];
}

// Scroll Timeline
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: ReactNode;
  color: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
}

// Pricing Tiers
export interface PricingTierData {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  outcome: string;
  popular?: boolean;
}

export interface PricingTiers {
  [key: string]: {
    [key: string]: PricingTierData;
  };
}

export interface Goal {
  id: 'mvp' | 'internal' | 'automation';
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

export interface PricingTiersSectionProps {
  selectedGoal: 'mvp' | 'internal' | 'automation';
  setSelectedGoal: (goal: 'mvp' | 'internal' | 'automation') => void;
  selectedTier: 'lite' | 'full' | 'scalable';
  setSelectedTier: (tier: 'lite' | 'full' | 'scalable') => void;
  goals: Goal[];
  pricingTiers: PricingTiers;
}

// Testimonials Carousel
export interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

export interface CarouselItemProps {
  testimonial: Testimonial;
  isActive: boolean;
}
