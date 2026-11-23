import { PortfolioItem } from '../portfolio-types';

export const muscleMentorAiFix: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'muscle-mentor-ai-fix',
  cardTitle: 'MuscleMentor: Rescuing a Failing AI Core Feature',
  client: {
    name: 'MuscleMentor',
    publiclyUsable: true,
  },
  relationship: {
    status: 'First Project',
    summary: 'A critical, high-pressure fix that immediately established trust and led to the follow-up project to build their payment system.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s core product was completely non-functional. Their main value proposition—AI-generated fitness plans—was failing, leading to a surge in support tickets and a loss of all business momentum.',
    impact: {
      money: '0% of potential revenue could be captured while the feature was down.',
      risk: 'Complete loss of user trust and product viability.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To perform a rapid root-cause analysis and execute a reliable fix to restore the platform\'s core AI functionality as quickly as possible.',
    smartMoment: 'We immediately identified the issue within the Deno/TypeScript Edge Function environment, refactored the code to securely manage OpenAI keys, and wrapped the API calls in robust error-handling logic.',
    features: [
      'Rapid root-cause analysis of Supabase Edge Functions',
      'Secure refactoring of OpenAI API calls',
      'Implementation of robust error-handling',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '80%',
      label: 'Reduction in User Support Tickets',
      icon: 'arrow-down',
    },
    otherMetrics: [
      'Achieved 0% runtime errors during QA',
    ],
    qualitativeWins: [
      'Restored the client\'s confidence in their own product.',
      'Demonstrated our ability to solve critical infrastructure problems under pressure.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'Custom',
    featured: true,
    links: {
      caseStudy: '/proof/muscle-mentor-fix',
    },
  },
  techStack: {
    backend: ['Supabase Edge Functions (Deno/TypeScript)'],
    integrations: ['OpenAI API'],
  },
};
