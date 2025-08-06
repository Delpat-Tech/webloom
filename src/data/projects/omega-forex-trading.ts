import { PortfolioItem } from '../portfolio-types';

export const omegaForexTrading: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'omega-forex-trading',
  cardTitle: 'Omega Forex: A Trading Ecosystem Built for Trust & Control',
  client: {
    name: 'Omega Forex',
    location: 'St. Vincent and the Grenadines',
    publiclyUsable: true,
  },
  relationship: {
    status: 'First Project',
    summary: 'This successful MVP established the trust and technical foundation for the follow-up CRM project.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client needed to launch a professional brokerage but was wary of closed, black-box solutions from other agencies that offered no code ownership or transparency—a major risk in a regulated financial space.',
    impact: {
      money: 'Inability to launch their core revenue-generating business.',
      time: 'No existing platform meant no way to onboard users.',
      risk: 'Losing first-mover advantage and entrusting their entire financial infrastructure to an opaque third-party.',
    },
    previousSolution: 'The client rejected offers from other agencies that provided "done-for-you" packages, choosing Delpat for our transparent partnership and full code ownership.',
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a high-performance mobile trading app and the entire supporting data infrastructure, giving the client full control over their ecosystem.',
    smartMoment: 'Recognizing the need for a truly reliable data source, we built our own proprietary market data feed service (DP@FIN). This core asset powered their entire ecosystem, not just the mobile app.',
    features: [
      'Proprietary real-time market data feed (DP@FIN)',
      'Cross-platform mobile app with advanced trading order types',
      'Secure user authentication and wallet management',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '500+', // NOTE: This is a placeholder based on your "onboarded users" comment. Please confirm the final number.
      label: 'Agency Customers Onboarded to the New App',
      icon: 'arrow-up',
    },
    otherMetrics: [],
    qualitativeWins: [
      'Provided users a unified ecosystem to trade multiple asset classes.',
      'Established a foundation of trust through full transparency and code ownership.',
      'Became the client\'s go-to consultant for fintech strategy.',
    ],
    clientQuote: {
      text: 'Delpat became our go-to consultant for technical expertise in the fintech area, providing critical research and execution.',
      attribution: 'Omega Forex Leadership',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: true,
    links: {
      live: 'https://omega-forex.com',
      caseStudy: '/proof/omega-forex-trading',
    },
  },
  techStack: {
    frontend: ['React Native', 'Redux'],
    backend: ['Node.js', 'Express.js'],
    database: ['MongoDB'],
    deployment: ['AWS'],
    integrations: ['DP@FIN (In-house)', 'WebSocket'],
  },
};
