export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule;
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[\d\s\-\(\)]{7,20}$/,
  url: /^https?:\/\/.+/,
  name: /^[a-zA-Z\s\-'\.]+$/,
  company: /^[a-zA-Z0-9\s&.,'\-]+$/,
};

// Common validation messages
export const VALIDATION_MESSAGES = {
  required: "This field is required",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  url: "Please enter a valid URL",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  name: "Please enter a valid name",
  company: "Please enter a valid company name",
  fileSize: (maxSize: number) => `File size must be less than ${maxSize}MB`,
  fileType: (types: string[]) => `File must be one of: ${types.join(", ")}`,
};

// Validate a single field
export function validateField(value: any, rules: ValidationRule): ValidationResult {
  const errors: string[] = [];

  // Required validation
  if (rules.required && (!value || (typeof value === "string" && value.trim() === ""))) {
    errors.push(VALIDATION_MESSAGES.required);
    return { isValid: false, errors };
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return { isValid: true, errors: [] };
  }

  // Length validations
  if (typeof value === "string") {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(VALIDATION_MESSAGES.minLength(rules.minLength));
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(VALIDATION_MESSAGES.maxLength(rules.maxLength));
    }
  }

  // Pattern validation
  if (rules.pattern && typeof value === "string" && !rules.pattern.test(value)) {
    // Use specific pattern messages if available
    if (rules.pattern === VALIDATION_PATTERNS.email) {
      errors.push(VALIDATION_MESSAGES.email);
    } else if (rules.pattern === VALIDATION_PATTERNS.phone) {
      errors.push(VALIDATION_MESSAGES.phone);
    } else if (rules.pattern === VALIDATION_PATTERNS.name) {
      errors.push(VALIDATION_MESSAGES.name);
    } else if (rules.pattern === VALIDATION_PATTERNS.company) {
      errors.push(VALIDATION_MESSAGES.company);
    } else if (rules.pattern === VALIDATION_PATTERNS.url) {
      errors.push(VALIDATION_MESSAGES.url);
    } else {
      errors.push(VALIDATION_MESSAGES.required);
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return { isValid: errors.length === 0, errors };
}

// Validate multiple fields
export function validateForm(data: any, validationRules: FieldValidation): {
  isValid: boolean;
  errors: { [fieldName: string]: string[] };
} {
  const errors: { [fieldName: string]: string[] } = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const fieldValue = data[fieldName];
    const validation = validateField(fieldValue, rules);
    
    if (!validation.isValid) {
      errors[fieldName] = validation.errors;
      isValid = false;
    }
  }

  return { isValid, errors };
}

// Common validation rules for different field types
export const COMMON_VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email,
  },
  phone: {
    required: false,
  },
  company: {
    required: false,
    maxLength: 100,
  },
  url: {
    required: false,
    pattern: VALIDATION_PATTERNS.url,
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  file: {
    required: false,
    custom: (file: File | null) => {
      if (!file) return null;
      
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return VALIDATION_MESSAGES.fileSize(10);
      }
      
      const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        return VALIDATION_MESSAGES.fileType(allowedTypes);
      }
      
      return null;
    },
  },
};

// Get first error message from validation result
export function getFirstError(errors: { [fieldName: string]: string[] }): string | null {
  for (const fieldErrors of Object.values(errors)) {
    if (fieldErrors.length > 0) {
      return fieldErrors[0];
    }
  }
  return null;
}

// Format validation errors for display
export function formatValidationErrors(errors: { [fieldName: string]: string[] }): string {
  const errorMessages = Object.values(errors).flat();
  return errorMessages.join(". ");
} 