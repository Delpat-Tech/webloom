import { ReactNode } from 'react';

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

export interface InfiniteScrollItem {
  content: React.ReactNode;
  link?: string;
  ctaText?: string;
}

export interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinHeight?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: "down" | "up";
  pauseOnHover?: boolean;
  columns?: number;
} 