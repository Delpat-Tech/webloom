import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'react-feather';
import React from 'react';
import SimpleCard from '@/components/ui/SimpleCard';

export interface ThinkingCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  articleCount: number;
  featured: string;
}

interface HowWeThinkProps {
  categories: ThinkingCategory[];
}

const HowWeThink: React.FC<HowWeThinkProps> = ({ categories }) => {
  return (
    <section id="thinking" className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Star className="w-4 h-4" />
            The Execution Playbook
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How We
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Think
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of essays and articles on our philosophy of technology, productivity, and startup execution.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <SimpleCard className="group relative p-8 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden min-h-[470px] flex flex-col justify-between">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary mb-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category info */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {category.articleCount} articles
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Featured article */}
                  <div className="p-4 bg-background/50 rounded-xl mb-6">
                    <span className="text-xs text-primary font-medium mb-1 block">Featured:</span>
                    <p className="text-sm font-medium text-foreground">{category.featured}</p>
                  </div>

                  {/* Action button */}
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                    <span className="font-medium">Explore Articles</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-primary to-secondary opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity" />
              </SimpleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeThink;
