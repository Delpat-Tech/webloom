export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  client: string;
  timeline: string;
  teamSize: string;
  budget: string;
  results: string[];
  technologies: string[];
  liveUrl?: string;
  featured: boolean;
  challenge: string;
  solution: string;
  process: string[];
  projectId?: string; // Link to related project
  serviceId?: string; // Link to related service
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
  gallery: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'omega-forex-trading',
    title: 'Omega Forex Trading App',
    subtitle: 'Real-time forex trading application with live market data integration',
    description: 'A comprehensive mobile trading application that provides real-time forex trading capabilities with advanced features and live market data integration.',
    category: 'mobile-apps',
    tags: ['Finance', 'Trading', 'Real-time', 'Forex', 'Mobile App'],
    image: '/api/placeholder/1200/600',
    client: 'Omega Forex',
    timeline: '2-3 months',
    teamSize: '3 developers',
    budget: '$80,000',
    results: [
      'Successfully deployed with DP@FIN data',
      'Real-time market data integration',
      'Advanced trading features implemented',
      'Mobile-first trading experience'
    ],
    technologies: ['React Native', 'MERN Stack', 'AWS', 'WebSocket'],
    liveUrl: 'https://omega-forex.com',
    featured: true,
    projectId: 'omega-forex-trading',
    serviceId: 'mvp-engine',
    challenge: 'Omega Forex needed a mobile trading platform that could handle real-time market data with minimal latency while providing advanced trading features and ensuring data accuracy across multiple forex pairs.',
    solution: 'We developed a React Native application with real-time WebSocket connections, integrated multiple data providers, implemented advanced charting with technical indicators, and built a robust trading engine with order management.',
    process: [
      'Requirements analysis and market research',
      'Architecture design for real-time data handling',
      'React Native app development with trading UI',
      'WebSocket integration for live market data',
      'Advanced charting and technical analysis',
      'Testing and deployment with DP@FIN data'
    ],
    metrics: [
      { label: 'Real-time Data', value: 'Live', icon: 'Activity' },
      { label: 'Trading Pairs', value: '50+', icon: 'TrendingUp' },
      { label: 'Latency', value: '<100ms', icon: 'Zap' },
      { label: 'Uptime', value: '99.9%', icon: 'Shield' }
    ],
    testimonials: [
      {
        quote: 'The trading app exceeded our expectations. The real-time data integration and advanced features have significantly improved our trading efficiency.',
        author: 'Alex Thompson',
        role: 'Trading Director',
        company: 'Omega Forex'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'omega-forex-crm',
    title: 'CRM for Omega Forex',
    subtitle: 'Comprehensive CRM system with integrated trading features',
    description: 'A full-featured CRM system designed specifically for forex trading companies, integrating client management with trading account monitoring.',
    category: 'web-apps',
    tags: ['CRM', 'Finance', 'SaaS', 'Trading', 'Client Management'],
    image: '/api/placeholder/1200/600',
    client: 'Omega Forex',
    timeline: '2 months',
    teamSize: '2 developers',
    budget: '$45,000',
    projectId: 'omega-forex-crm',
    serviceId: 'internal-os',
    results: [
      'Live deployment on Vercel',
      'Integrated trading logic',
      'Full CRM functionality',
      'Real-time client monitoring'
    ],
    technologies: ['MERN Stack', 'Tailwind CSS', 'Auth0', 'Vercel'],
    liveUrl: 'https://omega-crm.vercel.app',
    featured: true,
    challenge: 'Omega Forex required a CRM that could seamlessly integrate with their trading platform, manage client relationships, and provide insights into trading performance and client behavior.',
    solution: 'We built a modern web application using the MERN stack with real-time data synchronization, comprehensive client management features, and integrated trading account monitoring.',
    process: [
      'Client requirements and trading workflow analysis',
      'Database design for CRM and trading data',
      'Frontend development with Tailwind CSS',
      'Backend API with trading integration',
      'Authentication and security implementation',
      'Deployment and testing on Vercel'
    ],
    metrics: [
      { label: 'Client Management', value: '100%', icon: 'Users' },
      { label: 'Trading Integration', value: 'Real-time', icon: 'Activity' },
      { label: 'Deployment', value: 'Vercel', icon: 'Globe' },
      { label: 'Security', value: 'Auth0', icon: 'Shield' }
    ],
    testimonials: [
      {
        quote: 'The CRM has streamlined our client management process and provided valuable insights into trading performance.',
        author: 'Sarah Chen',
        role: 'Operations Manager',
        company: 'Omega Forex'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'fond-food-delivery',
    title: 'FOND - Food on Demand',
    subtitle: 'HackMITWPU winning food delivery prototype with queue-based fair access',
    description: 'An innovative food delivery prototype that addresses the challenge of fair food access through an intelligent queue system.',
    category: 'mobile-apps',
    tags: ['Food Delivery', 'Hackathon', 'Queue System', 'Prototype', 'Fair Access'],
    image: '/api/placeholder/1200/600',
    client: 'HackMITWPU',
    timeline: '3 days (Hackathon)',
    teamSize: '4 developers',
    budget: '$0 (Hackathon)',
    results: [
      'Won HackMITWPU',
      'Queue-based fair access',
      'Working prototype',
      'Innovation award'
    ],
    technologies: ['Figma', 'JavaScript', 'CSS', 'React'],
    featured: true,
    projectId: 'fond-food-delivery',
    serviceId: 'mvp-engine',
    challenge: 'The hackathon challenge was to create a solution for fair food distribution in crowded environments, ensuring everyone gets equal access to food without chaos or unfair advantages.',
    solution: 'We developed a queue-based system with real-time updates, fair distribution algorithms, and an intuitive mobile interface that ensures orderly and equitable food access.',
    process: [
      'Problem identification and solution brainstorming',
      'UI/UX design with Figma',
      'Frontend development with React',
      'Queue algorithm implementation',
      'Real-time updates and notifications',
      'Demo preparation and presentation'
    ],
    metrics: [
      { label: 'Competition', value: 'Winner', icon: 'Award' },
      { label: 'Development Time', value: '3 days', icon: 'Clock' },
      { label: 'Team Size', value: '4 developers', icon: 'Users' },
      { label: 'Innovation', value: 'Queue System', icon: 'Lightbulb' }
    ],
    testimonials: [
      {
        quote: 'FOND demonstrated innovative thinking and technical excellence. The queue system was both practical and fair.',
        author: 'HackMITWPU Judges',
        role: 'Competition Panel',
        company: 'HackMITWPU'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'japmala-app',
    title: 'Japmala Meditation App',
    subtitle: 'Interactive meditation app with spiritual beads for iOS platform',
    description: 'A spiritual meditation application designed for iOS that combines traditional meditation practices with modern technology.',
    category: 'mobile-apps',
    tags: ['Meditation', 'Spiritual', 'iOS', 'Health', 'Wellness'],
    image: '/api/placeholder/1200/600',
    client: 'Japmala',
    timeline: 'Ongoing (Live)',
    teamSize: '2 developers',
    budget: '$35,000',
    results: [
      'Published on Apple Store',
      'Interactive meditation features',
      'Spiritual engagement',
      'User retention success'
    ],
    technologies: ['iOS', 'Swift', 'Core Data', 'UIKit'],
    liveUrl: 'https://apps.apple.com/japmala',
    featured: false,
    projectId: 'japmala-app',
    serviceId: 'mvp-engine',
    challenge: 'Japmala needed to create an iOS app that could authentically represent spiritual meditation practices while providing an engaging user experience for modern users.',
    solution: 'We developed a native iOS application using Swift that features interactive spiritual beads, guided meditation sessions, and a clean, calming interface that respects traditional practices.',
    process: [
      'Spiritual practice research and consultation',
      'iOS app architecture design',
      'Swift development with UIKit',
      'Core Data integration for user progress',
      'Apple Store submission and approval',
      'Ongoing maintenance and updates'
    ],
    metrics: [
      { label: 'Platform', value: 'iOS', icon: 'Smartphone' },
      { label: 'Store Rating', value: '4.5/5', icon: 'Star' },
      { label: 'Active Users', value: '10K+', icon: 'Users' },
      { label: 'Retention Rate', value: '85%', icon: 'Heart' }
    ],
    testimonials: [
      {
        quote: 'The app perfectly captures the essence of spiritual meditation while being accessible to modern users.',
        author: 'Priya Sharma',
        role: 'Founder',
        company: 'Japmala'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'school-website-erp',
    title: 'School Website ERP System',
    subtitle: 'Complete ERP system with student management and fee tracking',
    description: 'A comprehensive ERP system designed for educational institutions to manage students, fees, attendance, and administrative tasks.',
    category: 'web-apps',
    tags: ['ERP', 'Education', 'Management', 'Database', 'Student Portal'],
    image: '/api/placeholder/1200/600',
    client: 'Educational Institution',
    timeline: '2 months',
    teamSize: '2 developers',
    budget: '$60,000',
    results: [
      'Full-featured ERP system',
      'Student/fee/attendance tracking',
      'Robust admin controls',
      'Streamlined operations'
    ],
    technologies: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    liveUrl: 'https://school-erp.com',
    featured: false,
    projectId: 'school-website-erp',
    serviceId: 'internal-os',
    challenge: 'The educational institution needed a comprehensive system to manage student records, track fees, monitor attendance, and streamline administrative processes that were previously handled manually.',
    solution: 'We developed a complete ERP system using PHP and MySQL that includes student management, fee tracking, attendance monitoring, and administrative controls with a user-friendly interface.',
    process: [
      'Educational workflow analysis',
      'Database design for student management',
      'PHP backend development',
      'Frontend interface design',
      'Fee tracking system implementation',
      'Attendance monitoring features',
      'Testing and deployment',
      'Staff training and support'
    ],
    metrics: [
      { label: 'Students Managed', value: '500+', icon: 'Users' },
      { label: 'Process Efficiency', value: '80%', icon: 'Activity' },
      { label: 'Data Accuracy', value: '99%', icon: 'CheckCircle' },
      { label: 'Time Savings', value: '70%', icon: 'Clock' }
    ],
    testimonials: [
      {
        quote: 'The ERP system has transformed our administrative processes. Everything is now organized and accessible.',
        author: 'Dr. Rajesh Kumar',
        role: 'Principal',
        company: 'Educational Institution'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'pygame-neat-bot',
    title: 'Pygame + NEAT AI Bot',
    subtitle: 'Flappy Bird game with AI bot trained using NEAT algorithm',
    description: 'An innovative gaming project that combines classic gameplay with artificial intelligence, featuring a Flappy Bird game with an AI bot trained using the NEAT algorithm.',
    category: 'automation',
    tags: ['AI', 'Gaming', 'NEAT', 'Machine Learning', 'Python'],
    image: '/api/placeholder/1200/600',
    client: 'Personal Project',
    timeline: '3 weeks',
    teamSize: '1 developer',
    budget: '$0 (Personal)',
    results: [
      'Working AI bot implementation',
      'NEAT algorithm success',
      'Multiplayer functionality',
      'Research contribution'
    ],
    technologies: ['Python', 'Pygame', 'NEAT', 'NumPy'],
    githubUrl: 'https://github.com/username/pygame-neat',
    featured: false,
    projectId: 'pygame-neat-bot',
    serviceId: 'automation-mvp',
    challenge: 'The project aimed to demonstrate the capabilities of the NEAT (NeuroEvolution of Augmenting Topologies) algorithm by training an AI bot to play Flappy Bird, requiring both game development and AI implementation.',
    solution: 'We developed a Flappy Bird game using Pygame and implemented the NEAT algorithm to train an AI bot that could successfully navigate the game, including multiplayer functionality for human vs AI competition.',
    process: [
      'Game development with Pygame',
      'NEAT algorithm implementation',
      'AI training and optimization',
      'Multiplayer feature development',
      'Testing and performance tuning',
      'Documentation and research'
    ],
    metrics: [
      { label: 'AI Success Rate', value: '95%', icon: 'Target' },
      { label: 'Training Time', value: '2 hours', icon: 'Clock' },
      { label: 'Game Performance', value: '60 FPS', icon: 'Activity' },
      { label: 'Research Value', value: 'High', icon: 'Lightbulb' }
    ],
    testimonials: [
      {
        quote: 'This project demonstrates the power of evolutionary algorithms in gaming. The AI learned to play better than most humans.',
        author: 'AI Research Community',
        role: 'Technical Review',
        company: 'Open Source'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'dehazing-ai',
    title: 'Dehazing AI System',
    subtitle: 'Real-time image dehazing with particle dispersion using computer vision',
    description: 'A computer vision system that removes haze from images in real-time using advanced AI algorithms and particle dispersion techniques.',
    category: 'automation',
    tags: ['AI', 'Computer Vision', 'Image Processing', 'Real-time', 'Deep Learning'],
    image: '/api/placeholder/1200/600',
    client: 'Research Project',
    timeline: '2 months',
    teamSize: '2 developers',
    budget: '$25,000',
    results: [
      'Presentation ready',
      'Real-time dehazing',
      'Optimized for speed and accuracy',
      'Research publication'
    ],
    technologies: ['Python', 'OpenCV', 'Deep Learning', 'TensorFlow'],
    githubUrl: 'https://github.com/username/dehazing-ai',
    featured: false,
    projectId: 'dehazing-ai',
    serviceId: 'automation-mvp',
    challenge: 'The research project required developing a real-time image dehazing system that could remove atmospheric haze from images while maintaining processing speed and accuracy for practical applications.',
    solution: 'We implemented a computer vision system using OpenCV and deep learning techniques that processes images in real-time, removing haze while preserving image quality and optimizing for both speed and accuracy.',
    process: [
      'Computer vision research and analysis',
      'Deep learning model development',
      'Real-time processing implementation',
      'Particle dispersion algorithm',
      'Performance optimization',
      'Testing and validation',
      'Research documentation'
    ],
    metrics: [
      { label: 'Processing Speed', value: 'Real-time', icon: 'Zap' },
      { label: 'Accuracy', value: '92%', icon: 'Target' },
      { label: 'Image Quality', value: 'Enhanced', icon: 'Eye' },
      { label: 'Research Impact', value: 'High', icon: 'Lightbulb' }
    ],
    testimonials: [
      {
        quote: 'The dehazing system shows remarkable results in real-time processing. It has significant applications in surveillance and photography.',
        author: 'Dr. Chen Wei',
        role: 'Research Director',
        company: 'Computer Vision Lab'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'ui-ux-redesign',
    title: 'UI/UX Platform Redesign',
    subtitle: 'Modern design system for better user engagement',
    description: 'A complete UI/UX redesign that modernized the user interface and improved user engagement through better design and user experience.',
    category: 'ui-ux',
    tags: ['UI/UX', 'Design System', 'User Experience', 'Modern Design'],
    image: '/api/placeholder/1200/600',
    client: 'DesignFlow Agency',
    timeline: '3 months',
    teamSize: '3 designers',
    budget: '$60,000',
    results: [
      '40% increase in user engagement',
      '25% improvement in conversion rate',
      '90% user satisfaction score',
      'Reduced support tickets by 30%'
    ],
    technologies: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion', 'Storybook'],
    featured: false,
    projectId: 'ui-ux-redesign',
    serviceId: 'mvp-engine',
    challenge: 'DesignFlow had an outdated interface that was causing poor user engagement and high bounce rates. They needed a modern, intuitive design that would improve user experience and conversion rates.',
    solution: 'We redesigned the entire user interface with a modern design system, improved user flows, and implemented smooth animations. The new design focused on accessibility, usability, and visual appeal.',
    process: [
      'User research and analysis',
      'Design system creation',
      'Wireframing and prototyping',
      'UI component development',
      'User testing and iteration',
      'Implementation and deployment',
      'Performance optimization',
      'User feedback integration'
    ],
    metrics: [
      { label: 'User Engagement', value: '40%', icon: 'Users' },
      { label: 'Conversion Rate', value: '25%', icon: 'TrendingUp' },
      { label: 'User Satisfaction', value: '90%', icon: 'Heart' },
      { label: 'Support Reduction', value: '30%', icon: 'Settings' }
    ],
    testimonials: [
      {
        quote: 'The redesign has completely transformed our user experience. Our engagement metrics have never been better, and our users love the new interface.',
        author: 'Mark Davis',
        role: 'Product Manager',
        company: 'DesignFlow Agency'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'saas-platform',
    title: 'SaaS Platform Development',
    subtitle: 'Complete SaaS solution from concept to launch',
    description: 'A full-featured SaaS platform that includes user management, billing, analytics, and multi-tenancy capabilities for a growing software company.',
    category: 'web-apps',
    tags: ['SaaS', 'Multi-tenancy', 'Billing', 'User Management'],
    image: '/api/placeholder/1200/600',
    client: 'CloudTech Solutions',
    timeline: '7 months',
    teamSize: '5 developers',
    budget: '$180,000',
    results: [
      '500+ active customers',
      '99.9% uptime maintained',
      '$500K annual recurring revenue',
      'Scalable multi-tenant architecture'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
    liveUrl: 'https://cloudtech-saas.com',
    featured: false,
    projectId: 'saas-platform',
    serviceId: 'internal-os',
    challenge: 'CloudTech needed a scalable SaaS platform that could handle multiple customers, complex billing, and provide a seamless user experience. They required multi-tenancy, user management, and payment processing.',
    solution: 'We built a comprehensive SaaS platform with multi-tenant architecture, user management, subscription billing, analytics dashboard, and scalable infrastructure. The platform supports multiple pricing tiers and customer onboarding.',
    process: [
      'SaaS architecture design',
      'Multi-tenant database design',
      'User management system',
      'Billing and payment integration',
      'Analytics and reporting',
      'Security and compliance',
      'Deployment and scaling',
      'Customer onboarding system'
    ],
    metrics: [
      { label: 'Active Customers', value: '500+', icon: 'Users' },
      { label: 'Uptime', value: '99.9%', icon: 'Shield' },
      { label: 'Annual Revenue', value: '$500K', icon: 'DollarSign' },
      { label: 'Architecture', value: 'Scalable', icon: 'Settings' }
    ],
    testimonials: [
      {
        quote: 'The SaaS platform has been the foundation of our business growth. The multi-tenant architecture and billing system work flawlessly.',
        author: 'Jennifer Lee',
        role: 'CTO',
        company: 'CloudTech Solutions'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'ats-resume-ranker',
    title: 'ATS Resume Ranker',
    subtitle: 'AI-powered resume scoring system based on job description matching',
    description: 'An intelligent resume analysis system that uses AI to score resumes against job descriptions, helping both job seekers and recruiters.',
    category: 'automation',
    tags: ['HR Tech', 'AI', 'Resume', 'ATS', 'Recruitment'],
    image: '/api/placeholder/1200/600',
    client: 'HR Tech Startup',
    timeline: '1 month',
    teamSize: '2 developers',
    budget: '$30,000',
    results: [
      'Helps job applicants',
      'Resume parsing success',
      'JD matching accuracy',
      'Recruitment efficiency'
    ],
    technologies: ['Flask', 'OpenAI API', 'JavaScript', 'Python'],
    liveUrl: 'https://ats-ranker.com',
    featured: false,
    projectId: 'ats-resume-ranker',
    serviceId: 'automation-mvp',
    challenge: 'The HR tech startup needed an AI-powered system that could analyze resumes and match them against job descriptions, helping both job seekers optimize their resumes and recruiters find better candidates.',
    solution: 'We developed an AI-powered resume ranking system using OpenAI API that analyzes resume content, extracts key information, and scores it against job descriptions with detailed feedback and optimization suggestions.',
    process: [
      'AI model selection and training',
      'Resume parsing algorithm development',
      'Job description analysis system',
      'Matching algorithm implementation',
      'Web interface development',
      'Testing and validation',
      'Deployment and monitoring'
    ],
    metrics: [
      { label: 'Accuracy', value: '85%', icon: 'Target' },
      { label: 'Processing Speed', value: '<30s', icon: 'Zap' },
      { label: 'User Satisfaction', value: '90%', icon: 'Heart' },
      { label: 'Resume Optimization', value: '40%', icon: 'TrendingUp' }
    ],
    testimonials: [
      {
        quote: 'The ATS ranker has revolutionized our recruitment process. We can now quickly identify the best candidates and help job seekers improve their applications.',
        author: 'Lisa Chen',
        role: 'HR Director',
        company: 'HR Tech Startup'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'ai-resume-optimizer',
    title: 'AI Resume Optimizer',
    subtitle: 'Intelligent resume and cover letter improvement using AI analysis',
    description: 'An AI-powered tool that analyzes and optimizes resumes and cover letters to improve job application success rates.',
    category: 'automation',
    tags: ['HR Tech', 'AI', 'Resume', 'Cover Letter', 'Job Search'],
    image: '/api/placeholder/1200/600',
    client: 'Job Seekers',
    timeline: '1 month',
    teamSize: '1 developer',
    budget: '$25,000',
    results: [
      'Smart resume improvement',
      'Context-aware suggestions',
      'AI-powered optimization',
      'Higher interview rates'
    ],
    technologies: ['OpenAI', 'Flask', 'Python', 'NLP'],
    liveUrl: 'https://ai-resume-optimizer.com',
    featured: false,
    projectId: 'ai-resume-optimizer',
    serviceId: 'automation-mvp',
    challenge: 'Job seekers needed an intelligent tool that could analyze their resumes and cover letters, provide specific improvement suggestions, and help them stand out in competitive job markets.',
    solution: 'We developed an AI-powered resume optimizer using OpenAI that analyzes resume content, identifies areas for improvement, provides specific suggestions, and helps users create more compelling job applications.',
    process: [
      'NLP model development',
      'Resume analysis algorithm',
      'Suggestion generation system',
      'Web interface design',
      'User feedback integration',
      'Testing and refinement',
      'Deployment and launch'
    ],
    metrics: [
      { label: 'Interview Rate', value: '60%', icon: 'Target' },
      { label: 'Resume Score', value: '+40%', icon: 'TrendingUp' },
      { label: 'User Success', value: '85%', icon: 'CheckCircle' },
      { label: 'AI Accuracy', value: '90%', icon: 'Settings' }
    ],
    testimonials: [
      {
        quote: 'The AI optimizer helped me land my dream job. The suggestions were specific and actionable.',
        author: 'Sarah Williams',
        role: 'Job Seeker',
        company: 'Individual User'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  },
  {
    id: 'cat-prephub',
    title: 'CAT Prephub',
    subtitle: 'CAT preparation platform with question pooling and scoring system',
    description: 'A comprehensive preparation platform for CAT aspirants featuring question pooling, scoring, and personalized study plans.',
    category: 'web-apps',
    tags: ['EdTech', 'Test Prep', 'CAT', 'Education', 'Learning'],
    image: '/api/placeholder/1200/600',
    client: 'CAT Aspirants',
    timeline: '1 month',
    teamSize: '3 developers',
    budget: '$40,000',
    results: [
      'MVP for CAT aspirants',
      'Question pooling system',
      'Scoring functionality',
      'Personalized learning'
    ],
    technologies: ['React', 'Firebase', 'JavaScript', 'CSS'],
    liveUrl: 'https://cat-prephub.com',
    featured: false,
    projectId: 'cat-prephub',
    serviceId: 'mvp-engine',
    challenge: 'CAT aspirants needed a comprehensive preparation platform that could provide practice questions, track progress, and offer personalized study plans to improve their chances of success.',
    solution: 'We developed a React-based platform with Firebase backend that includes question pooling, scoring systems, progress tracking, and personalized study recommendations for CAT preparation.',
    process: [
      'Educational content analysis',
      'Question database design',
      'React frontend development',
      'Firebase backend integration',
      'Scoring algorithm implementation',
      'Progress tracking system',
      'Testing and deployment'
    ],
    metrics: [
      { label: 'Active Users', value: '1000+', icon: 'Users' },
      { label: 'Question Bank', value: '5000+', icon: 'Database' },
      { label: 'Success Rate', value: '75%', icon: 'Target' },
      { label: 'User Engagement', value: '80%', icon: 'Heart' }
    ],
    testimonials: [
      {
        quote: 'CAT Prephub has been instrumental in my preparation. The personalized study plans and question bank are excellent.',
        author: 'Rahul Sharma',
        role: 'CAT Aspirant',
        company: 'Student'
      }
    ],
    gallery: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  }
];

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter(study => study.featured);
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(study => study.id === id);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return caseStudies.filter(study => study.category === category);
} 