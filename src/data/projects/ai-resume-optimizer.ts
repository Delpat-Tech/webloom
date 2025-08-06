import { PortfolioItem } from '../portfolio-types';

export const aiResumeOptimizer: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'ai-resume-optimizer',
  cardTitle: 'AI Resume Optimizer: Helping Job Seekers Beat the ATS',
  client: {
    name: 'Stealth HR Tech Partner',
    publiclyUsable: false,
  },
  relationship: {
    status: 'First Project',
    summary: 'A B2B project to build a white-label tool for our client to offer to their end-users.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'It\'s incredibly difficult for even qualified job candidates to tailor their resume perfectly for each application to satisfy automated screening tools (ATS).',
    impact: {
      risk: 'Candidates miss out on opportunities they are qualified for, and our client\'s users were asking for a solution.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build an intelligent tool that analyzes a user\'s resume against a job description and provides actionable suggestions for improvement.',
    smartMoment: 'We created a sophisticated "chain of actions" using the Gemini API. Instead of one generic prompt, we broke the problem down into multiple steps (scrape, deconstruct, analyze, improve, recompile) to produce far superior, context-aware results.',
    features: [
      'AI-powered resume and cover letter analysis',
      'Context-aware suggestions based on a live job URL',
      'Automated PDF generation using LaTeX for a professional finish',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '40%',
      label: 'Average Increase in Resume Match Score',
      icon: 'arrow-up',
    },
    qualitativeWins: [
      'Empowered our client to offer a powerful tool that helps their users level the playing field in job applications.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      live: 'https://ai-resume-optimizer.com',
      caseStudy: '/proof/ai-resume-optimizer',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Flask'],
    frontend: ['Streamlit'],
    integrations: ['Gemini API', 'LaTeX'],
  },
};
