import { ReactNode, CSSProperties, ComponentProps, AnchorHTMLAttributes, TextareaHTMLAttributes } from 'react';

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

// Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Loader
export interface LoaderProps {
  show: boolean;
  onFadeOut?: () => void;
}

// Cookie Manager & Consent
export interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export interface CookieManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Elastic Slider
export interface ElasticSliderProps {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onValueChange?: (value: number) => void;
}

export interface SliderProps {
  defaultValue: number;
  startingValue: number;
  maxValue: number;
  isStepped: boolean;
  stepSize: number;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  onValueChange?: (value: number) => void;
}

// Stepper
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
}

export interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

export interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

export interface StepProps {
  children: ReactNode;
}