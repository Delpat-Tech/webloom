export interface ClientQuote {
    text: string;
    attribution: string; // e.g., "Ankit Sharma, Founder of StartupX"
  }
  
  // Defines the structure for the main quantifiable result
  export interface HeadlineMetric {
    value: string; // e.g., "90%", "10+", "48"
    label: string; // e.g., "Reduction in manual work", "Hours saved per week", "Hour turnaround"
    icon: 'arrow-up' | 'arrow-down' | 'check'; // For visual representation
  }
  
  // The definitive, all-encompassing structure for a single portfolio project
  export interface PortfolioItem {
    // === SECTION A: FUNDAMENTALS ===
    id: string; // Unique slug, e.g., "omega-forex-crm"
    cardTitle: string; // The main, benefit-oriented headline for the portfolio card
    client: {
      name: string; // Official client name, or "Personal Project", "Internal R&D"
      location?: string; // e.g., "Dubai", "Pune"
      publiclyUsable: boolean; // Can we use their name/logo?
    };
    relationship?: {
      status: 'First Project' | 'Follow-up' | 'Ongoing';
      summary: string; // e.g., "This successful MVP led to a multi-year retainer."
    };
  
    // === SECTION B: THE STORY (THE "WHY") ===
    story: {
      problem: string; // The "Bleeding Neck Problem"
      impact: {
        time?: string; // e.g., "30 hours/week wasted"
        money?: string; // e.g., "₹2-3 Lakhs/month in operational costs"
        risk?: string; // e.g., "Failure to meet financial compliance standards"
      };
      previousSolution?: string; // What they tried before that failed
    };
  
    // === SECTION C: THE EXECUTION (THE "HOW") ===
    execution: {
      coreMandate: string; // Delpat's primary mission for the project
      smartMoment: string; // The clever insight or strategic decision we made
      features: string[]; // List of 3-5 key features delivered
    };
  
    // === SECTION D: THE OUTCOME (THE "SO WHAT?") ===
    outcome: {
      headlineMetric: HeadlineMetric;
      otherMetrics?: string[]; // e.g., ["Reduced costs by Y", "Increased conversions by Z"]
      qualitativeWins: string[];
      clientQuote?: ClientQuote;
    };
  
    // === SECTION F: META-DATA & TECH STACK ===
    meta: {
      persona: 'Ankit' | 'Priya' | 'Karan' | 'Mixed'; // Primary target persona
      serviceTrack: 'Product MVP' | 'Internal OS' | 'Automation MVP' | 'Custom' | 'R&D';
      featured: boolean; // Should this be highlighted on the main portfolio page?
      tags?: string[]; // Additional categorization tags, e.g., ["fintech", "mobile", "ai"]
      links: {
        live?: string;
        github?: string;
        caseStudy: string; // Internal link, e.g., "/proof/omega-forex-crm"
      };
    };
    techStack: {
      frontend?: string[];
      backend?: string[];
      database?: string[];
      deployment?: string[]; // Formerly "Infrastructure"
      integrations?: string[]; // Key APIs
      platforms?: string[]; // e.g., "WordPress", "Android"
    };
  }
  