import { PortfolioItem } from '../portfolio-types';

export const grantReportGeneratorV1: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'grant-report-generator-v1',
  cardTitle: 'Grant Reports: A 48-Hour Automation Sprint',
  client: {
    name: 'Eric Stockmeyer (LiveOak.ai)',
    publiclyUsable: true,
  },
  relationship: {
    status: 'First Project',
    summary: 'A successful quick win that proved our speed and reliability, leading directly to the larger LiveOak.ai platform engagement.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client had a manual, multi-step process for generating AI reports that was unscalable, requiring them to copy data from Google Forms, run an AI, and manually email a PDF.',
    impact: {
      time: 'The process was too slow to handle more than a handful of requests per day.',
      risk: 'Manual data handling was prone to errors, and the long wait times created a poor user experience.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To create a fully automated, "hands-off" workflow connecting Google Forms, MindStudio, and Gmail to instantly deliver AI-generated PDF reports.',
    smartMoment: 'We identified Make.com as the perfect no-code "glue" for this workflow. This allowed us to build and deploy the entire automation in under 48 hours, providing a solution that was both fast and visually understandable.',
    features: [
      'Google Form trigger for new submissions',
      'Data routing to MindStudio AI agent',
      'Automated PDF report delivery via Gmail',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '<48',
      label: 'Hours to Deliver a Full Automation Workflow',
      icon: 'check',
    },
    otherMetrics: [
      'Achieved a 100% reduction in manual processing time per report',
    ],
    qualitativeWins: [
      'Provided a seamless and professional experience for the client\'s end-users.',
    ],
    clientQuote: {
      text: 'Work completed exactly as requested and ahead of schedule. I\'ll be working with him again.',
      attribution: 'Eric Stockmeyer, LiveOak.ai',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: true,
    links: {
      caseStudy: '/proof/grant-report-generator-v1',
    },
  },
  techStack: {
    platforms: ['Make.com'],
    integrations: ['Google Forms', 'MindStudio AI', 'Gmail'],
  },
};
