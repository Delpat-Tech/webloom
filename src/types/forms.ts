import { ReactNode } from 'react';

export type QuizQuestionId = 'founder' | 'ops' | 'budget';
export interface QuizAnswers {
  founder: string;
  ops: string;
  budget: string;
};

export interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  description: string;

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

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    icon: React.ReactNode;
    service: 'mvp' | 'internal' | 'automation';
  }[];
}

export interface PartnerFormProps {
  onSuccess?: () => void;
  onError?: () => void;
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