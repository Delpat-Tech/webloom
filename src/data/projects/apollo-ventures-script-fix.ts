import { PortfolioItem } from '../portfolio-types';

export const apolloVenturesScriptFix: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'apollo-ventures-script-fix',
  cardTitle: 'ApolloVentures: Rescuing a Failing Image Processing Script in 48 Hours',
  client: {
    name: 'ApolloVentures',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s existing Python script for geometric image analysis was producing inaccurate results due to transparency and DPI handling errors, completely blocking their workflow.',
    impact: {
      risk: 'Inability to perform their core business analysis correctly.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To rapidly debug, refactor, and deliver a fully functional version of the client\'s flawed Python script.',
    smartMoment: 'We refactored the logic to calculate percentages based only on the target area, not the whole image, and integrated custom DPI handling directly into the script—solving the root cause of the problem.',
    features: [
      'Delivered a fully working, revised script',
      'Fixed transparency and DPI calculation errors',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '48',
      label: 'Hour Turnaround from Broken to Working Script',
      icon: 'check',
    },
    qualitativeWins: [
      'Unblocked the client\'s critical workflow, allowing them to resume business operations.',
    ],
    clientQuote: {
      text: 'Awesome, it works now. Thanks a lot... Much appreciated.',
      attribution: 'ApolloVentures',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'Custom',
    featured: false,
    links: {
      caseStudy: '/proof/apollo-ventures-script-fix',
    },
  },
  techStack: {
    platforms: ['Python'],
  },
};
