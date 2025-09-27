import React from "react";
import { CheckCircle } from "lucide-react";
import SimpleCard from "@/components/ui/SimpleCard";

const differentiators = [
  {
    headline: "Fixed Timelines, Guaranteed.",
    description: "No endless sprints or shifting goalposts. We commit to delivery dates and hit them.",
    proofPoints: [
      "98% On-Time Delivery Record",
      "Project kickoff within 24 hours of signing",
      "Weekly progress updates you can count on",
      "Project updates are always on time"
    ],
  },
  {
    headline: "Transparent, Value-Based Pricing.",
    description: "You pay for outcomes, not hours. Our fixed-price proposals mean you know the full cost upfront.",
    proofPoints: [
      "No scope creep. No surprises. Just results.",
      "Absolutely no hidden fees",
      "Transparent, value-based pricing with no hidden fees"
    ],
  },
  {
    headline: "A True Execution Partner.",
    description: "Your success is our success. We think like co-founders, not contractors, focusing on what drives your business forward.",
    proofPoints: [
      "95% Client Retention Rate",
      "Built on repeat clients and referrals",
      "Hyper-responsive communication; we never ghost"
    ],
  },
  {
    headline: "Built to Scale, Not to Rebuild.",
    description: "We build with enterprise-grade foundations from day one, saving you from costly technical debt down the line.",
    proofPoints: [
      "Zero Required Rebuilds on our projects",
      "Full source code ownership and documentation"
    ],
  },
];

const DifferentiatorCards = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {differentiators.map((card, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <SimpleCard className="h-full transition-all duration-700 border border-border/30 hover:border-accent/40 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] focus-within:border-accent/60 focus-within:shadow-2xl relative overflow-hidden backdrop-blur-sm bg-background/80 animate-fade-in-up">
                {/* Gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                
                <div className="flex flex-col h-full justify-between relative z-10 p-8">
                  <div>
                    <div className="relative mb-4">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-all duration-300 leading-tight">
                        {card.headline}
                      </h3>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-base group-hover:text-muted-foreground/90 transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                  
                  <ul className="mt-auto space-y-3">
                    {card.proofPoints.map((point, i) => (
                      <li 
                        key={i} 
                        className="flex items-center gap-3 text-foreground/90 text-base group-hover:text-foreground transition-all duration-300"
                        style={{
                          transform: 'translateX(0)',
                          transition: `all 0.3s ease ${i * 50}ms`,
                        }}
                      >
                        <div className="relative">
                          <CheckCircle className="w-5 h-5 text-accent shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" aria-hidden="true" />
                          {/* Subtle glow effect on check icons */}
                          <div className="absolute inset-0 w-5 h-5 bg-accent/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
               
              </SimpleCard>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default DifferentiatorCards;