import { PortfolioItem } from '../portfolio-types';

export const worldClockApp: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'world-clock-app',
  cardTitle: 'World Clock App for ABCom',
  client: {
    name: 'ABCom',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Follow-up',
    summary: 'A utility app built for a repeat client, demonstrating our versatile development capabilities.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client needed a simple, well-designed utility app to master the native Android development and publishing lifecycle as part of a broader mobile strategy.',
    impact: {},
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a clean, user-friendly, multi-timezone clock application for the Android platform.',
    smartMoment: 'The focus was on solid fundamentals: a clean Material Design interface, efficient time zone handling, and local storage with SQLite for high performance and offline access.',
    features: [
      'Multi-timezone tracking and management',
      'Clean UI following Google\'s Material Design principles',
      'Successfully published to the Google Play Store',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '1,000+',
      label: 'Downloads on the Google Play Store',
      icon: 'check',
    },
    otherMetrics: [
      'Maintained a 4.5+ star average rating',
    ],
    qualitativeWins: [
      'Demonstrated proficiency in native Android development and the full app-to-market lifecycle.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      live: 'https://play.google.com/world-clock', // NOTE: Placeholder URL
      caseStudy: '/proof/world-clock-app',
    },
  },
  techStack: {
    // NOTE: User input mentioned React Native, but original data and project goals point to Native Android.
    // Using original data as it's more specific. Please confirm.
    platforms: ['Android (Java)'],
    frontend: ['Material Design'],
    database: ['SQLite'],
  },
};
