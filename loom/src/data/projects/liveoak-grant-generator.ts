import { PortfolioItem } from '../portfolio-types';

export const liveoakGrantGenerator: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'liveoak-grant-generator',
  cardTitle: 'LiveOak.ai: An A/B Testing Platform for AI Agents',
  client: {
    name: 'LiveOak.ai',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Follow-up',
    summary: 'The major follow-up project after the initial Google Forms automation success, expanding the concept into a full platform.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s AI agent was powerful but inaccessible. Without being embedded on their website, it couldn\'t generate leads, validate user interest, or provide the interactive experience needed to build a real product.',
    impact: {
      risk: 'The client\'s core business idea was stuck in the backend, unable to be tested or validated by the market.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a scalable system for embedding the MindStudio agent on the LiveOak.ai site, rendering its output dynamically, and allowing for A/B testing across multiple versions.',
    smartMoment: 'The key insight was to build a single, robust Make.com pipeline and then duplicate it for eight parallel instances (Models A-H). This created a powerful A/B testing framework with minimal rework.',
    features: [
      'Live embedding of a MindStudio AI agent',
      'Dynamic HTML rendering of AI-generated reports',
      'A scalable, 8-instance deployment for A/B testing',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '8',
      label: 'Parallel AI Instances Launched for A/B Testing',
      icon: 'check',
    },
    otherMetrics: [
      'Delivered the full, scalable system in under one week',
    ],
    qualitativeWins: [
      'Unlocked the client\'s ability to get rapid, data-driven feedback on which AI prompt designs drive the best lead conversion.',
      'Allowed for rapid prototyping and user testing at scale.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: true,
    links: {
      caseStudy: '/proof/liveoak-grant-generator',
    },
  },
  techStack: {
    platforms: ['Make.com'],
    frontend: ['HTML', 'CSS', 'JavaScript'],
    integrations: ['MindStudio AI', 'Webhooks'],
  },
};
