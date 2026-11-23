import { PortfolioItem } from '../portfolio-types';

export const eventWebsite: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'event-website',
  cardTitle: 'Live Event Platform: Real-Time Leaderboards to Drive Engagement',
  client: {
    name: 'MIT WPU Club Numerates',
    location: 'Pune, India',
    publiclyUsable: true,
  },
  relationship: {
    status: 'Follow-up',
    summary: 'After the success of their main website, the Numerates club hired us to build a dedicated platform for their flagship event.',
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'For their competitive "treasure hunt" event, managing registrations and updating a leaderboard manually via a spreadsheet was clumsy and lacked the real-time excitement needed to engage attendees.',
    impact: {
      time: 'Significant administrative overhead for organizers during the event.',
      risk: 'A poor, low-energy attendee experience.',
    },
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a lightweight, all-in-one event management system with registration and a real-time leaderboard.',
    smartMoment: 'We used Firebase for the entire backend. This was the perfect choice for a short-term event, providing real-time capabilities and authentication out-of-the-box at very low cost and with extreme speed of development.',
    features: [
      'User registration system',
      'Live leaderboard with sub-1-second updates',
      'Simple management interface for event organizers',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '500+',
      label: 'Attendees Supported During the Live Event',
      icon: 'check',
    },
    otherMetrics: [
      'Leaderboard updated in under 1 second',
    ],
    qualitativeWins: [
      'Dramatically increased the excitement and engagement for attendees.',
      'Simplified logistics for the organizers.',
    ],
    clientQuote: {
      text: 'This was a new, digital way to conduct a treasure hunt event that our attendees loved.',
      attribution: 'Numerates Event Organizer',
    },
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Ankit',
    serviceTrack: 'Product MVP',
    featured: false,
    links: {
      // live: 'URL needed'
      caseStudy: '/proof/event-website',
    },
  },
  techStack: {
    platforms: ['Firebase'],
    frontend: ['React'],
    database: ['Firebase Realtime Database'],
    integrations: ['Firebase Authentication'],
  },
};
