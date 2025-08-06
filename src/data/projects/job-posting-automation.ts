import { PortfolioItem } from '../portfolio-types';

export const jobPostingAutomation: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'job-posting-automation',
  cardTitle: 'HR Automation: Saving 15+ Hours of Manual Work Weekly',
  client: {
    name: 'Confidential HR Department',
    publiclyUsable: false,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The client\'s HR team was spending 2-3 hours daily manually posting single job openings across five different platforms, creating a significant operational bottleneck.',
    impact: {
      time: '15-20 hours per week of skilled HR time was being spent on repetitive administrative tasks.',
      risk: 'A slow time-to-hire process, leading to the loss of top candidates to faster-moving competitors.',
    },
    previousSolution: 'A completely manual process that was unscalable and inefficient.',
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a robust automation script that scrapes job details and reposts them across multiple platforms while handling sophisticated anti-bot systems.',
    smartMoment: 'We built the script to handle dynamic anti-bot measures by using intelligent selectors and retry logic in Selenium. This made the automation resilient and not brittle like simpler scrapers.',
    features: [
      'Multi-source job scraping and reposting',
      'Advanced anti-bot handling to ensure reliability',
      'Automated scheduling and data filtering',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '15+',
      label: 'Hours of Manual HR Work Saved Per Week',
      icon: 'arrow-down',
    },
    otherMetrics: [
      'Reduced time-to-post a job by over 98%',
    ],
    qualitativeWins: [
      'Freed the HR department from repetitive tasks to focus on finding and vetting the best talent.',
      'Ensured job listings were always up-to-date across all platforms.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Automation MVP',
    featured: true,
    links: {
      caseStudy: '/proof/job-posting-automation',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Selenium', 'Flask', 'BeautifulSoup'],
  },
};
