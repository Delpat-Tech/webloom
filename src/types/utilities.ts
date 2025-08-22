// Form Validation
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidation {
  field: string;
  rules: ValidationRule[];
}

// Performance Monitoring
export interface PerformanceMetrics {
  // Add performance metrics interface here
}

// Analytics
export interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}

// Scroll Utilities
export interface ScrollToTopOptions {
  // Add scroll to top options here
}

// Mobile Optimization
export interface MobileOptimizationConfig {
  // Add mobile optimization config here
}
