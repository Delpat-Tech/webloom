import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Search, Filter, Star, Award } from 'lucide-react';

// Enhanced tech stack data with proficiency levels and detailed information
const techStackData = {
  frontend: {
    title: "Frontend Technologies",
    description: "Building responsive, accessible, and performant user interfaces",
    tools: [
      { 
        name: 'React', 
        icon: 'logos:react',
        proficiency: 'Expert',
        yearsExperience: 4,
        projectCount: 15,
        description: 'Building scalable SPAs and complex component libraries',
        tags: ['Frontend', 'SPA', 'Component-based'],
        lastUsed: '2024',
        favorite: true,
        color: '#61DAFB',
        needsDarkModeFilter: false
      },
      { 
        name: 'Next.js', 
        icon: 'logos:nextjs-icon',
        proficiency: 'Expert',
        yearsExperience: 3,
        projectCount: 12,
        description: 'Full-stack React framework for production applications',
        tags: ['Full-stack', 'SSR', 'Performance'],
        lastUsed: '2024',
        favorite: true,
        color: 'currentColor',
        needsDarkModeFilter: false
      },
      { 
        name: 'TypeScript', 
        icon: 'logos:typescript-icon',
        proficiency: 'Expert',
        yearsExperience: 3,
        projectCount: 20,
        description: 'Type-safe JavaScript for robust applications',
        tags: ['Type Safety', 'Developer Experience'],
        lastUsed: '2024',
        favorite: true,
        color: '#3178C6',
        needsDarkModeFilter: false
      },
      { 
        name: 'Tailwind CSS', 
        icon: 'logos:tailwindcss-icon',
        proficiency: 'Expert',
        yearsExperience: 3,
        projectCount: 18,
        description: 'Utility-first CSS framework for rapid UI development',
        tags: ['Styling', 'Utility-first', 'Responsive'],
        lastUsed: '2024',
        favorite: true,
        color: '#06B6D4',
        needsDarkModeFilter: false
      },
      { 
        name: 'D3.js', 
        icon: 'logos:d3',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 5,
        description: 'Data visualization and interactive charts',
        tags: ['Data Viz', 'Charts', 'Interactive'],
        lastUsed: '2023',
        favorite: false,
        color: '#F9A03C',
        needsDarkModeFilter: false
      },
      { 
        name: 'React Native', 
        icon: 'logos:react',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 3,
        description: 'Cross-platform mobile development',
        tags: ['Mobile', 'Cross-platform'],
        lastUsed: '2023',
        favorite: false,
        color: '#61DAFB',
        needsDarkModeFilter: false
      },
      { 
        name: 'Angular', 
        icon: 'logos:angular-icon',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 4,
        description: 'Platform for building mobile and desktop web applications',
        tags: ['Frontend', 'SPA', 'TypeScript'],
        lastUsed: '2023',
        favorite: false,
        color: '#DD0031',
        needsDarkModeFilter: false
      },
      { 
        name: 'Bootstrap', 
        icon: 'logos:bootstrap',
        proficiency: 'Expert',
        yearsExperience: 4,
        projectCount: 12,
        description: 'CSS framework for developing responsive and mobile-first websites',
        tags: ['CSS Framework', 'Responsive', 'UI Components'],
        lastUsed: '2024',
        favorite: false,
        color: '#7952B3',
        needsDarkModeFilter: false
      },
      { 
        name: 'Three.js', 
        icon: 'logos:threejs',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 3,
        description: 'JavaScript 3D library for creating and displaying animated 3D graphics',
        tags: ['3D Graphics', 'WebGL', 'Animation'],
        lastUsed: '2023',
        favorite: false,
        color: '#000000',
        needsDarkModeFilter: true
      },
      { 
        name: 'AMP', 
        icon: 'logos:amp-icon',
        proficiency: 'Intermediate',
        yearsExperience: 1,
        projectCount: 2,
        description: 'Web component framework for easily creating user-first websites',
        tags: ['Performance', 'Mobile', 'SEO'],
        lastUsed: '2023',
        favorite: false,
        color: '#005AF0',
        needsDarkModeFilter: false
      }
    ]
  },
  backend: {
    title: "Backend & Database",
    description: "Robust server-side solutions and data management",
    tools: [
      { 
        name: 'Node.js', 
        icon: 'logos:nodejs-icon',
        proficiency: 'Expert',
        yearsExperience: 4,
        projectCount: 12,
        description: 'Server-side JavaScript runtime',
        tags: ['Backend', 'JavaScript', 'Runtime'],
        lastUsed: '2024',
        favorite: true,
        color: '#339933',
        needsDarkModeFilter: false
      },
      { 
        name: 'Express', 
        icon: 'logos:express',
        proficiency: 'Expert',
        yearsExperience: 4,
        projectCount: 10,
        description: 'Fast, unopinionated web framework',
        tags: ['Framework', 'API', 'Middleware'],
        lastUsed: '2024',
        favorite: true,
        color: '#000000',
        needsDarkModeFilter: true
      },
      { 
        name: 'MongoDB', 
        icon: 'logos:mongodb-icon',
        proficiency: 'Expert',
        yearsExperience: 3,
        projectCount: 8,
        description: 'NoSQL document database',
        tags: ['Database', 'NoSQL', 'Document'],
        lastUsed: '2024',
        favorite: true,
        color: '#47A248',
        needsDarkModeFilter: false
      },
      { 
        name: 'PostgreSQL', 
        icon: 'logos:postgresql',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 6,
        description: 'Advanced open-source relational database',
        tags: ['Database', 'SQL', 'Relational'],
        lastUsed: '2024',
        favorite: false,
        color: '#336791',
        needsDarkModeFilter: false
      },
      { 
        name: 'Firebase', 
        icon: 'logos:firebase',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 4,
        description: 'Backend-as-a-Service platform',
        tags: ['BaaS', 'Real-time', 'Cloud'],
        lastUsed: '2023',
        favorite: false,
        color: '#FFCA28',
        needsDarkModeFilter: false
      },
      { 
        name: 'Django', 
        icon: 'logos:django-icon',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 3,
        description: 'High-level Python web framework for rapid development',
        tags: ['Python', 'Web Framework', 'MVC'],
        lastUsed: '2023',
        favorite: false,
        color: '#092E20',
        needsDarkModeFilter: false
      },
      { 
        name: 'Flask', 
        icon: 'logos:flask',
        proficiency: 'Intermediate',
        yearsExperience: 1,
        projectCount: 2,
        description: 'Lightweight Python web framework',
        tags: ['Python', 'Micro-framework', 'API'],
        lastUsed: '2023',
        favorite: false,
        color: '#000000',
        needsDarkModeFilter: true
      },
      { 
        name: 'Golang', 
        icon: 'logos:go',
        proficiency: 'Beginner',
        yearsExperience: 1,
        projectCount: 1,
        description: 'Open source programming language for building simple, fast, and reliable software',
        tags: ['Backend', 'Performance', 'Concurrent'],
        lastUsed: '2023',
        favorite: false,
        color: '#00ADD8',
        needsDarkModeFilter: false
      }
    ]
  },
  infrastructure: {
    title: "Infrastructure & DevOps",
    description: "Scalable deployment and development operations",
    tools: [
      { 
        name: 'AWS', 
        icon: 'logos:aws',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 5,
        description: 'Cloud computing platform',
        tags: ['Cloud', 'Infrastructure', 'Scalable'],
        lastUsed: '2024',
        favorite: false,
        color: '#FF9900',
        needsDarkModeFilter: false
      },
      { 
        name: 'Docker', 
        icon: 'logos:docker-icon',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 4,
        description: 'Containerization platform',
        tags: ['Containers', 'DevOps', 'Deployment'],
        lastUsed: '2024',
        favorite: false,
        color: '#2496ED',
        needsDarkModeFilter: false
      },
      { 
        name: 'Vercel', 
        icon: 'logos:vercel-icon',
        proficiency: 'Expert',
        yearsExperience: 3,
        projectCount: 15,
        description: 'Deployment platform for frontend applications',
        tags: ['Deployment', 'Frontend', 'Performance'],
        lastUsed: '2024',
        favorite: true,
        color: '#000000',
        needsDarkModeFilter: true
      },
      { 
        name: 'GitHub', 
        icon: 'logos:github-icon',
        proficiency: 'Expert',
        yearsExperience: 5,
        projectCount: 50,
        description: 'Version control and collaboration platform',
        tags: ['Version Control', 'Collaboration', 'CI/CD'],
        lastUsed: '2024',
        favorite: true,
        color: 'currentColor',
        needsDarkModeFilter: true
      }
    ]
  },
  mobile: {
    title: "Mobile Development",
    description: "Native and cross-platform mobile application development",
    tools: [
      { 
        name: 'Android', 
        icon: 'logos:android-icon',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 3,
        description: 'Native Android development with Java/Kotlin',
        tags: ['Mobile', 'Native', 'Android'],
        lastUsed: '2023',
        favorite: false,
        color: '#3DDC84',
        needsDarkModeFilter: false
      }
    ]
  },
  cms: {
    title: "Content Management Systems",
    description: "Platforms for building and managing digital content",
    tools: [
      { 
        name: 'WordPress', 
        icon: 'logos:wordpress-icon',
        proficiency: 'Expert',
        yearsExperience: 5,
        projectCount: 20,
        description: 'Open-source content management system',
        tags: ['CMS', 'PHP', 'Blogging'],
        lastUsed: '2024',
        favorite: false,
        color: '#21759B',
        needsDarkModeFilter: false
      },
      { 
        name: 'Joomla', 
        icon: 'logos:joomla',
        proficiency: 'Intermediate',
        yearsExperience: 2,
        projectCount: 4,
        description: 'Open-source content management system',
        tags: ['CMS', 'PHP', 'Extensions'],
        lastUsed: '2023',
        favorite: false,
        color: '#F44321',
        needsDarkModeFilter: false
      }
    ]
  }
};

