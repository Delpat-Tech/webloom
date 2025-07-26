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
              whileHover={{ y: -5 }}
            >
              <SimpleCard className="group relative h-full p-6 sm:p-8 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden hover:shadow-lg">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary mb-4 sm:mb-6 text-primary-foreground group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                {/* Category info */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {category.title}
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 h-fit mt-0.5">
                      {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                    {category.description}
                  </p>

                  {/* Featured article */}
                  <div className="mt-auto">
                    <div className="p-3 sm:p-4 bg-background/50 rounded-xl mb-4 sm:mb-6 border border-border/30">
                      <span className="text-xs text-primary font-medium mb-1 block">Featured:</span>
                      <p className="text-sm font-medium text-foreground line-clamp-2">{category.featured}</p>
                    </div>

                    {/* Action button */}
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300 w-fit">
                      <span className="text-sm sm:text-base font-medium">Explore Articles</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-primary to-secondary opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity duration-500" />
              </SimpleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeThink;
