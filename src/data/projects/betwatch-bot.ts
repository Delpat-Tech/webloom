import { PortfolioItem } from '../portfolio-types';

export const betwatchBot: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'betwatch-bot',
  cardTitle: 'Betwatch Bot: Automating 10+ Hours of Manual Arbitrage Trading Weekly',
  client: {
    name: 'Jacob',
    publiclyUsable: false,
  },
  relationship: {
    status: 'Follow-up',
    summary: 'After the success of the BSP Data Scraper, the client returned to build this more complex, end-to-end automation system.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s core workflow was a 2-hour daily chore of manually scanning API data and placing bets through another platform. It was tedious, error-prone, and slow.',
    impact: {
      time: '10+ hours wasted per week on a repetitive, low-value task.',
      risk: 'High chance of manual errors leading to financial losses and missed opportunities.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a hands-off, end-to-end system that automatically identified arbitrage opportunities and integrated with the Betmatic platform for placement.',
    smartMoment: 'Instead of a web app, we built a lightweight, cross-platform Tkinter GUI. This was faster to develop, cheaper for the client, and ran locally for maximum speed and control.',
    features: [
      'Automated Betwatch API scanning engine',
      'Direct Betmatic API integration for bet placement',
      'Tkinter GUI with one-click start/stop and real-time logging',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '10+',
      label: 'Hours of Manual Work Saved Per Week',
      icon: 'check',
    },
    otherMetrics: [
      'Processed 500+ race entries with zero false positives in live trials',
    ],
    qualitativeWins: [
      'Transformed the client\'s daily chore into a strategic oversight role, allowing them to focus on analysis instead of manual execution.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: true,
    links: {
      caseStudy: '/proof/betwatch-bot',
    },
  },
  techStack: {
    platforms: ['Python'],
    frontend: ['Tkinter'],
    integrations: ['Betwatch API', 'Betmatic API'],
  },
};