// Brand-aligned "Why We Use It" statements for each tool
const whyWeUse: Record<string, string> = {
  React: 'It enables rapid iteration with a mature ecosystem, reducing time-to-value for complex UIs.',
  'Next.js': 'It combines app and API in one framework, letting us ship production features faster.',
  TypeScript: 'It prevents costly bugs and speeds up refactors, improving delivery reliability.',
  'Tailwind CSS': 'It accelerates UI development while keeping design consistent and maintainable.',
  'D3.js': 'It turns data into clear, interactive visuals that drive better decisions.',
  'React Native': 'It delivers near-native mobile apps from one codebase, saving time and cost.',
  Angular: 'It offers strong patterns for complex apps where structure and scale matter.',
  Bootstrap: 'It provides proven, accessible components to move fast on standard UI.',
  'Three.js': 'It brings 3D to the web, enabling immersive experiences where they matter.',
  AMP: 'It ensures blazing-fast pages that improve reach and conversions on mobile.',
  'Node.js': 'It unifies frontend and backend skills, reducing handoffs and delivery friction.',
  Express: 'It is minimal and reliable, letting us build APIs quickly without bloat.',
  MongoDB: 'It ships fast with flexible schemas for evolving product needs.',
  PostgreSQL: 'It offers rock-solid reliability and SQL power for mission-critical data.',
  Firebase: 'It speeds up MVPs with auth, storage, and realtime out of the box.',
  Django: 'It offers batteries-included speed with security and admin tooling built-in.',
  Flask: 'It is lightweight and perfect for focused, high-performance services.',
  Golang: 'It delivers simple, fast services that are easy to scale and operate.',
  AWS: 'It provides global, scalable infrastructure to grow products confidently.',
  Docker: 'It standardizes environments so code runs the same from dev to production.',
  Vercel: 'It provides a seamless, world-class deployment and hosting experience that allows us to ship faster and more reliably.',
  GitHub: 'It powers our collaboration, reviews, and CI/CD to keep quality high.',
  Android: 'It reaches the largest mobile audience with performant native experiences.',
  WordPress: 'It enables fast content-led sites with a robust plugin ecosystem.',
  Joomla: 'It supports flexible content structures where custom workflows are needed.'
};

