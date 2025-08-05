import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'react-feather';
import { Rocket } from 'lucide-react';
import React from 'react';
import SimpleCard from '@/components/ui/SimpleCard';

// Type for icon that can accept className
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

type IconType = React.ComponentType<IconProps>;

export interface ThinkingCategory {
  title: string;
  description: string;
  icon: IconType;
  articleCount: number;
  featured: string;
  color?: string;
}

interface HowWeThinkProps {
  categories: ThinkingCategory[];
}

const HowWeThink: React.FC<HowWeThinkProps> = ({ categories }) => {
  return (
    <section id="thinking" className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
            <span>The Execution Playbook</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            How We{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Think
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A collection of essays and articles on our philosophy of technology, productivity, and startup execution.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <SimpleCard className="group relative h-full p-6 sm:p-8 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-500 cursor-pointer flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-primary/10">
                {/* Enhanced background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-105" />

                {/* Icon with enhanced animation */}
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary mb-4 sm:mb-6 text-primary-foreground group-hover:scale-110 transition-transform duration-500 flex-shrink-0 relative z-10"
                  whileHover={{ rotate: 5 }}
                >
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 blur-lg scale-150 transition-opacity duration-500" />
                </motion.div>

                {/* Category info */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {category.title}
                    </h3>
                    <motion.span 
                      className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 h-fit mt-0.5 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
                    </motion.span>
                  </div>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                    {category.description}
                  </p>

                  {/* Enhanced featured article section */}
                  <div className="mt-auto">
                    <motion.div 
                      className="p-3 sm:p-4 bg-background/60 backdrop-blur-sm rounded-xl mb-4 sm:mb-6 border border-border/30 group-hover:border-primary/30 group-hover:bg-background/80 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-xs text-primary font-medium mb-1 block">Featured:</span>
                      <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary/90 transition-colors duration-300">{category.featured}</p>
                    </motion.div>

                    {/* Enhanced action button */}
                    <motion.div 
                      className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300 w-fit"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm sm:text-base font-medium">Explore Articles</span>
                      <motion.div
                        className="flex-shrink-0"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced decorative elements */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-primary to-secondary opacity-5 rounded-full blur-xl group-hover:opacity-15 group-hover:scale-125 transition-all duration-700" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary to-accent opacity-3 rounded-full blur-lg group-hover:opacity-10 group-hover:scale-150 transition-all duration-700" />
              </SimpleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeThink;
