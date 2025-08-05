import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Target, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface EngagementModel {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  bestFor: string[];
  pricing: string;
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
      pricing: '₹40,000 - ₹2,00,000',
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
      pricing: '₹50,000 - ₹1,50,000/month',
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
      pricing: '₹80,000 - ₹3,00,000/month',
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
      pricing: '₹2,000 - ₹5,000/hour',
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
            Choose Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Engagement Model</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Different ways to work with us based on your needs and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {engagementModels.map((model, index) => (
            <motion.div
              key={model.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative h-full p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group-hover:shadow-2xl">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${model.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Model header */}
                <div className="relative z-10 mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${model.gradient} text-white mb-4`}>
                    {model.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {model.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {model.description}
                  </p>
                </div>

                {/* Pricing and timeline */}
                <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-2xl bg-muted/30">
                    <div className="text-lg font-bold text-primary">{model.pricing}</div>
                    <div className="text-sm text-muted-foreground">Pricing</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-muted/30">
                    <div className="text-lg font-bold text-accent">{model.timeline}</div>
                    <div className="text-sm text-muted-foreground">Timeline</div>
                  </div>
                </div>

                {/* Features */}
                <div className="relative z-10 space-y-3 mb-6">
                  <h4 className="font-semibold text-foreground mb-3">What's Included:</h4>
                  <div className="grid gap-2">
                    {model.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best for */}
                <div className="relative z-10 space-y-3 mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Best For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.bestFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-muted/50 text-xs text-muted-foreground rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="relative z-10">
                  <Button
                    onClick={() => window.location.href = '/contact'}
                    variant="gradient-monotone"
                    className="w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    Adopt This Model
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white mb-6">
            <Star className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Not sure which model fits your needs?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and find the perfect engagement model for your business.
          </p>
          <Button
            onClick={() => window.location.href = '/contact'}
            variant="gradient-monotone"
            className="px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto"
          >
            Get Personalized Recommendation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementModels; 