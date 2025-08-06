import { PortfolioItem } from '../portfolio-types';

export const emailAutomation: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'email-automation',
  cardTitle: 'Aditya Media: Boosting Email Deliverability by 50%',
  client: {
    name: 'ADITYA MEDIA LTD',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Ongoing',
    summary: 'A successful first project that led to a long-term relationship where we worked on several other automations together.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client needed to send bulk marketing emails, but their low deliverability rate (~60%) was destroying their domain\'s reputation and wasting marketing spend.',
    impact: {
      risk: 'Crippling their entire marketing and sales outreach due to being flagged as spam.',
      money: 'Significant marketing budget wasted on emails that never reached an inbox.',
    },
    previousSolution: 'Standard email practices that were ineffective at preventing high bounce rates.',
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an end-to-end email campaign system with a heavy focus on pre-send verification to protect and improve the client\'s domain authority.',
    smartMoment: 'The key innovation was building our own custom email verification tool from scratch. This went beyond simple API checks, performing deep lookups (MX records, SPF, DMARC) to scrub their list with high accuracy.',
    features: [
      'Custom deep-level email verification engine',
      'Bulk email sending via a custom SMTP server',
      'Extensive logging and automated stakeholder reports',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '90%',
      label: 'Email Deliverability Rate Achieved (Up from 60%)',
      icon: 'arrow-up',
    },
    otherMetrics: [
      'A 50% relative increase in email deliverability',
    ],
    qualitativeWins: [
      'Gave the marketing team the confidence to run large-scale campaigns without risking their core business infrastructure.',
    ],
    clientQuote: {
      text: 'I love your process of doing and thinking things.',
      attribution: 'Marketing Head, ADITYA MEDIA LTD',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: false,
    links: {
      caseStudy: '/proof/email-automation',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Express'],
    integrations: ['Mailchimp API', 'Custom SMTP'],
  },
};
