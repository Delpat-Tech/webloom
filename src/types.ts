import { ReactNode, CSSProperties, ComponentProps, AnchorHTMLAttributes, ButtonHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "gradient-monotone"
    | "gradient-outline"
    | "gradient-duotone"
    | "destructive"
    | "accent";
  href?: string;
}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}
export interface ClientLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  projects: number;
  x?: number; // Optional for custom positioning
  y?: number; // Optional for custom positioning
}

export interface GeoMapProps {
  clientLocations?: ClientLocation[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export interface TiltedCardProps {
  imageSrc?: ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: CSSProperties['height'];
  containerWidth?: CSSProperties['width'];
  imageHeight?: CSSProperties['height'];
  imageWidth?: CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
}

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "text" | "custom";
  variant?: "uppercase" | "tracking" | "gradient";
}

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export interface LogoProps {
  variant?: 'png' | 'svg';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  index: number;
  isTop: boolean;
  isInView: boolean;
  isHovered: boolean;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  onClick: (index: number) => void;
}

export interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  onStackComplete?: () => void;
}

export interface SimpleCardProps {
  children: ReactNode;
  className?: string;
}

export interface CardTransform {
  translateX: number;
  scale: number;
  rotation: number;
  blur: number;
}

export interface TimelineStep {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  icon: ReactNode;
  duration?: string;
  deliverables?: string[];
  color?: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
}

export interface RippleGridProps  {
  enableRainbow?: boolean;
  gridColor?: string;
  rippleIntensity?: number;
  gridSize?: number;
  gridThickness?: number;
  fadeDistance?: number;
  vignetteStrength?: number;
  glowIntensity?: number;
  opacity?: number;
  gridRotation?: number;
  mouseInteraction?: boolean;
  mouseInteractionRadius?: number;
};


// shall this interface match the project interface in model Project.ts? 
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  persona: string;
  service: string;
  industry: string;
  results: string[];
  tech: string[];
  testimonial: string;
  client: string;
  timeline: string;
}

export interface CaseStudyGridProps {
  projects: Project[];
}


export interface CostCalculatorProps {
  manualHours: number;
  setManualHours: (hours: number) => void;
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
  employeeCount: number;
  setEmployeeCount: (count: number) => void;
  currency: 'USD' | 'INR';
  setCurrency: (currency: 'USD' | 'INR') => void;
  roiData: {
    monthlySavings: number;
    yearlySavings: number;
    roi: number;
    breakEven: number;
  };
}

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQSection {
  category: string;
  questions: FAQ[];
}

export interface FAQAccordionProps {
  faqData: FAQSection[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  openFAQ: string | null;
  setOpenFAQ: (id: string | null) => void;
}

export interface FounderQuoteProps {
  quote?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface HeroProps  {
  title: string;
  subtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
};

export interface ThinkingCategory {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  articleCount: number;
  featured: string;
}

export interface HowWeThinkProps {
  categories: ThinkingCategory[];
}

export interface PartnerFormProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  timeline: string;
  budget: string;
  description: string;
  portfolio: File | null;
}

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

export interface ServiceTrack {
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
  serviceTracks: ServiceTrack[];
  onLearnMore: (service: ServiceTrack) => void;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  startingPrice: string;
  outcome: string;
  icon: ReactNode;
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
