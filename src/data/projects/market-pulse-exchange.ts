import { PortfolioItem } from '../portfolio-types';

export const marketPulseExchange: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'market-pulse-exchange',
  cardTitle: 'Market Pulse: An Integrated Dashboard for Indian Traders',
  client: {
    name: 'Market Pulse',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Ongoing',
    summary: 'A dynamic partnership where we provide the core technical rails for the client\'s strategic vision, enabling them to explore future collaborations.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'Indian retail traders were overwhelmed using multiple disconnected tools for charting, screening (Chartink), and brokerage (Dhan), leading to missed opportunities and analysis paralysis.',
    impact: {
      time: 'Wasted time switching between browser tabs and apps, leading to missed entry points on trades.',
      money: 'The client had a vision for a SaaS platform but was unable to launch the MVP to start generating revenue.',
      risk: 'A great product idea would remain unexecuted without a technical partner.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an MVP of an integrated analytics dashboard that fuses real-time brokerage data with actionable signals from a popular third-party screener.',
    smartMoment: 'We used n8n to create a robust webhook-based workflow, processing signals from Chartink in real-time without building a complex polling engine. This saved significant development time and budget.',
    features: [
      'Dhan brokerage API integration for live data',
      'Chartink screener API integration for trading strategies',
      'A real-time, unified dashboard for analysis and signals',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '50+', // NOTE: This is a placeholder based on your "good to enter label" comment. Please confirm a final number.
      label: 'Actionable "Good-to-Enter" Signals Generated Daily',
      icon: 'check',
    },
    otherMetrics: [],
    qualitativeWins: [
      'Gave traders a "single pane of glass" view for more informed decisions.',
      'Provided a trusted platform to commercialize and backtest proprietary strategies.',
      'Created a foundation for future expansion and collaborations.',
    ],
    clientQuote: {
      text: 'Our users have daily logins for the sure-shot and calculated profits our platform helps them find.',
      attribution: 'Market Pulse Leadership',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      live: 'https://market-pulse.com',
      caseStudy: '/proof/market-pulse-exchange',
    },
  },
  techStack: {
    frontend: ['React', 'Tailwind CSS'],
    backend: ['Node.js'], // n8n runs on Node.js
    database: ['MongoDB'],
    integrations: ['Dhan API', 'Chartink API', 'n8n', 'Webhooks'],
  },
};
