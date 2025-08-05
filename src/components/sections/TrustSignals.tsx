import React, { useState } from 'react';
import { 
  Zap, 
  Calendar, 
  Shield, 
  MessageCircle, 
  Users, 
  Clock, 
  DollarSign
} from 'react-feather';
import SimpleCard from '@/components/ui/SimpleCard';
import Button from '@/components/ui/Button';

const TrustSignals = ({ signals = defaultSignals }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trust</span> Signals
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
          Our proven execution principles that have earned the trust of hundreds of satisfied clients
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {signals.map((signal, index) => {
          // Center the last card if it's alone in the last row (when signals.length % 3 === 1)
          const isLast = index === signals.length - 1;
          const needsCenter = signals.length % 3 === 1 && isLast;
          return (
            <div
              key={index}
              className={`relative group h-full${needsCenter ? ' lg:col-start-2' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <SimpleCard
                className={`h-full min-h-[200px] flex flex-col hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  hoveredIndex === index ? 'ring-2 ring-primary/20' : ''
                } bg-card border border-border font-sans`}
              >
                {/* Enhanced background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                
                {/* Enhanced icon container */}
                <div className="relative mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${signal.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative`}>
                    <signal.icon className="w-6 h-6 text-white" />
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r ${signal.gradient} opacity-0 group-hover:opacity-30 blur-lg scale-150 transition-opacity duration-300" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <p className="text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors duration-300 font-sans">
                    {signal.text}
                  </p>
                  
                  {/* Enhanced emphasis badge */}
                  {signal.emphasis && (
                    <div className="mt-3 inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-accent/20">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                      {signal.emphasis}
                    </div>
                  )}
                </div>
                
                {/* Enhanced hover border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none" />
              </SimpleCard>
            </div>
          );
        })}
      </div>

      {/* Enhanced bottom CTA section */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 rounded-2xl p-8 border border-accent/20 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-500 rounded-full border-2 border-white shadow-lg" />
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-lg" />
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white shadow-lg" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
              Ready to Experience the Difference?
            </h3>
            <p className="text-muted-foreground mb-6 font-sans">
              Join hundreds of satisfied clients who trust us to deliver exceptional results
            </p>
            <Button 
              variant="gradient-monotone" 
              className="px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Project Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default trust signals data
const defaultSignals = [
  {
    text: "Project kickoff within 24 hours of signing",
    icon: Zap,
    gradient: "from-primary to-accent",
    emphasis: "Lightning Fast"
  },
  {
    text: "Weekly progress updates you can count on",
    icon: Calendar,
    gradient: "from-primary to-secondary",
    emphasis: "Always Informed"
  },
  {
    text: "No scope creep. No surprises. Just results.",
    icon: Shield,
    gradient: "from-accent to-primary",
    emphasis: "Protected"
  },
  {
    text: "Hyper-responsive communication; we never ghost",
    icon: MessageCircle,
    gradient: "from-secondary to-accent",
    emphasis: "Always Available"
  },
  {
    text: "Built on repeat clients and referrals",
    icon: Users,
    gradient: "from-primary to-secondary",
    emphasis: "Proven Track Record"
  },
  {
    text: "Project updates are always on time",
    icon: Clock,
    gradient: "from-accent to-secondary",
    emphasis: "Punctual"
  },
  {
    text: "Transparent, value-based pricing with no hidden fees",
    icon: DollarSign,
    gradient: "from-secondary to-primary",
    emphasis: "Honest Pricing"
  }
];

export default TrustSignals;