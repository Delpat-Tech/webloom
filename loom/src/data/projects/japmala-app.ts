import { PortfolioItem } from '../portfolio-types';

export const japmalaApp: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'japmala-app',
  cardTitle: 'Japmala App: A Modern Digital Tool for a Traditional Practice',
  client: {
    name: 'ABCom',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Ongoing',
    summary: 'An ongoing partnership to maintain and support the live application on both major app stores.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s spiritual community lacked a modern, authentic digital tool for their Japmala meditation practice, risking disconnection from a younger, digitally-native audience.',
    impact: {
      money: 'The app was monetized at $9.99 per install, creating a new revenue stream.',
      risk: 'Losing relevance and engagement with their target audience without a digital presence.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an interactive and authentic meditation app for both iOS and Android that faithfully represents the traditional practice of Japmala.',
    smartMoment: 'We used React Native to build for both iOS and Android from a single codebase, allowing the client to reach their entire audience on a startup-friendly budget and timeline.',
    features: [
      'Interactive spiritual bead counting feature with haptic feedback',
      'Customizable meditation sessions',
      'Full app store listing and maintenance support',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '1,000+',
      label: 'Downloads Across iOS & Android',
      icon: 'arrow-up',
    },
    otherMetrics: [
      'Maintained a 4.8-star average rating on the App Store',
    ],
    qualitativeWins: [
      'Provided a specific spiritual community with a modern tool to sustain and grow their practice.',
    ],
    clientQuote: {
      text: 'The app provides a peaceful meditation experience with its zen music, soothing backgrounds, and traditional mala swiping.',
      attribution: 'ABCom Leadership',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      live: 'https://apps.apple.com/japmala', // NOTE: Placeholder URL
      caseStudy: '/proof/japmala-app',
    },
  },
  techStack: {
    platforms: ['React Native'],
    // NOTE: The app is primarily client-side.
    database: ['AsyncStorage (Local)'],
    integrations: ['Apple App Store Analytics'],
  },
};
