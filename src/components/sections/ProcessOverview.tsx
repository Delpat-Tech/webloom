import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Mail, 
  Phone, 
  Map, 
  FileText, 
  Handshake, 
  Users
} from 'lucide-react';

const ProcessOverview = ({ steps = defaultSteps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-sensitive: highlight step in viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current = stepRefs.current.slice(0, steps.length);
    steps.forEach((_, idx) => {
      const ref = stepRefs.current[idx];
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(idx);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer, idx) => {
        if (stepRefs.current[idx]) observer.unobserve(stepRefs.current[idx]!);
        observer.disconnect();
      });
    };
  }, [steps.length]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          Our 7-Step Process
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
          A proven async-first approach that delivers exceptional results through clear communication and systematic execution
        </p>
      </div>
      {/* Vertical Timeline (all breakpoints) */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 w-0.5 h-full bg-border" />
        {/* Active progress line */}
        <div
          className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transition-all duration-1000 ease-out"
          style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => { stepRefs.current[index] = el; }}
              className={`relative flex items-start space-x-4 transition-all duration-500 ${
                index <= activeStep ? 'opacity-100' : 'opacity-60'
              }`}
              onClick={() => setActiveStep(index)}
            >
              {/* Step icon */}
              <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                index <= activeStep
                  ? 'bg-gradient-to-r from-primary to-secondary border-primary scale-110'
                  : 'bg-card border-border'
              }`}>
                <step.icon className={`w-6 h-6 ${
                  index <= activeStep ? 'text-primary-foreground' : 'text-muted-foreground'
                }`} />
                {/* Step number */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index <= activeStep
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className={`bg-card rounded-xl p-6 shadow border font-body transition-all duration-500 ${
                  index <= activeStep
                    ? 'border-primary shadow-lg'
                    : 'border-border'
                }`}>
                  <h3 className={`font-heading font-bold text-lg mb-2 ${
                    index <= activeStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {step.description}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    index <= activeStep
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Default process steps
const defaultSteps = [
  {
    title: "Identify & Qualify",
    description: "We research your market, identify opportunities, and qualify the best fit for your project goals.",
    duration: "1-2 days",
    icon: Search
  },
  {
    title: "Personalized Outreach",
    description: "Custom-tailored communication that speaks directly to your needs and business objectives.",
    duration: "2-3 days",
    icon: Mail
  },
  {
    title: "Discovery Call",
    description: "Deep-dive conversation to understand your vision, challenges, and success metrics.",
    duration: "45-60 min",
    icon: Phone
  },
  {
    title: "Solution Mapping",
    description: "We architect the perfect solution blueprint tailored to your specific requirements.",
    duration: "3-5 days",
    icon: Map
  },
  {
    title: "Proposal Presentation",
    description: "Comprehensive proposal with timeline, deliverables, and investment details.",
    duration: "1-2 days",
    icon: FileText
  },
  {
    title: "Agreement & Kickoff",
    description: "Contract finalization and official project launch with team introductions.",
    duration: "1-2 days",
    icon: Handshake
  },
  {
    title: "Onboarding & Weekly Rhythm",
    description: "Seamless onboarding process with established weekly check-ins and progress updates.",
    duration: "Ongoing",
    icon: Users
  }
];

export default ProcessOverview;