import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineStep {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  duration?: string;
  deliverables?: string[];
  color?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div className="relative">
      {/* Connecting Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-accent/40 to-secondary/20 hidden lg:block" />
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className={`relative mb-16 ${
            index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'
          }`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* Step Number Circle */}
          <div className={`absolute top-8 w-16 h-16 rounded-full bg-gradient-to-r ${step.color ?? 'from-primary to-accent'} flex items-center justify-center text-white font-bold text-xl shadow-lg hidden lg:flex ${
            index % 2 === 0 ? '-right-8' : '-left-8'
          }`}>
            {step.id}
          </div>

          {/* Step Content */}
          <motion.div
            className={`relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 ${
              index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
            }`}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Mobile step number */}
            <div className="lg:hidden mb-4">
              <div className={`inline-flex w-12 h-12 rounded-full bg-gradient-to-r ${step.color ?? 'from-primary to-accent'} items-center justify-center text-white font-bold`}>
                {step.id}
              </div>
            </div>

            {/* Step Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color ?? 'from-primary to-accent'} text-white`}>
                {step.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                {step.subtitle && <p className="text-primary font-medium">{step.subtitle}</p>}
              </div>
            </div>

            {/* Duration Badge */}
            {step.duration && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
                {step.duration}
              </div>
            )}

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {step.description}
            </p>

            {/* Deliverables */}
            {step.deliverables && step.deliverables.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">What you get:</h4>
                <ul className="space-y-2">
                  {step.deliverables.map((deliverable, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
