import { PortfolioItem } from '../portfolio-types';

export const focalPointScraper: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'focal-point-scraper',
  cardTitle: 'Focal Point: A Turnkey Desktop Scraper with 5-Star Support',
  client: {
    name: 'phil_huff (Focal Point Business Coaching)',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client, a business coach, needed to aggregate business data from multiple online directories based on ZIP codes and business types—a tedious and time-consuming manual process.',
    impact: {
      time: 'Significant hours wasted on manual data collection for lead generation.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a user-friendly desktop tool to automate the scraping and consolidation of business directory data.',
    smartMoment: 'We not only built the tool but also provided hands-on support to help the non-technical client set up their Python environment on macOS. This "above and beyond" service ensured they could actually use the tool we built.',
    features: [
      'Multi-source scraping engine',
      'Simple Tkinter-based GUI with two input fields',
      'CSV/Excel export system',
      'Guided installation support for macOS',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '4',
      label: 'Days to Deliver a Full Desktop App with Guided Install',
      icon: 'check',
    },
    qualitativeWins: [
      'Built a strong rapport for future work by providing exceptional, white-glove support.',
    ],
    clientQuote: {
      text: 'I loved working with Om. He was the ultimate professional... went above and beyond by understanding my needs before I even understood some of them.',
      attribution: 'phil_huff, Focal Point Business Coaching',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: false,
    links: {
      caseStudy: '/proof/focal-point-scraper',
    },
  },
  techStack: {
    platforms: ['Python'],
    frontend: ['Tkinter'],
  },
};
