import { PortfolioItem } from '../portfolio-types';

export const customScrapingDashboard: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'custom-scraping-dashboard',
  cardTitle: 'Sekwang: A Custom Dashboard to Automate Market Research',
  client: {
    name: 'Sekwang',
    location: 'South Korea',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s team was spending dozens of hours each month manually scraping websites for critical market research and lead generation data.',
    impact: {
      time: 'Significant team hours were being diverted from core business activities to manual data collection.',
      money: 'High opportunity cost as skilled employees were performing low-value, repetitive work.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a flexible, GUI-driven scraping tool that the client\'s non-technical team members could use to manage scraping jobs without writing code.',
    smartMoment: 'We built the tool with a simple Tkinter GUI, creating a lightweight and intuitive desktop application perfectly suited for their use case, avoiding the overhead of a full web app.',
    features: [
      'Simple GUI for managing data sources and credentials',
      'Automated, multi-source data extraction engine',
      'One-click data export functionality',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '20+',
      label: 'Hours of Manual Research Saved Per Month',
      icon: 'check',
    },
    qualitativeWins: [
      'Empowered non-technical team members to run their own data collection tasks.',
      'Provided a scalable solution for their ongoing market intelligence needs.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: false,
    links: {
      caseStudy: '/proof/custom-scraping-dashboard',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Selenium', 'BeautifulSoup', 'Flask'],
    frontend: ['Tkinter'],
  },
};
