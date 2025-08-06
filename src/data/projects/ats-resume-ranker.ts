import { PortfolioItem } from '../portfolio-types';

export const atsResumeRanker: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'ats-resume-ranker',
  cardTitle: 'HR Tech AI: An Intelligent Resume Ranker to Find Top Talent Faster',
  client: {
    name: 'Established HR Technology Firm',
    publiclyUsable: false,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'Recruiters using the client\'s platform were inundated with hundreds of applications, but traditional ATS filters were too blunt. They needed an intelligent ranking system to serve as a core differentiator.',
    impact: {
      risk: 'The client\'s product was less competitive without a key, AI-powered feature to surface the best candidates.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an AI-powered resume scoring engine that could be seamlessly integrated into the client\'s existing HR platform.',
    smartMoment: 'We used the Gemini API for its sophisticated language understanding, allowing us to move beyond simple keyword matching to a more nuanced, semantic analysis of how well a resume aligns with a job description.',
    features: [
      'AI-powered resume parsing and scoring',
      'Deep semantic job description matching',
      'Insight generation for recruiters',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '70%',
      label: 'Reduction in Recruiter Screening Time Per Role',
      icon: 'arrow-down',
    },
    otherMetrics: [
      'Identified the top 10% of candidates with 90% accuracy',
    ],
    qualitativeWins: [
      'Provided a powerful, AI-driven feature that became a cornerstone of the client\'s value proposition.',
    ],
    clientQuote: {
      text: 'This is exactly what we needed.',
      attribution: 'Head of Product, HR Tech Firm',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan', // Mixed, but Karan is the primary decision maker for integrating this
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      live: 'https://ats-ranker.com',
      caseStudy: '/proof/ats-resume-ranker',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Flask'],
    frontend: ['JavaScript'],
    integrations: ['Gemini API'],
  },
};
