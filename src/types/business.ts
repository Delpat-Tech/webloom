import { ReactNode } from 'react';

// shall this interface match the project interface in model Project.ts? 
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  persona: string;
  service: string;
  serviceId?: string;
  industry: string;
  results: string[];
  tech: string[];
  testimonial: string;
  client: string;
  timeline: string;
  hasCaseStudy?: boolean;
}

export interface CaseStudyGridProps {
  projects: Project[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  benefits: string[];
  icon: ReactNode;
  gradient: string;
  features: string[];
  timeline: string;
  outcome: string;
}

export interface ServiceCardProps {
  services: Service[];
  onLearnMore: (service: Service) => void;
}

export interface ServiceGridProps {
  services: Service[];
  isVisible: Record<string, boolean>;
  sectionId: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
}

export interface Tool {
  name: string;
  icon: ReactNode;
  reason: string;
}

export interface StackCategory {
  category: string;
  description: string;
  tools: Tool[];
}

export interface ToolsAndStackProps {
  techStack: StackCategory[];
}

export interface FilterOption {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface FilterOptions {
  personas: FilterOption[];
  services: FilterOption[];
  industries: FilterOption[];
}

export interface ProjectShowcaseProps {
  projects: Project[];
  filterOptions: FilterOptions;
}

export interface ServiceRecommendation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  startingPrice: string;
  timeline: string;
  engagementModel: string;
  engagementDescription: string;
  features: string[];
  matchScore: number;
  reasoning: string[];
} 