// Proficiency level configuration
const proficiencyConfig = {
  Expert: { color: '#10B981', bgColor: 'hsl(var(--muted))', level: 3 },
  Intermediate: { color: '#F59E0B', bgColor: 'hsl(var(--muted))', level: 2 },
  Beginner: { color: '#EF4444', bgColor: 'hsl(var(--muted))', level: 1 }
};

// Filter and search functionality
const TechStackSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProficiency, setSelectedProficiency] = useState('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  React.useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    const filtered = Object.entries(techStackData).map(([key, category]) => ({
      key,
      ...category,
      tools: category.tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'all' || key === selectedCategory;
        const matchesProficiency = selectedProficiency === 'all' || tool.proficiency === selectedProficiency;
        
        return matchesSearch && matchesCategory && matchesProficiency;
      })
    })).filter(category => category.tools.length > 0);

    return filtered;
  }, [searchTerm, selectedCategory, selectedProficiency]);

  const categories = Object.keys(techStackData);
  const proficiencies = Object.keys(proficiencyConfig);

  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-20 px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span>Technology Philosophy</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Our Tech Philosophy &amp;{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don&apos;t chase trends. We choose reliable, scalable tools that get the job done right.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-2">
            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm focus:outline-none cursor-pointer text-foreground"
              >
                <option value="all" className="text-foreground bg-card">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="text-foreground bg-card">
                    {techStackData[category as keyof typeof techStackData].title}
                  </option>
                ))}
              </select>
            </div>

            {/* Proficiency Filter */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
              <Award className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedProficiency}
                onChange={(e) => setSelectedProficiency(e.target.value)}
                className="bg-transparent text-sm focus:outline-none cursor-pointer text-foreground"
              >
                <option value="all" className="text-foreground bg-card">All Levels</option>
                {proficiencies.map(level => (
                  <option key={level} value={level} className="text-foreground bg-card">{level}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Tech Stack Sections */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredData.map((category, categoryIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="relative"
              >
                {/* Category Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (toolIndex * 0.05) }}
                      onHoverStart={() => setHoveredTech(tool.name)}
                      onHoverEnd={() => setHoveredTech(null)}
                    >
                      {/* Tech Card */}
                      <motion.div
                        className="relative bg-card border border-border rounded-xl p-4 cursor-pointer overflow-hidden"
                        whileHover={{ 
                          y: -8,
                          scale: 1.02,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Background gradient based on tech color */}
                        <div 
                          className="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                          style={{ backgroundColor: tool.color }}
                        />

                        {/* Favorite indicator */}
                        {tool.favorite && (
                          <motion.div
                            className="absolute top-2 right-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          </motion.div>
                        )}

                        {/* Icon Container */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Icon 
                                icon={tool.icon} 
                                className="w-8 h-8"
                                style={{ 
                                  color: tool.needsDarkModeFilter ? 'currentColor' : tool.color,
                                  filter: tool.needsDarkModeFilter 
                                    ? isDarkMode 
                                      ? 'brightness(0) saturate(100%) invert(1)' 
                                      : 'brightness(0) saturate(100%)'
                                    : 'none'
                                }}
                              />
                            </div>
                            
                            
                          </div>

                          {/* Tech Name */}
                          <div>
                            <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {tool.proficiency}
                            </p>
                          </div>

                          
                        </div>
                      </motion.div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredTech === tool.name && (
                          <motion.div
                            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="bg-popover border border-border rounded-lg p-3 shadow-lg max-w-xs">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon 
                                  icon={tool.icon} 
                                  className="w-4 h-4"
                                  style={{ 
                                    color: tool.needsDarkModeFilter ? 'currentColor' : tool.color,
                                    filter: tool.needsDarkModeFilter 
                                      ? isDarkMode 
                                        ? 'brightness(0) saturate(100%) invert(1)' 
                                        : 'brightness(0) saturate(100%)'
                                      : 'none'
                                  }}
                                />
                                <span className="font-semibold text-sm text-foreground">{tool.name}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-semibold text-foreground mb-1">Why We Use It:</span>
                                <p className="text-xs text-muted-foreground">{whyWeUse[tool.name] || 'It delivers clear business value and reduces operational friction so we can ship reliably.'}</p>
                              </div>
                            </div>
                            {/* Tooltip arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Philosophy Statement */}
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + 0.3 }}
                >
                  <p className="text-sm text-muted-foreground italic max-w-3xl mx-auto">
                    {category.key === 'frontend' && "*We choose robust, scalable technologies that provide a reliable foundation for user experiences that just work.*"}
                    {category.key === 'backend' && "*We prioritize proven, battle-tested solutions that scale with your business, not trendy frameworks that fade.*"}
                    {category.key === 'infrastructure' && "*We select tools that minimize complexity while maximizing reliability - your infrastructure should work for you, not against you.*"}
                    {category.key === 'mobile' && "*We focus on technologies that deliver native performance while maintaining development efficiency across platforms.*"}
                    {category.key === 'cms' && "*We choose platforms that balance flexibility with ease of use, ensuring content management doesn't become a bottleneck.*"}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filteredData.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No technologies found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;