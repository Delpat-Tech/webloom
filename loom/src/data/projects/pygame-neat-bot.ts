import { PortfolioItem } from '../portfolio-types';

export const pygameNeatBot: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'pygame-neat-bot',
  cardTitle: 'R&D: Mastering Neuroevolution with a Flappy Bird AI',
  client: {
    name: 'Personal Project',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'This was a technical challenge to explore and master the NEAT (NeuroEvolution of Augmenting Topologies) algorithm, a powerful but complex AI technique for training agents without explicit programming.',
    impact: {},
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To successfully implement the NEAT algorithm in Python to train an AI agent that could autonomously play Flappy Bird at a superhuman level.',
    smartMoment: 'The implementation included a multiplayer mode, allowing multiple AI "brains" to compete simultaneously. This visual feedback loop dramatically sped up the evolutionary process and selection of promising agents.',
    features: [
      'Full Flappy Bird game implementation in Pygame',
      'Successful NEAT algorithm integration for self-learning',
      'Multiplayer functionality for parallel AI training',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '1000%',
      label: 'Increase in Agent Survival Time Over 50 Generations',
      icon: 'arrow-up',
    },
    otherMetrics: [
      'AI agent achieved a top score of 500+',
    ],
    qualitativeWins: [
      'Demonstrated deep, hands-on expertise in advanced machine learning and neuroevolution algorithms.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'R&D',
    featured: false,
    links: {
      github: 'https://github.com/delpat/pygame-neat', // NOTE: Placeholder URL
      caseStudy: '/proof/pygame-neat-bot',
    },
  },
  techStack: {
    platforms: ['Python'],
    integrations: ['NEAT-Python', 'Pygame', 'NumPy'],
  },
};
