import { ReactNode } from 'react';

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
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

export interface PersonaCardProps {
  title: string;
  painPoints: string[];
  solutions: string[];
  ctaLabel: string;
  ctaLink: string;
  icon: React.ReactNode;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export interface PersonaSectionProps {
  className?: string;
} 