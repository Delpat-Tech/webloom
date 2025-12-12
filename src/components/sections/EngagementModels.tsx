import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  Target,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface EngagementModel {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  bestFor: string[];
  timeline: string;
}

const EngagementModels: React.FC = () => {
  const engagementModels: EngagementModel[] = [
    {
      id: 'project-based',
      title: 'Project-Based',
      description: 'Fixed scope, fixed timeline, fixed cost. Perfect for well-defined projects with clear deliverables.',
      icon: <Target className="w-8 h-8" />,
      gradient: 'from-primary to-accent',
      features: [
        'Clear project scope and deliverables',
        'Fixed timeline and budget',
        'Detailed project plan upfront',
        'Regular progress updates',
        'Post-launch support included',
        'No surprise costs'
      ],
      bestFor: [
        'MVP development',
        'Website redesigns',
        'Specific feature development',
        'One-time integrations'
      ],
      timeline: '2-12 weeks'
    },
    {
      id: 'monthly-retainer',
      title: 'Monthly Retainer',
      description: 'Ongoing partnership for continuous development and maintenance. Predictable monthly costs.',
      icon: <Calendar className="w-8 h-8" />,
      gradient: 'from-secondary to-primary',
      features: [
        'Dedicated development hours',
        'Priority support and maintenance',
        'Continuous improvements',
        'Flexible scope changes',
        'Monthly reporting',
        'Long-term partnership'
      ],
      bestFor: [
        'Ongoing product development',
        'System maintenance',
        'Continuous improvements',
        'Growing startups'
      ],
      timeline: 'Ongoing'
    },
    {
      id: 'dedicated-team',
      title: 'Dedicated Team',
      description: 'Your own development team working exclusively on your projects. Full control and flexibility.',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-accent to-secondary',
      features: [
        'Dedicated developers',
        'Full-time availability',
        'Direct communication',
        'Flexible project management',
        'Scalable team size',
        'Long-term commitment'
      ],
      bestFor: [
        'Large-scale projects',
        'Multiple ongoing initiatives',
        'Companies with high development needs',
        'Enterprise clients'
      ],
      timeline: '3+ months'
    },
    {
      id: 'hourly-consulting',
      title: 'Hourly Consulting',
      description: 'Expert guidance and development on an as-needed basis. Pay only for what you use.',
      icon: <Clock className="w-8 h-8" />,
      gradient: 'from-primary to-secondary',
      features: [
        'Flexible hourly rates',
        'Expert consultation',
        'Quick problem solving',
        'No long-term commitment',
        'Pay-as-you-go model',
        'Specialized expertise'
      ],
      bestFor: [
        'Technical consultation',
        'Quick fixes and updates',
        'Specialized development',
        'Ad-hoc support'
      ],
      timeline: 'As needed'
    }
  ];

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Can <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Work Together</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From full-scale development to targeted support — pick what fits.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementModels.map((model, index) => (
            <motion.div
              key={model.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group-hover:shadow-xl flex flex-col">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${model.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Model header */}
                <div className="relative z-10 mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${model.gradient} text-white mb-3`}>
                    {model.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {model.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {model.description}
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative z-10 mb-4">
                  <div className="text-center p-3 rounded-xl bg-muted/30">
                    <div className="text-sm font-bold text-accent">{model.timeline}</div>
                    <div className="text-xs text-muted-foreground">Timeline</div>
                  </div>
                </div>

                {/* Features */}
                <div className="relative z-10 space-y-2 mb-4">
                  <h4 className="font-semibold text-foreground text-sm mb-2">What&apos;s Included:</h4>
                  <div className="space-y-1">
                    {model.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best for */}
                <div className="relative z-10 space-y-2 mb-4 flex-grow">
                  <h4 className="font-semibold text-foreground text-sm mb-2">Best For:</h4>
                  <div className="flex flex-wrap gap-1">
                    {model.bestFor.slice(0, 2).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>


              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default EngagementModels; 