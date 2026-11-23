import { PortfolioItem } from '../portfolio-types';

export const catPrephub: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'cat-prephub',
  cardTitle: 'CAT Prephub: An EdTech MVP for Competitive Test Prep',
  client: {
    name: 'R&D Collaboration',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'Aspiring CAT students lacked an accessible platform with a large question bank and the engaging, competitive features (like leaderboards) needed to stay motivated.',
    impact: {
      risk: 'Students using expensive or ineffective prep tools.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an MVP of an EdTech platform for CAT test preparation, focusing on question pooling, scoring, and leaderboards.',
    smartMoment: 'The project strategy was rapid execution using Django to quickly build and validate the core features with the target student community, proving the concept without over-engineering.',
    features: [
      'Dynamic question pooling and test generation system',
      'Automated scoring and performance analysis',
      'Competitive leaderboards to drive engagement',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '1000+', // NOTE: Placeholder. Please confirm final number.
      label: 'Beta Users Onboarded in First Semester',
      icon: 'arrow-up',
    },
    otherMetrics: [
      // 'Served 10,000+ practice questions' - another good option
    ],
    qualitativeWins: [
      'Provided a valuable and engaging tool for a passionate community of students.',
      'Successfully validated the core features of the EdTech platform concept.',
    ],
    clientQuote: {
      text: 'Delpat did exactly what we wanted, delivering the MVP in the exact tech stack we required for future development.',
      attribution: 'R&D Collaboration Lead',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      // live: 'URL needed'
      caseStudy: '/proof/cat-prephub',
    },
  },
  techStack: {
    platforms: ['Django'],
    frontend: ['HTML', 'CSS', 'JavaScript'],
    database: ['SQLite'],
  },
};
