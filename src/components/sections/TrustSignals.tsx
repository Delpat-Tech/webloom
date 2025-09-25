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
    <section className="relative py-20 px-6 md:px-12 lg:px-20">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" /> */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-semibold">Trust & Reliability</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="block text-foreground">Our</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Trust Signals
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-sans">
          Proven execution principles that have earned the trust of 50+ founders and ops leaders.
          </p>
        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {signals.map((signal, index) => {
            const isLast = index === signals.length - 1;
            const needsCenter = signals.length % 3 === 1 && isLast;
            return (
              <div
                key={index}
                className={`relative group h-full${needsCenter ? ' lg:col-start-2' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                                                  <div
                   className={`h-full min-h-[200px] p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.01] ${
                     hoveredIndex === index ? 'ring-2 ring-primary/30 shadow-primary/20' : ''
                   } relative overflow-hidden shadow-lg`}
                 >
                   {/* Always visible background gradient */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${signal.gradient} opacity-5 rounded-2xl`} />
                   
                                       {/* Always visible corner accent */}
                    <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${signal.gradient} opacity-10 rounded-full`} />
                    
                    {/* Always visible bottom accent */}
                    <div className={`absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br ${signal.gradient} opacity-8 rounded-full`} />
                   
                   {/* Enhanced hover background gradient */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${signal.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl`} />
                   
                   {/* Floating accent element on hover */}
                   <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${signal.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-all duration-500 group-hover:scale-125`} />
                   
                   {/* Content with enhanced typography */}
                   <div className="relative flex-1 flex flex-col justify-center h-full">
                     <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed group-hover:text-primary transition-all duration-300 font-sans">
                       {signal.text}
                     </p>
                   </div>
                   
                   {/* Enhanced hover border */}
                   <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-300 pointer-events-none`} />
                   
                   {/* Subtle corner accent on hover */}
                   <div className={`absolute bottom-3 right-3 w-6 h-6 bg-gradient-to-br ${signal.gradient} opacity-0 group-hover:opacity-30 rounded-full transition-all duration-300`} />
                   
                   {/* Always visible subtle border accent */}
                   <div className={`absolute inset-0 rounded-2xl border border-primary/10 pointer-events-none`} />
                 </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced bottom CTA section */}
       
        {/* <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 rounded-3xl p-12 border border-accent/20 relative overflow-hidden backdrop-blur-sm">
        
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white shadow-lg" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">
                Ready to Experience the Difference?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 font-sans max-w-2xl mx-auto">
                Join hundreds of satisfied clients who trust us to deliver exceptional results
              </p>
              <Button 
                variant="gradient-monotone" 
                className="px-10 py-4 text-lg rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Start Your Project Today
              </Button>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

// Default trust signals data
const defaultSignals = [
  {
    text: "Project kickoff within 24 hours of signing",
    gradient: "from-primary to-accent"
  },
  {
    text: "Weekly progress updates you can count on",
    gradient: "from-primary to-secondary"
  },
  {
    text: "No scope creep. No surprises. Just results.",
    gradient: "from-accent to-primary"
  },
  {
    text: "Hyper-responsive communication; we never ghost",
    gradient: "from-secondary to-accent"
  },
  {
    text: "Built on repeat clients and referrals",
    gradient: "from-primary to-secondary"
  },
  {
    text: "Project updates are always on time",
    gradient: "from-accent to-secondary"
  },
  {
    text: "Transparent, value-based pricing with no hidden fees",
    gradient: "from-secondary to-primary"
  }
];

export default TrustSignals;