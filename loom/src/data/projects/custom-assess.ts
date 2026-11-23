import { PortfolioItem } from '../portfolio-types';

export const customAssess: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'custom-assess',
  cardTitle: 'CustomAssess: A No-Code Engine to Cut Quote Turnaround by 90%',
  client: {
    name: 'CustomAssessment.com',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s manual quoting process, which involved complex tiered pricing and multiple add-ons in spreadsheets, was a major bottleneck in their sales cycle.',
    impact: {
      time: 'Slow, inconsistent quoting process delayed sales.',
      risk: 'Manual calculations were prone to errors, affecting revenue and client trust.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To design and implement a fully automated, no-code workflow that would take a form submission, calculate a dynamic price, and generate a Stripe payment link instantly.',
    smartMoment: 'We built the entire dynamic pricing logic directly inside Make.com modules and documented it thoroughly, empowering the client to adjust their own pricing in the future without needing a developer.',
    features: [
      'Real-time data capture from Tally forms via Webhooks',
      'Dynamic pricing logic module in Make.com',
      'Automated Stripe Checkout session creation',
      'Personalized quote delivery via Gmail',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '90%',
      label: 'Reduction in Quote-to-Payment Turnaround Time',
      icon: 'arrow-down',
    },
    qualitativeWins: [
      'Eliminated all manual spreadsheet work for the sales team.',
      'Delivered a turnkey, maintainable automation that the client could manage themselves.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: true,
    links: {
      live: 'https://quote.customassessment.com/',
      caseStudy: '/proof/custom-assess',
    },
  },
  techStack: {
    platforms: ['Make.com'],
    integrations: ['Tally', 'Stripe', 'Gmail'],
  },
};
