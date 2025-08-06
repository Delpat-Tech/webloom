import { PortfolioItem } from '../portfolio-types';

export const muscleMentorStripe: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'muscle-mentor-stripe',
  cardTitle: 'MuscleMentor: Unlocking Revenue with a 10-Day Payments Sprint',
  client: {
    name: 'MuscleMentor',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Follow-up',
    summary: 'After fixing their core AI, the client entrusted us to build their mission-critical monetization engine.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The platform had a working AI feature but no monetization engine. Every user who generated a plan represented a missed revenue opportunity. The business model was stalled.',
    impact: {
      money: '100% of potential revenue was being left on the table.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build and integrate a complete, end-to-end purchase flow using Stripe to enable live plan sales.',
    smartMoment: 'We built the entire flow using Supabase Edge Functions and Stripe.js, creating a secure and serverless payment architecture. This kept the client\'s stack lean and delivered a robust solution on a tight budget.',
    features: [
      'Secure Stripe Checkout session creation via Supabase',
      'Stripe.js frontend integration',
      'Webhook handler for recording completed payments',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '10',
      label: 'Business Days to Launch a Live Revenue Stream',
      icon: 'check',
    },
    otherMetrics: [
      'Test payments registered with 100% success on the dashboard',
    ],
    qualitativeWins: [
      'Took the client from a broken, non-monetized product to a fully functional, revenue-generating business in a matter of weeks.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: true,
    links: {
      caseStudy: '/proof/muscle-mentor-payments',
    },
  },
  techStack: {
    frontend: ['Stripe.js'],
    backend: ['Supabase Edge Functions'],
    integrations: ['Stripe Checkout', 'Stripe Webhooks'],
  },
};
