export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  client: string;
  timeline: string;
  teamSize: string;
  results: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'omega-forex-trading',
    title: 'Omega Forex Trading App',
    description: 'Real-time forex trading application with live market data integration and advanced trading features',
    category: 'mobile-apps',
    tags: ['Finance', 'Trading', 'Real-time', 'Forex'],
    image: '/api/placeholder/600/400',
    client: 'Omega Forex',
    timeline: '2-3 months',
    teamSize: '3 developers',
    results: ['Successfully deployed with DP@FIN data', 'Real-time market data integration', 'Advanced trading features'],
    technologies: ['React Native', 'MERN Stack', 'AWS', 'WebSocket'],
    liveUrl: 'https://omega-forex.com',
    featured: true
  },
  {
    id: 'omega-forex-crm',
    title: 'CRM for Omega Forex',
    description: 'Comprehensive CRM system with integrated trading features and client management',
    category: 'web-apps',
    tags: ['CRM', 'Finance', 'SaaS', 'Trading'],
    image: '/api/placeholder/600/400',
    client: 'Omega Forex',
    timeline: '2 months',
    teamSize: '2 developers',
    results: ['Live deployment on Vercel', 'Integrated trading logic', 'Full CRM functionality'],
    technologies: ['MERN Stack', 'Tailwind CSS', 'Auth0', 'Vercel'],
    liveUrl: 'https://omega-crm.vercel.app',
    featured: true
  },
  {
    id: 'market-pulse-exchange',
    title: 'Market Pulse Exchange',
    description: 'Indian stock market analytics dashboard with trading strategies and real-time data',
    category: 'web-apps',
    tags: ['Stock Market', 'Analytics', 'Trading', 'Dashboard'],
    image: '/api/placeholder/600/400',
    client: 'Market Pulse',
    timeline: '1 month',
    teamSize: '1 developer',
    results: ['Informational trading dashboard', 'Market data integration', 'Trading strategies display'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    liveUrl: 'https://market-pulse.com',
    featured: false
  },
  {
    id: 'pygame-neat-bot',
    title: 'Pygame + NEAT AI Bot',
    description: 'Flappy Bird game with AI bot trained using NEAT algorithm, includes multiplayer functionality',
    category: 'automation',
    tags: ['AI', 'Gaming', 'NEAT', 'Machine Learning'],
    image: '/api/placeholder/600/400',
    client: 'Personal Project',
    timeline: '3 weeks',
    teamSize: '1 developer',
    results: ['Working AI bot implementation', 'NEAT algorithm success', 'Multiplayer functionality'],
    technologies: ['Python', 'Pygame', 'NEAT', 'NumPy'],
    githubUrl: 'https://github.com/username/pygame-neat',
    featured: false
  },
  {
    id: 'school-website-erp',
    title: 'School Website ERP System',
    description: 'Complete ERP system with student management, fee tracking, and attendance monitoring',
    category: 'web-apps',
    tags: ['ERP', 'Education', 'Management', 'Database'],
    image: '/api/placeholder/600/400',
    client: 'Educational Institution',
    timeline: '2 months',
    teamSize: '2 developers',
    results: ['Full-featured ERP system', 'Student/fee/attendance tracking', 'Robust admin controls'],
    technologies: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    liveUrl: 'https://school-erp.com',
    featured: false
  },
  {
    id: 'fond-food-delivery',
    title: 'FOND - Food on Demand',
    description: 'HackMITWPU winning food delivery prototype with queue-based fair access system',
    category: 'mobile-apps',
    tags: ['Food Delivery', 'Hackathon', 'Queue System', 'Prototype'],
    image: '/api/placeholder/600/400',
    client: 'HackMITWPU',
    timeline: '3 days (Hackathon)',
    teamSize: '4 developers',
    results: ['Won HackMITWPU', 'Queue-based fair access', 'Working prototype'],
    technologies: ['Figma', 'JavaScript', 'CSS', 'React'],
    featured: true
  },
  {
    id: 'japmala-app',
    title: 'Japmala Meditation App',
    description: 'Interactive meditation app with spiritual beads for iOS platform',
    category: 'mobile-apps',
    tags: ['Meditation', 'Spiritual', 'iOS', 'Health'],
    image: '/api/placeholder/600/400',
    client: 'Japmala',
    timeline: 'Ongoing (Live)',
    teamSize: '2 developers',
    results: ['Published on Apple Store', 'Interactive meditation features', 'Spiritual engagement'],
    technologies: ['iOS', 'Swift', 'Core Data', 'UIKit'],
    liveUrl: 'https://apps.apple.com/japmala',
    featured: false
  },
  {
    id: 'world-clock-app',
    title: 'World Clock App',
    description: 'Multi-timezone clock application for tracking time across different regions',
    category: 'mobile-apps',
    tags: ['Utilities', 'Time', 'Android', 'Multi-timezone'],
    image: '/api/placeholder/600/400',
    client: 'Personal Project',
    timeline: 'Ongoing (Live)',
    teamSize: '1 developer',
    results: ['Published on Play Store', 'Multiple timezone handling', 'User-friendly interface'],
    technologies: ['Android', 'Java', 'SQLite', 'Material Design'],
    liveUrl: 'https://play.google.com/world-clock',
    featured: false
  },
  {
    id: 'numerates-website',
    title: 'Numerates Website',
    description: 'Campus networking platform to explore clubs and projects within college',
    category: 'web-apps',
    tags: ['Campus', 'Networking', 'Clubs', 'Projects'],
    image: '/api/placeholder/600/400',
    client: 'College Campus',
    timeline: '1 month',
    teamSize: '2 developers',
    results: ['Helps college engagement', 'Real-time project updates', 'Club discovery'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveUrl: 'https://numerates.com',
    featured: false
  },
  {
    id: 'event-website',
    title: 'Event Website with Leaderboards',
    description: 'Event registration and leaderboard management system',
    category: 'web-apps',
    tags: ['Events', 'Leaderboards', 'Registration', 'Real-time'],
    image: '/api/placeholder/600/400',
    client: 'Event Organizers',
    timeline: '2 weeks',
    teamSize: '2 developers',
    results: ['Used in real events', 'Leaderboard syncing', 'Registration management'],
    technologies: ['React', 'Firebase', 'Real-time Database', 'Authentication'],
    liveUrl: 'https://event-leaderboard.com',
    featured: false
  },
  {
    id: 'dehazing-ai',
    title: 'Dehazing AI System',
    description: 'Real-time image dehazing with particle dispersion using computer vision',
    category: 'automation',
    tags: ['AI', 'Computer Vision', 'Image Processing', 'Real-time'],
    image: '/api/placeholder/600/400',
    client: 'Research Project',
    timeline: '2 months',
    teamSize: '2 developers',
    results: ['Presentation ready', 'Real-time dehazing', 'Optimized for speed and accuracy'],
    technologies: ['Python', 'OpenCV', 'Deep Learning', 'TensorFlow'],
    githubUrl: 'https://github.com/username/dehazing-ai',
    featured: false
  },
  {
    id: 'custom-scraping-dashboard',
    title: 'Custom Scraping Dashboard',
    description: 'Data extraction and export tool from multiple sources with automated scraping',
    category: 'automation',
    tags: ['Scraping', 'Data Extraction', 'Automation', 'Dashboard'],
    image: '/api/placeholder/600/400',
    client: 'Internal Tools',
    timeline: '3 weeks',
    teamSize: '1 developer',
    results: ['Saves manual scraping time', 'Multiple source integration', 'Automated data export'],
    technologies: ['Python', 'BeautifulSoup', 'Selenium', 'Flask'],
    featured: false
  },
  {
    id: 'youtube-automation',
    title: 'YouTube Automation Suite',
    description: 'Automated likes, comments, and views management for YouTube channels',
    category: 'automation',
    tags: ['Marketing', 'Automation', 'YouTube', 'Social Media'],
    image: '/api/placeholder/600/400',
    client: 'Content Creators',
    timeline: '2 weeks',
    teamSize: '1 developer',
    results: ['Working automation suite', 'Avoiding detection', 'Streamlined engagement'],
    technologies: ['Puppeteer', 'Python', 'Selenium', 'Node.js'],
    featured: false
  },
  {
    id: 'job-posting-automation',
    title: 'Job Posting Automation',
    description: 'Automated job scraping and reposting system for HR efficiency',
    category: 'automation',
    tags: ['HR', 'Automation', 'Job Posting', 'Scraping'],
    image: '/api/placeholder/600/400',
    client: 'HR Department',
    timeline: '3 weeks',
    teamSize: '1 developer',
    results: ['Speeds up job listing', 'Anti-bot system handling', 'Automated reposting'],
    technologies: ['Selenium', 'Flask', 'Python', 'BeautifulSoup'],
    featured: false
  },
  {
    id: 'custom-wordpress-theme',
    title: 'Custom WordPress Theme',
    description: 'Tailored WordPress theme with custom plugins for specific client needs',
    category: 'web-apps',
    tags: ['WordPress', 'Web Development', 'Freelance', 'Custom Theme'],
    image: '/api/placeholder/600/400',
    client: 'Freelance Client',
    timeline: '1 month',
    teamSize: '1 developer',
    results: ['Tailored WP deployment', 'Custom plugin development', 'Client satisfaction'],
    technologies: ['WordPress', 'PHP', 'MySQL', 'CSS'],
    featured: false
  },
  {
    id: 'chart-view',
    title: 'Chart View Trading Module',
    description: 'Real-time charting component for trading applications with live data',
    category: 'web-apps',
    tags: ['Fintech', 'Trading', 'Charts', 'Real-time'],
    image: '/api/placeholder/600/400',
    client: 'Trading Platform',
    timeline: '1 month',
    teamSize: '1 developer',
    results: ['Reusable chart module', 'Real-time rendering', 'Trading integration'],
    technologies: ['JavaScript', 'D3.js', 'WebSockets', 'Canvas'],
    featured: false
  },
  {
    id: 'ats-resume-ranker',
    title: 'ATS Resume Ranker',
    description: 'AI-powered resume scoring system based on job description matching',
    category: 'automation',
    tags: ['HR Tech', 'AI', 'Resume', 'ATS'],
    image: '/api/placeholder/600/400',
    client: 'HR Tech Startup',
    timeline: '1 month',
    teamSize: '2 developers',
    results: ['Helps job applicants', 'Resume parsing success', 'JD matching accuracy'],
    technologies: ['Flask', 'OpenAI API', 'JavaScript', 'Python'],
    liveUrl: 'https://ats-ranker.com',
    featured: false
  },
  {
    id: 'ai-resume-optimizer',
    title: 'AI Resume Optimizer',
    description: 'Intelligent resume and cover letter improvement using AI analysis',
    category: 'automation',
    tags: ['HR Tech', 'AI', 'Resume', 'Cover Letter'],
    image: '/api/placeholder/600/400',
    client: 'Job Seekers',
    timeline: '1 month',
    teamSize: '1 developer',
    results: ['Smart resume improvement', 'Context-aware suggestions', 'AI-powered optimization'],
    technologies: ['OpenAI', 'Flask', 'Python', 'NLP'],
    liveUrl: 'https://ai-resume-optimizer.com',
    featured: false
  },
  {
    id: 'email-automation',
    title: 'Email Automation System',
    description: 'Bulk email sending and verification system for marketing campaigns',
    category: 'automation',
    tags: ['Sales', 'Marketing', 'Email', 'Automation'],
    image: '/api/placeholder/600/400',
    client: 'Marketing Team',
    timeline: '2 weeks',
    teamSize: '1 developer',
    results: ['Streamlined outreach', 'Avoiding spam filters', 'Bulk email management'],
    technologies: ['Node.js', 'Mailchimp API', 'Express', 'MongoDB'],
    featured: false
  },
  {
    id: 'spotify-downloader',
    title: 'Spotify Downloader',
    description: 'Playlist download tool converting Spotify tracks to MP3 format',
    category: 'automation',
    tags: ['Media Tools', 'Music', 'Download', 'Spotify'],
    image: '/api/placeholder/600/400',
    client: 'Personal Project',
    timeline: '1 week',
    teamSize: '1 developer',
    results: ['Internal testing only', 'Playlist download success', 'MP3 conversion'],
    technologies: ['Python', 'Spotify API', 'FFmpeg', 'Requests'],
    githubUrl: 'https://github.com/username/spotify-downloader',
    featured: false
  },
  {
    id: 'spotify-recommender',
    title: 'Spotify Recommender Engine',
    description: 'AI-powered music recommendation system using machine learning',
    category: 'automation',
    tags: ['AI', 'Music', 'Recommendation', 'Machine Learning'],
    image: '/api/placeholder/600/400',
    client: 'Music Platform',
    timeline: '3 weeks',
    teamSize: '2 developers',
    results: ['Personalized recommendations', 'User preference modeling', 'ML algorithm success'],
    technologies: ['Machine Learning', 'Spotify API', 'Python', 'Scikit-learn'],
    githubUrl: 'https://github.com/username/spotify-recommender',
    featured: false
  },
  {
    id: 'recipe-finder-app',
    title: 'Recipe Finder App',
    description: 'Recipe suggestion app based on available ingredients',
    category: 'mobile-apps',
    tags: ['Food Tech', 'Recipe', 'Ingredients', 'MVP'],
    image: '/api/placeholder/600/400',
    client: 'Food Tech Startup',
    timeline: '2 weeks',
    teamSize: '2 developers',
    results: ['Functional MVP', 'Ingredient matching', 'Recipe suggestions'],
    technologies: ['React', 'Spoonacular API', 'JavaScript', 'CSS'],
    liveUrl: 'https://recipe-finder-app.com',
    featured: false
  },
  {
    id: 'cat-prephub',
    title: 'CAT Prephub',
    description: 'CAT preparation platform with question pooling and scoring system',
    category: 'web-apps',
    tags: ['EdTech', 'Test Prep', 'CAT', 'Education'],
    image: '/api/placeholder/600/400',
    client: 'CAT Aspirants',
    timeline: '1 month',
    teamSize: '3 developers',
    results: ['MVP for CAT aspirants', 'Question pooling system', 'Scoring functionality'],
    technologies: ['React', 'Firebase', 'JavaScript', 'CSS'],
    liveUrl: 'https://cat-prephub.com',
    featured: false
  }
];

// Helper functions
export const getFeaturedProjects = () => {
  return portfolioItems.filter(item => item.featured);
};

export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return portfolioItems;
  return portfolioItems.filter(item => item.category === category);
};

export const getProjectById = (id: string) => {
  return portfolioItems.find(item => item.id === id);
};

export const getCategories = () => {
  const categories = new Set(portfolioItems.map(item => item.category));
  return Array.from(categories);
};

export const searchProjects = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return portfolioItems.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    item.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
}; 