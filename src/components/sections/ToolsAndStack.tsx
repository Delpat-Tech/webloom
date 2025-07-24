import { motion } from 'framer-motion';
import { Wrench, Shield, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/ui/Button';

export interface Tool {
  name: string;
  icon: React.ReactNode;
  reason: string;
}

export interface StackCategory {
  category: string;
  description: string;
  tools: Tool[];
}

interface ToolsAndStackProps {
  techStack: StackCategory[];
}

const ToolsAndStack: React.FC<ToolsAndStackProps> = ({ techStack }) => {
  return (
    <section id="stack" className="relative px-6 md:px-12 lg:px-20 py-20">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Wrench className="w-4 h-4" />
            Our Tech Philosophy & Stack
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            We Don&apos;t Chase
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Trends
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We choose reliable, scalable tools that get the job done right. 
            Boring technology that lets your business shine.
          </p>
        </motion.div>

        {/* Tech Stack Categories */}
        <div className="space-y-16">
          {techStack.map((stackCategory, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {stackCategory.category}
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {stackCategory.description}
                </p>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stackCategory.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={toolIndex}
                    className="group p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 + toolIndex * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Tool Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                        {tool.icon}
                      </div>

                      {/* Tool Info */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {tool.reason}
                        </p>
                      </div>

                      {/* External link indicator */}
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy Statement */}
        <motion.div
          className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Shield className="w-8 h-8" />
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The Boring Technology Advantage
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every tool in our stack has been battle-tested by thousands of companies. 
              This means faster development, easier debugging, better documentation, and 
              a larger talent pool for your future hiring needs. Innovation belongs in your 
              product, not your infrastructure.
            </p>

            <Link 
              href="/contact"
            >
              <Button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors" variant="primary">
                Discuss Your Stack
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsAndStack;
