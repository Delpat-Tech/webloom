import { PortfolioItem } from '../portfolio-types';

export const telegramCrm: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'telegram-crm',
  cardTitle: 'Live Long Wealth: The OS for a Paid Trading Community',
  client: {
    name: 'Live Long Wealth',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Ongoing',
    summary: 'A major, multi-phase project to build the core operational software for the client\'s business. Phase 2 is currently in progress.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client was running a paid Telegram trading community and faced a nightmare of manual work: tracking Razorpay payments, adding/removing users, and sending renewal reminders.',
    impact: {
      time: 'Massive administrative overhead for community managers.',
      money: 'Significant revenue leakage from missed renewals and manual errors.',
      risk: 'An unscalable business model and poor user experience for a paying community.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a powerful, centralized CRM to automate the entire lifecycle of a paid Telegram subscription, designed to scale to thousands of users.',
    smartMoment: 'The architecture\'s use of passwordless, OTP-based logins via WhatsApp dramatically simplifies user onboarding, while webhook-driven integrations ensure the entire system is event-driven and real-time.',
    features: [
      'Razorpay payment integration with automated confirmations',
      'OTP-based WhatsApp login',
      'Role-based dashboards (Admin, Sales, Support)',
      'Automated subscription lifecycle management (reminders, expiry)',
      'Invite link attribution for sales tracking',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '50%',
      label: 'Faster User Onboarding vs. Manual Methods (Expected)',
      icon: 'arrow-down',
    },
    otherMetrics: [
      '20% expected reduction in churn via automated reminders',
      '70% target payment funnel completion rate',
    ],
    qualitativeWins: [
      'Building the core operational software that runs the client\'s entire business.',
      'Showcasing our ability to think like a product company, not just a service agency.',
    ],

  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Mixed',
    serviceTrack: 'Custom',
    featured: true,
    links: {
      caseStudy: '/proof/telegram-crm',
    },
  },
  techStack: {
    frontend: ['Bootstrap', 'htmx'],
    backend: ['Django', 'Django Rest Framework'],
    database: ['PostgreSQL'],
    deployment: ['Docker', 'Nginx', 'Hetzner'],
    integrations: ['Razorpay', 'WhatsApp Cloud API', 'Telegram Bot API'],
  },
};
