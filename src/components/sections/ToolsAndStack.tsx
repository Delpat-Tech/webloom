import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

// Comprehensive tech stack data based on portfolio projects
const techStackData = {
  frontend: [
    { name: 'React', icon: 'logos:react' },
    { name: 'Next.js', icon: 'logos:nextjs-icon' },
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
    { name: 'JavaScript', icon: 'logos:javascript' },
    { name: 'HTML', icon: 'logos:html-5' },
    { name: 'CSS', icon: 'logos:css-3' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
    { name: 'React Native', icon: 'logos:react' },
    { name: 'D3.js', icon: 'logos:d3' },
    { name: 'Chart.js', icon: 'logos:chartjs' }
  ],
  backend: [
    { name: 'Node.js', icon: 'logos:nodejs-icon' },
    { name: 'Express', icon: 'logos:express', needsDarkModeFilter: true },
    { name: 'MongoDB', icon: 'logos:mongodb-icon' },
    { name: 'PostgreSQL', icon: 'logos:postgresql' },
    { name: 'MySQL', icon: 'logos:mysql' },
    { name: 'Firebase', icon: 'logos:firebase' },
    { name: 'PHP', icon: 'logos:php' },
    { name: 'Python', icon: 'logos:python' },
    { name: 'Flask', icon: 'logos:flask', needsDarkModeFilter: true },
    { name: 'WordPress', icon: 'logos:wordpress' },
    { name: 'Auth0', icon: 'logos:auth0', needsDarkModeFilter: true },
    { name: 'WebSocket', icon: 'logos:websocket', needsDarkModeFilter: true }
  ],
  infrastructure: [
    { name: 'AWS', icon: 'logos:aws' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'Vercel', icon: 'logos:vercel-icon', needsDarkModeFilter: true },
    { name: 'GitHub', icon: 'logos:github-icon', needsDarkModeFilter: true },
    { name: 'iOS', icon: 'logos:apple', needsDarkModeFilter: true },
    { name: 'Android', icon: 'logos:android-icon' },
    { name: 'Swift', icon: 'logos:swift' },
    { name: 'Java', icon: 'logos:java' },
    { name: 'SQLite', icon: 'logos:sqlite' },
    
  ],

};

// Section component for each category
const TechSection = ({ 
  title, 
  description, 
  tools, 
  iconSize = 50 
}: { 
  title: string; 
  description: string; 
  tools: { name: string; icon: React.ReactNode; reason: string; }[]; 
  iconSize?: number; 
}) => (
  <motion.div 
    className="mb-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center mb-8">
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
        {description}
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tools.map((tool, index) => (
        <motion.div 
          key={index}
          className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          whileHover={{ y: -3 }}
        >
          {/* Icon Container */}
          <div 
            className="mb-2 p-2 rounded-lg transition-all duration-200 group-hover:scale-110 bg-card shadow-sm"
            style={{
              width: iconSize + 16,
              height: iconSize + 16,
            }}
          >
            <div className="w-6 h-6 text-foreground">
              {tool.icon}
            </div>
          </div>
          
          {/* Label */}
          <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
            {tool.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const TechStackSection = ({ 
  techStack 
}: { techStack: { category: string; description: string; tools: { name: string; icon: React.ReactNode; reason: string; }[]; }[] }) => {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto w-full">
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
        
        {/* Tech Stack Sections */}
        <div className="px-2 sm:px-0">
          {techStack.map((category, index) => (
            <TechSection 
              key={index}
              title={category.category}
              description={category.description}
              tools={category.tools}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;