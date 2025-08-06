import { PortfolioItem } from '../portfolio-types';

export const schoolWebsiteErp: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'school-website-erp',
  cardTitle: 'School ERP: Saving 50+ Administrative Hours Weekly',
  client: {
    name: 'Private Educational Org',
    publiclyUsable: false, // Set to false as client is private
  },
  relationship: {
    status: 'Follow-up', // Set as follow-up because of "White labeling" comment
    summary: 'The success of this project has opened opportunities for white-labeling the solution to other schools in the area.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'The school\'s staff was drowning in over 50 hours of manual administrative work per week for student management, fee tracking, and attendance, leading to errors and delays.',
    impact: {
      time: '50+ hours of administrative work per week.',
      money: 'A 15% delay in the fee collection cycle due to poor tracking.',
      risk: 'Inaccurate student records and poor communication with parents.',
    },
    previousSolution: 'A chaotic system of paper files and spreadsheets.',
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a complete, centralized ERP system to digitize and streamline the school\'s core administrative operations.',
    smartMoment: 'We built the system with distinct, role-based dashboards for administrators, teachers, and parents. This simplified the user experience and ensured high adoption across all user groups.',
    features: [
      'Centralized student information management',
      'Automated fee tracking with payment reminders',
      'Digital attendance monitoring and reporting',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '50+',
      label: 'Administrative Hours Saved Per Week',
      icon: 'arrow-down',
    },
    otherMetrics: [
      'Reduced fee collection cycle delay by 80%',
      'Reduced overall administrative workload by 40%',
    ],
    qualitativeWins: [
      'Provided a single source of truth for all school operations, improving efficiency and accuracy.',
    ],
    clientQuote: {
      text: 'This really saved time, effort, and cost for our education operations.',
      attribution: 'School Administrator',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Priya',
    serviceTrack: 'Internal OS',
    featured: false,
    links: {
      caseStudy: '/proof/school-website-erp',
    },
  },
  techStack: {
    frontend: ['React', 'Tailwind CSS'],
    backend: ['Node.js'],
    database: ['MongoDB'],
  },
};
