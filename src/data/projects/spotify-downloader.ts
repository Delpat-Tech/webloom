import { PortfolioItem } from '../portfolio-types';

export const spotifyDownloader: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'spotify-downloader',
  cardTitle: 'R&D: An Exploration in API Integration & Authentication',
  client: {
    name: 'Personal Project',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'This was a technical exploration into the practical challenges of integrating with a major third-party API (Spotify), handling a complex authentication flow (OAuth 2.0), and replicating a high-quality user interface.',
    impact: {},
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To build a tool that securely authenticates with a user\'s Spotify account, fetches their data, and interfaces with other services.',
    smartMoment: 'The successful implementation of Spotify\'s OAuth 2.0 flow for user management was a key piece, ensuring secure and official access to user data according to API best practices.',
    features: [
      'Spotify API integration with OAuth 2.0',
      'User interface mirroring the Spotify design',
      'Logic to match Spotify tracks with external sources',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '100%',
      label: 'Successful OAuth 2.0 Authentication Flow Implemented',
      icon: 'check',
    },
    qualitativeWins: [
      'Showcased our ability to work with major third-party APIs.',
      'Proved expertise in handling complex, secure authentication flows.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'R&D',
    featured: false,
    links: {
      caseStudy: '/proof/spotify-downloader',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Requests'],
    integrations: ['Spotify API', 'FFmpeg'],
  },
};
