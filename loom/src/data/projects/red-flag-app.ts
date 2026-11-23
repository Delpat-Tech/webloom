import { PortfolioItem } from '../portfolio-types';

export const redFlagApp: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'red-flag-app',
  cardTitle: 'Redflag.io: From Idea to AI-Powered SaaS in 4 Weeks',
  client: {
    name: 'Jason (saved02)',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client had a validated product idea for an AI relationship analyzer but lacked the technical team to handle the entire execution stack: frontend, backend, AI, and payments.',
    impact: {
      risk: 'The idea would remain a pure concept without an execution partner, generating zero revenue and having zero market validation.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build and launch a fully functional, monetizable, AI-powered mobile/web app from the ground up in an accelerated timeframe.',
    smartMoment: 'We leveraged a powerful low-code/no-code stack (Draftbit, Supabase, Stripe) to build the entire application at a fraction of the time and cost of traditional code, making the project feasible for a solo founder.',
    features: [
      'Full-stack build with user authentication',
      'Stripe subscription integration with free trials',
      'Tiered Claude AI integration for text/image analysis',
      'Interactive AI advisor chat and quizzes',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '4',
      label: 'Weeks from Idea to Live App with Payments',
      icon: 'check',
    },
    qualitativeWins: [
      'Turned a founder\'s vision into a real, revenue-generating product.',
      'Demonstrated mastery of the modern low-code and AI integration stack.',
    ],
    clientQuote: {
      text: 'Very dedicated, great communication.',
      attribution: 'Jason, Founder of Redflag.io',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: true,
    links: {
      live: 'https://redflag.io', // NOTE: Placeholder URL
      caseStudy: '/proof/red-flag-app',
    },
  },
  techStack: {
    platforms: ['Draftbit', 'Supabase'],
    frontend: ['Draftbit'],
    backend: ['Supabase Edge Functions', 'Make.com'],
    database: ['Supabase (PostgreSQL)'],
    integrations: ['Stripe', 'Claude AI (Groq & Anthropic)', 'Google Cloud Vision'],
  },
};
