import { PortfolioItem } from '../portfolio-types';

export const grantAgentRevisions: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'grant-agent-revisions',
  cardTitle: 'LiveOak.ai: Iterating on AI for a Better User Experience',
  client: {
    name: 'LiveOak.ai',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Ongoing',
    summary: 'A follow-up refinement task after the main platform was deployed, showcasing our role as a long-term product partner.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'While functional, user feedback showed the initial AI-generated reports were not perfectly optimized. They contained redundant information and lacked key data points, creating friction for the end-user.',
    impact: {
      risk: 'A diminished user experience that could reduce the product\'s value and user retention.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To execute a series of precise enhancements to the MindStudio agent\'s logic and report format to improve user experience and result relevance.',
    smartMoment: 'We treated this not as a simple tweak but as a data-driven iteration. Each change was a direct response to user feedback, demonstrating a focus on product thinking, not just technical tasks.',
    features: [
      'AI agent prompt and logic refinement',
      'Report format and header revamp',
      'Output limited to the 6 best-matching grants to improve signal-to-noise ratio',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '90%', // NOTE: Placeholder. Please confirm a final number.
      label: 'of Initial User Feedback Points Addressed',
      icon: 'arrow-up',
    },
    qualitativeWins: [
      'Significantly improved the end-user experience and perceived quality of the AI\'s output.',
      'Proved our value as a long-term partner invested in the client\'s product success.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'Custom',
    featured: false,
    links: {
      caseStudy: '/proof/grant-agent-revisions',
    },
  },
  techStack: {
    platforms: ['Go'],
    integrations: ['MindStudio AI'],
  },
};
