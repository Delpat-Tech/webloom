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
    engagement: string;
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