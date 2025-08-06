import { PortfolioItem } from '../portfolio-types';

export const youtubeAutomation: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'youtube-automation',
  cardTitle: 'YouTube Automation: Scaling Community Engagement',
  client: {
    name: 'Confidential Content Creators',
    publiclyUsable: false,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'Growing a YouTube channel requires consistent engagement, but doing this manually across multiple accounts is unsustainable and takes time away from creating content.',
    impact: {
      time: 'Client was spending over 15 hours per week on manual engagement tasks.',
      money: 'High opportunity cost - time spent engaging is time not spent on producing monetizable content.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a configurable automation suite that could manage engagement on YouTube from multiple accounts without being detected as a bot.',
    smartMoment: 'We used Selenium with advanced configurations to mimic human behavior—randomized delays, realistic mouse movements, and profile management—to ensure the automation was effective and avoided detection.',
    features: [
      'Automated likes and comments based on keywords',
      'Multi-account and profile management',
      'Configurable engagement parameters to appear human',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '15+',
      label: 'Hours Saved Per Week for Content Creators',
      icon: 'check',
    },
    qualitativeWins: [
      'Allowed the content creator to scale their community engagement efforts while focusing on what they do best: creating content.',
    ],
    clientQuote: {
      text: 'Delpat made the process smooth and delivered exactly what I envisioned.',
      attribution: 'YouTube Content Creator',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: false,
    links: {
      caseStudy: '/proof/youtube-automation',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Selenium'],
  },
};
