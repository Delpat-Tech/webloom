import { PortfolioItem } from '../portfolio-types';

export const spotifyRecommender: PortfolioItem = {
  // === SECTION A: FUNDAMENTALS ===
  id: 'spotify-recommender',
  cardTitle: 'AI Recommender: Building a Smarter Music Recommendation Engine',
  client: {
    name: 'Internal R&D',
    publiclyUsable: true,
  },

  // === SECTION B: THE STORY (THE "WHY") ===
  story: {
    problem: 'While standard recommendation algorithms are good, this project explored if modern LLMs could create more nuanced, personalized recommendations by understanding the deeper context of a user\'s listening history.',
    impact: {},
  },

  // === SECTION C: THE EXECUTION (THE "HOW") ===
  execution: {
    coreMandate: 'To create an AI-powered music recommendation system by feeding a user\'s Spotify data into the Gemini API for deep preference modeling.',
    smartMoment: 'We used a hybrid approach: pulling structured data and audio features from the Spotify API and then feeding this rich context into the Gemini API for more creative and nuanced "user preference modeling."',
    features: [
      'User preference modeling with Machine Learning and Gemini',
      'Generation of personalized music recommendations',
      'Deep integration with the Spotify API',
    ],
  },

  // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
  outcome: {
    headlineMetric: {
      value: '75%', // NOTE: This is a placeholder. Please confirm a final number.
      label: 'User Approval Rating in Taste-Testing',
      icon: 'check',
    },
    qualitativeWins: [
      'Demonstrated our ability to apply large language models (LLMs) to structured data to create sophisticated, personalized user experiences.',
    ],
  },

  // === SECTION F: META-DATA & TECH STACK ===
  meta: {
    persona: 'Karan',
    serviceTrack: 'R&D',
    featured: false,
    links: {
      caseStudy: '/proof/spotify-recommender',
    },
  },
  techStack: {
    platforms: ['Python'],
    backend: ['Scikit-learn'],
    integrations: ['Spotify API', 'Gemini API'],
  },
};
