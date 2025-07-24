import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import React from 'react';
import SimpleCard from '@/components/ui/SimpleCard';

interface PricingTierData {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  outcome: string;
  popular?: boolean;
}

interface PricingTiers {
  [key: string]: {
    [key: string]: PricingTierData;
  };
}

interface Goal {
  id: 'mvp' | 'internal' | 'automation';
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PricingTiersSectionProps {
  selectedGoal: 'mvp' | 'internal' | 'automation';
  setSelectedGoal: (goal: 'mvp' | 'internal' | 'automation') => void;
  selectedTier: 'lite' | 'full' | 'scalable';
  setSelectedTier: (tier: 'lite' | 'full' | 'scalable') => void;
  goals: Goal[];
  pricingTiers: PricingTiers;
}

const PricingTiersSection: React.FC<PricingTiersSectionProps> = ({
  selectedGoal,
  setSelectedGoal,
  selectedTier,
  setSelectedTier,
  goals,
  pricingTiers,
}) => {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Starting Point</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your goal, then select the tier that matches your needs and budget.
          </p>
        </motion.div>

        {/* Goal Selection */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {goals.map((goal) => (
            <motion.button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedGoal === goal.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                {goal.icon}
              </div>
              <div className="text-left">
                <div className="font-semibold">{goal.title}</div>
                <div className="text-sm opacity-80">{goal.description}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 items-stretch"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {Object.entries(pricingTiers[selectedGoal]).map(([tier, data]: [string, PricingTierData], index: number) => (
            <SimpleCard
              key={tier}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer flex flex-col h-full ${
                selectedTier === tier
                  ? 'border-accent bg-accent/10 scale-105 shadow-lg'
                  : data.popular 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-border bg-card/50 hover:border-primary/50'
              }`}
              onClick={() => setSelectedTier(tier as 'lite' | 'full' | 'scalable')}
            >
              {data.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-full text-white text-sm font-medium">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{data.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">{data.price}</div>
                <div className="text-muted-foreground mb-4">{data.duration}</div>
                <p className="text-muted-foreground">{data.description}</p>
              </div>
              <div className="space-y-4 mb-8">
                {data.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-8">
                <div className="text-sm text-primary font-medium mb-2">Outcome:</div>
                <div className="text-foreground font-semibold">{data.outcome}</div>
              </div>
              <div className="mt-auto">
                <Link href="/contact">
                  <Button 
                    className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                      data.popular
                        ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                        : 'bg-card border-2 border-border text-foreground hover:border-primary'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </SimpleCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTiersSection;
