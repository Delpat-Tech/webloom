'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star,
  TrendingUp,
  TrendingDown,
  Check,
  ExternalLink,
  Github,
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  Briefcase
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { PortfolioItem } from '@/data/portfolio-types';

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

// Helper function to get icon for headline metric
const getMetricIcon = (icon: 'arrow-up' | 'arrow-down' | 'check') => {
  switch (icon) {
    case 'arrow-up':
      return <TrendingUp className="w-4 h-4" />;
    case 'arrow-down':
      return <TrendingDown className="w-4 h-4" />;
    case 'check':
      return <Check className="w-4 h-4" />;
    default:
      return <TrendingUp className="w-4 h-4" />;
  }
};

// Helper function to get service track icon
const getServiceTrackIcon = (serviceTrack: string) => {
  switch (serviceTrack) {
    case 'Product MVP':
      return <Globe className="w-4 h-4" />;
    case 'Internal OS':
      return <Smartphone className="w-4 h-4" />;
    case 'Automation MVP':
      return <Code className="w-4 h-4" />;
    case 'Custom':
      return <Palette className="w-4 h-4" />;
    case 'R&D':
      return <Database className="w-4 h-4" />;
    default:
      return <Briefcase className="w-4 h-4" />;
  }
};

// CardFront Component
const CardFront: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Featured Badge */}
      {item.meta.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-medium shadow-lg">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Clean Image/Logo Section */}
      <div className="relative aspect-video overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/10 flex items-center justify-center relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/30 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent/30 rounded-br-lg"></div>
          </div>
          
          {/* Main logo/text */}
          <div className="text-primary/60 text-4xl font-bold relative z-10">
            {(() => {
              const titleParts = item.cardTitle.split(': ');
              const mainTitle = titleParts[0];
              const shortForm = mainTitle.split(' ').slice(0, 3).map(word => word[0]).join('');
              return shortForm;
            })()}
          </div>
        </div>
      </div>

      {/* Clean Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title Section */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {(() => {
              const titleParts = item.cardTitle.split(': ');
              return titleParts[0];
            })()}
          </h3>
          {(() => {
            const titleParts = item.cardTitle.split(': ');
            return titleParts[1] && (
              <p className="text-sm text-muted-foreground mt-1">
                {titleParts[1]}
              </p>
            );
          })()}
        </div>

        {/* Problem Summary */}
        <div className="mb-4 flex-1">
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {item.story.problem}
          </p>
        </div>

        {/* Clean Metrics Section */}
        <div className="mt-auto space-y-3">
          {/* Headline Metric */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                {getMetricIcon(item.outcome.headlineMetric.icon)}
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-foreground">
                  {item.outcome.headlineMetric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.outcome.headlineMetric.label}
                </div>
              </div>
            </div>
          </div>
          
          {/* View Details Button */}
          <Link href={`/portfolios/${item.id}`} className="block">
            <Button 
              variant="gradient-monotone" 
              className="w-full text-sm py-2"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// CardBack Component
const CardBack: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Execution Blueprint
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Technical stack and implementation details
        </p>
      </div>

      {/* Project Overview */}
      <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Project Overview</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-xs text-primary font-medium">{item.meta.serviceTrack}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Client:</span>
            <span className="font-medium">{item.client.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Persona:</span>
            <span className="font-medium">{item.meta.persona}</span>
          </div>
        </div>
      </div>

             {/* Enhanced Tech Stack */}
       <div className="flex-1 space-y-3">
         {item.techStack.frontend && item.techStack.frontend.length > 0 && (
           <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-3 border border-primary/10">
             <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
               <Code className="w-3 h-3" />
               Frontend
             </h4>
             <div className="flex flex-wrap gap-1">
               {item.techStack.frontend.slice(0, 5).map((tech, index) => (
                 <span
                   key={index}
                   className="px-2 py-1 bg-primary/15 text-primary text-xs rounded-md border border-primary/20"
                 >
                   {tech}
                 </span>
               ))}
               {item.techStack.frontend.length > 5 && (
                 <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                   +{item.techStack.frontend.length - 5}
                 </span>
               )}
             </div>
           </div>
         )}

         {item.techStack.backend && item.techStack.backend.length > 0 && (
           <div className="bg-gradient-to-r from-accent/5 to-transparent rounded-lg p-3 border border-accent/10">
             <h4 className="text-sm font-semibold text-accent mb-2 flex items-center gap-2">
               <Database className="w-3 h-3" />
               Backend
             </h4>
             <div className="flex flex-wrap gap-1">
               {item.techStack.backend.slice(0, 4).map((tech, index) => (
                 <span
                   key={index}
                   className="px-2 py-1 bg-accent/15 text-accent text-xs rounded-md border border-accent/20"
                 >
                   {tech}
                 </span>
               ))}
               {item.techStack.backend.length > 4 && (
                 <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                   +{item.techStack.backend.length - 4}
                 </span>
               )}
             </div>
           </div>
         )}

         {item.techStack.database && item.techStack.database.length > 0 && (
           <div className="bg-gradient-to-r from-secondary/5 to-transparent rounded-lg p-3 border border-secondary/10">
             <h4 className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
               <Database className="w-3 h-3" />
               Database
             </h4>
             <div className="flex flex-wrap gap-1">
               {item.techStack.database.slice(0, 3).map((tech, index) => (
                 <span
                   key={index}
                   className="px-2 py-1 bg-secondary/15 text-secondary text-xs rounded-md border border-secondary/20"
                 >
                   {tech}
                 </span>
               ))}
               {item.techStack.database.length > 3 && (
                 <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                   +{item.techStack.database.length - 3}
                 </span>
               )}
             </div>
           </div>
         )}

         {item.techStack.deployment && item.techStack.deployment.length > 0 && (
           <div className="bg-gradient-to-r from-muted/5 to-transparent rounded-lg p-3 border border-muted/10">
             <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
               <Globe className="w-3 h-3" />
               Deployment
             </h4>
             <div className="flex flex-wrap gap-1">
               {item.techStack.deployment.slice(0, 3).map((tech, index) => (
                 <span
                   key={index}
                   className="px-2 py-1 bg-muted/15 text-muted-foreground text-xs rounded-md border border-muted/20"
                 >
                   {tech}
                 </span>
               ))}
               {item.techStack.deployment.length > 3 && (
                 <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                   +{item.techStack.deployment.length - 3}
                 </span>
               )}
             </div>
           </div>
         )}
       </div>

      {/* Enhanced Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        {/* Service Track with Icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-primary/10 rounded">
              {getServiceTrackIcon(item.meta.serviceTrack)}
            </div>
            <span className="text-sm font-medium text-foreground">
              {item.meta.serviceTrack}
            </span>
          </div>
          {item.meta.tags && item.meta.tags.length > 0 && (
            <div className="flex gap-1">
              {item.meta.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-muted/50 text-muted-foreground text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Links */}
        <div className="flex gap-2">
          {item.meta.links.live && (
            <Link href={item.meta.links.live} target="_blank" className="flex-1">
              <Button variant="gradient-outline" className="w-full flex items-center justify-center gap-1 text-xs py-2">
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </Button>
            </Link>
          )}
          {item.meta.links.github && (
            <Link href={item.meta.links.github} target="_blank" className="flex-1">
              <Button variant="secondary" className="w-full flex items-center justify-center gap-1 text-xs py-2">
                <Github className="w-3 h-3" />
                Source Code
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Main PortfolioCard Component
const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
         <motion.div
       className={`group relative h-full min-h-[500px] max-h-[500px] perspective-1000 ${className}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardFront item={item} />
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="w-full h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardBack item={item} />
          </div>
        </motion.div>
      </motion.div>

      {/* Flip Hint */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs text-muted-foreground">
          Click to flip
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
