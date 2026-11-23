import { PortfolioItem } from '../portfolio-types';

export const numeratesWebsite: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'numerates-website',
  cardTitle: 'Numerates: A Networking Platform to Boost Campus Engagement',
  client: {
    name: 'MIT WPU Club Numerates',
    location: 'Pune, India',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'Student engagement was suffering because there was no central, dynamic platform for clubs to showcase activities and for students to find projects. Information was scattered across notice boards.',
    impact: {
      risk: 'Low student participation in extracurricular activities and a fragmented campus community.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a campus networking platform that makes it easy for students to explore clubs and discover projects.',
    smartMoment: 'We provided a simple, centralized content management system that allowed non-technical club members to easily post newsletters and events, which was the key driver of user adoption and engagement.',
    features: [
      'Club discovery portal with profiles',
      'Real-time project listings and updates',
      'Simple CMS for event and newsletter posting',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '300%',
      label: 'Increase in Student Inquiries for Listed Clubs',
      icon: 'arrow-up',
    },
    otherMetrics: [
      '10+ new projects were listed in the first semester',
    ],
    qualitativeWins: [
      'Fostered a more connected and engaged campus community by breaking down information silos.',
      'Gave the club a professional digital standing on campus.',
    ],
    clientQuote: {
      text: 'Club Numerates, being a Maths and Stats club, now has an outstanding website.',
      attribution: 'Numerates Club Leadership',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      // live: 'URL needed'
      caseStudy: '/proof/numerates-website',
    },
  },
  techStack: {
    frontend: ['React'],
    backend: ['Node.js', 'Express'],
    database: ['MongoDB'],
  },
};
