import { PortfolioItem } from '../portfolio-types';

export const bspDataScraper: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'bsp-data-scraper',
  cardTitle: 'BSP Scraper: Eliminating 10 Hours of Manual Data Entry Per Week',
  client: {
    name: 'Jacob',
    publiclyUsable: false,
  },
  relationship: {
    status: 'First Project',
    summary: 'This successful automation built the trust that led to the more complex Betwatch Bot project.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s team was spending hours each day manually looking up and transcribing hundreds of Betfair Starting Prices from a website into a spreadsheet.',
    impact: {
      time: 'A 2-hour manual lookup task performed daily.',
      risk: 'Manual data entry is highly susceptible to costly errors.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a simple, turnkey tool that could ingest a list of races, scrape the required data automatically, and output a clean, consolidated results file.',
    smartMoment: 'We used a headless browser (Selenium) to mimic user behavior, which is more resilient to website changes. We also added a standard file-picker dialog, making the tool feel like a professional desktop application.',
    features: [
      'CSV/Excel file input validation',
      'Automated BSP lookup using a headless browser',
      'Consolidated final results CSV output',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '98%',
      label: 'Reduction in Data Collection Time (2 hours to <5 mins)',
      icon: 'arrow-down',
    },
    otherMetrics: [
      'Eliminated 100% of manual data entry errors',
    ],
    qualitativeWins: [
      'Freed up the client\'s team to focus on high-value data analysis instead of mind-numbing data gathering.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: true,
    links: {
      caseStudy: '/proof/bsp-data-scraper',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Selenium'],
  },
};
