import { PortfolioItem } from '../portfolio-types';

export const fondFoodDelivery: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'fond-food-delivery',
  cardTitle: 'FOND: From Idea to Award-Winning MVP in 72 Hours',
  client: {
    name: 'HackMITWPU (Competition)',
    location: 'Pune, India',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'During peak lunch hours, campus food stalls are chaotic with disorganized queues. The hackathon challenge was to design and build a solution to bring order to this chaos.',
    impact: {
      risk: 'A complex real-world logistics problem that needed a viable, working solution in under 72 hours.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To design, build, and pitch a functional prototype of a food delivery application within the 3-day hackathon timeline.',
    smartMoment: 'The key innovation was the "queue-based fair access system." Instead of a free-for-all, our system intelligently batched orders and assigned pickup times, demonstrating deep problem understanding, not just coding skill.',
    features: [
      'Rapid UI/UX prototyping in Figma',
      'Functional React frontend for ordering',
      'Node.js backend with the core queueing logic',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '1st',
      label: 'Place Winner at HackMITWPU',
      icon: 'check',
    },
    otherMetrics: [
      'From idea to working prototype in 72 hours',
    ],
    qualitativeWins: [
      'This project is the ultimate proof of our speed, agility, and ability to deliver under pressure.',
      'Showcased our ability to innovate and execute, not just follow a spec.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: true,
    links: {
      caseStudy: '/proof/fond-food-delivery',
    },
  },
  techStack: {
    frontend: ['React', 'Figma'],
    backend: ['Node.js', 'Express'],
    database: ['MongoDB'],
  },
};
