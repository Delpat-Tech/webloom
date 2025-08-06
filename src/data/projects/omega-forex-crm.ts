import { PortfolioItem } from '../portfolio-types';

export const omegaForexCrm: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'omega-forex-crm',
  cardTitle: 'Omega Forex: A Custom CRM Saving ₹3 Lakhs Monthly',
  client: {
    name: 'Omega Forex',
    location: 'St. Vincent and the Grenadines',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Follow-up',
    summary: 'Building on the success of the trading app, this project solidified our role as their end-to-end execution partner for both external products and internal systems.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client anticipated their new app\'s growth would make their manual, spreadsheet-based operations for sales, support, and user account management completely unsustainable.',
    impact: {
      time: 'An estimated 30 hours per week of manual work.',
      money: 'An estimated ₹2-3 Lakhs per month in operational costs.',
      risk: 'Inability to scale operations, poor customer service, and failure to meet financial compliance standards.',
    },
    previousSolution: 'A combination of manual tracking in spreadsheets which was no longer viable for their projected growth.',
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a dual-purpose platform: an internal CRM for staff and a user-facing portal for customers to self-manage their accounts, deposits, and withdrawals.',
    smartMoment: 'We built the CRM with direct hooks into the trading app\'s database, allowing support staff to see a client\'s live trading activity while handling a support ticket—a unique feature not available in off-the-shelf CRMs.',
    features: [
      'Internal CRM for unified client management',
      'Public-facing user portal for account self-management',
      'Integrated trading logic for live client activity view',
      'Automated onboarding and support workflows',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '30+',
      label: 'Hours of Manual Work Saved Per Week',
      icon: 'arrow-down',
    },
    otherMetrics: [
      'Reduced operational costs by an estimated ₹2-3 Lakhs per month',
      'Increased lead conversion rate by 30%',
    ],
    qualitativeWins: [
      'Provided a single source of truth for all client data',
      'Achieved better compliance with financial regulations',
      'Improved the end-user experience with self-service features',
    ],
    clientQuote: {
      text: 'Users are loving the platform. The new features reflect their habits and usability, making it easy to learn the interface.',
      attribution: 'Omega Forex Team',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Internal OS',
    featured: true,
    links: {
      live: 'https://omega-crm.vercel.app',
      caseStudy: '/proof/omega-forex-crm',
    },
  },
  techStack: {
    frontend: ['Next.js', 'Tailwind CSS'],
    backend: ['Node.js'],
    database: ['MongoDB'],
    deployment: ['Vercel'],
  },
};
