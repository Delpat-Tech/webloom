import { PortfolioItem } from '../portfolio-types';

export const docxScriptRebuild: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'docx-script-rebuild',
  cardTitle: 'DOCX Fix: Rewriting a Failing Script to Perfection in 2 Days',
  client: {
    name: 'sandraoelschlae',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client had a Python script to automate the formatting of .docx documents that was completely broken, stalling their entire workflow.',
    impact: {
      risk: 'A critical business process was at a standstill due to a failing piece of automation.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To rescue the client\'s workflow by delivering a perfectly working DOCX automation script.',
    smartMoment: 'Instead of spending hours patching the messy, flawed code, we performed a clean rewrite from scratch based on the requirements. This was faster and resulted in a much higher-quality, more maintainable script.',
    features: [
      'Full rewrite of the original script',
      'Clean, modular, and readable code',
      'Clear installation and usage guide for a non-technical user',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '<2',
      label: 'Days to Deliver a Clean Rewrite of a Broken Script',
      icon: 'check',
    },
    qualitativeWins: [
      'The client received a solution that was better and more reliable than what they originally asked for.',
    ],
    clientQuote: {
      text: 'He patiently listened... found the error in no time and finally wrote me a completely new script that works perfectly. A great collaboration!',
      attribution: 'sandraoelschlae',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: false,
    links: {
      caseStudy: '/proof/docx-script-rebuild',
    },
  },
  techStack: {
    platforms: ['Python'],
  },
};
