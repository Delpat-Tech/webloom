import { PortfolioItem } from '../portfolio-types';

export const chartViewTradingModule: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'chart-view-trading-module',
  cardTitle: 'Omega Forex: A Custom Charting Module to Triple User Engagement',
  client: {
    name: 'Omega Forex',
    location: 'St. Vincent and the Grenadines',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Ongoing',
    summary: 'An ongoing, project-by-project relationship to enhance their core trading platform after the initial MVP and CRM success.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s trading platform lacked the professional-grade, customizable, real-time charting that all serious traders expect, making the product look amateurish and limiting its appeal.',
    impact: {
      money: 'High user churn and difficulty attracting experienced traders.',
      risk: 'Being perceived as a non-serious player in the competitive fintech space.',
    },
    previousSolution: 'Off-the-shelf charting solutions lacked the deep customization, iframe support, and ability to integrate infinite strategies that the client required.',
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a reusable, real-time charting component tailored to the client\'s specific needs, built on top of the industry-standard TradingView library.',
    smartMoment: 'Instead of reinventing the wheel, we leveraged the official TradingView library and focused our efforts on building a robust data integration layer and a clean API. This delivered a world-class result in a fraction of the time.',
    features: [
      'Deep integration with the TradingView library',
      'Real-time data rendering via WebSockets from their custom feed',
      'Fully customizable chart intervals and proprietary indicators',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '300%',
      label: 'Increase in Average User Session Time',
      icon: 'arrow-up',
    },
    otherMetrics: [
      'Enabled a key feature requested by 80% of power users',
    ],
    qualitativeWins: [
      'Significantly enhanced the platform\'s professional look and feel.',
      'Boosted user confidence and retention.',
      'Delivered a reusable component for future application development.',
    ],
    clientQuote: {
      text: 'Delpat delivered a charting service that was better, more accurate, and more useful than any off-the-shelf solution we could find.',
      attribution: 'Omega Forex Tech Lead',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'Custom',
    featured: false,
    links: {
      // NOTE: No live link for a specific module, link to the main platform.
      live: 'https://omega-forex.com', 
      caseStudy: '/proof/chart-view-trading-module',
    },
  },
  techStack: {
    frontend: ['React'],
    backend: ['Node.js'],
    integrations: ['TradingView Library', 'WebSocket'],
  },
};
