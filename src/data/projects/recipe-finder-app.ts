import { PortfolioItem } from '../portfolio-types';

export const recipeFinderApp: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'recipe-finder-app',
  cardTitle: 'Remy: An Ingredient-Based MVP Built in Two Weeks',
  client: {
    name: 'Remy',
    publiclyUsable: false, // Set to false as per N/A
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The "decision fatigue" of planning meals often leads to food waste and unnecessary spending on takeout. The client needed to validate an idea to solve this problem.',
    impact: {
      risk: 'The client had a compelling idea but no tangible product to validate it with users or show to potential investors.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To rapidly build a functional MVP of a recipe suggestion app based on user-inputted ingredients.',
    smartMoment: 'We integrated with the Spoonacular API, a massive existing recipe database. This allowed us to deliver a content-rich app in just two weeks, focusing our efforts on the user experience, not data entry.',
    features: [
      'Ingredient-based recipe matching logic',
      'User accounts for saving and bookmarking recipes',
      'Functional MVP delivered in an accelerated 2-week sprint',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '2',
      label: 'Weeks from Idea to Functional MVP',
      icon: 'check',
    },
    qualitativeWins: [
      'Provided the startup with a tangible product to demonstrate their vision.',
      'Enabled them to test their core hypothesis with real users.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      // live: 'URL needed'
      caseStudy: '/proof/recipe-finder-app',
    },
  },
  techStack: {
    frontend: ['HTML', 'CSS', 'JavaScript'],
    backend: ['Flask'],
    integrations: ['Spoonacular API'],
  },
};
