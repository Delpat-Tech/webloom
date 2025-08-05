import { ReactNode, CSSProperties, ComponentProps, AnchorHTMLAttributes, ButtonHTMLAttributes, TextareaHTMLAttributes } from 'react';

type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "gradient-monotone"
  | "gradient-outline"
  | "gradient-duotone"
  | "destructive"
  | "accent";

export type ButtonProps =
  | ({
      href: string;
      variant?: ButtonVariants;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      href?: undefined;
      variant?: ButtonVariants;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);
    
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
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
  variant?: 'svg'; // Only SVG is supported now
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showText?: boolean;
  className?: string;
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

export interface SimpleCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface CardTransform {
  translateX: number;
  scale: number;
  rotation: number;
  blur: number;
}

export interface FormFeedbackProps {
  type: "success" | "error" | "loading" | "info" | "warning";
  message: string;
  details?: string;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
} 