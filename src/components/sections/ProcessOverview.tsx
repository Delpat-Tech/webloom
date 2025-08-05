import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  MessageSquare,
  FileText,
  CheckCircle,
  Users,
  Code,
  Eye,
  Rocket
} from 'lucide-react';

export interface ProcessStep {
  id: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
  color: string;
}

interface ProcessTimelineProps {
  steps?: ProcessStep[];
  title?: string;
  subtitle?: string;
}

const defaultSteps: ProcessStep[] = [
  {
    id: '1',
    duration: 'Within 24 hours',
    title: 'Initial Contact',
    subtitle: "The conversation starts here — fast, human, and real.",
    description: "Reach out via any channel, and you'll hear from us within a day — personally. No bots. No black holes. Just a clear next step.",
    deliverables: ['Personal response', 'Discovery call booked', 'Initial requirements noted'],
    icon: <MessageSquare className="w-8 h-8 text-blue-500" />, 
    color: 'text-blue-500'
  },
  {
    id: '2',
    duration: '1–2 days',
    title: 'Discovery & Scoping',
    subtitle: "We take a focused deep dive into what you need and why.",
    description: "Everything is captured in a shared, living document.",
    deliverables: ['Project scope breakdown', 'Technical architecture', 'Milestones & timeline', 'Fixed-price proposal'],
    icon: <FileText className="w-8 h-8 text-purple-500" />, 
    color: 'text-purple-500'
  },
  {
    id: '3',
    duration: '1–2 days',
    title: 'Proposal & Agreement',
    subtitle: "We deliver a clear, no-nonsense proposal — pricing, timelines, deliverables, and terms.",
    description: "You sign when it makes sense.",
    deliverables: ['Transparent, fixed-price proposal', 'No hidden fees', 'Shared agreement and mutual confidence'],
    icon: <CheckCircle className="w-8 h-8 text-green-500" />, 
    color: 'text-green-500'
  },
  {
    id: '4',
    duration: '1 day',
    title: 'Kickoff & Planning',
    subtitle: "We get everyone aligned.",
    description: "You meet your team, set up communication channels, and get access to your dashboard.",
    deliverables: ['Kickoff call', 'Project dashboard', 'Milestone calendar'],
    icon: <Users className="w-8 h-8 text-orange-500" />, 
    color: 'text-orange-500'
  },
  {
    id: '5',
    duration: '4–6 weeks',
    title: 'Development Sprint',
    subtitle: "Build mode: fast, focused, and transparent.",
    description: "You're always in the loop with real-time updates and weekly demos.",
    deliverables: ['Live progress tracking', 'Weekly demos', 'Code reviews', 'Testing snapshots'],
    icon: <Code className="w-8 h-8 text-cyan-500" />, 
    color: 'text-cyan-500'
  },
  {
    id: '6',
    duration: '3–5 days',
    title: 'Review & QA',
    subtitle: "Rigorous testing, review, and final refinements — all with your input.",
    description: "You see exactly what you're getting before launch.",
    deliverables: ['Full QA and testing', 'Live review sessions', 'Fast final refinements'],
    icon: <Eye className="w-8 h-8 text-pink-500" />, 
    color: 'text-pink-500'
  },
  {
    id: '7',
    duration: '1 week',
    title: 'Launch & Handover',
    subtitle: "It's go time — with support that sticks.",
    description: "Seamless deployment, thorough documentation, and a reliable handoff.",
    deliverables: ['Production deployment', 'Final documentation', 'Team training', '30-day post-launch support'],
    icon: <Rocket className="w-8 h-8 text-red-500" />, 
    color: 'text-red-500'
  },
];

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps = defaultSteps, title = "How We Work: Our 7-Step Process", subtitle = "A proven async-first approach that delivers exceptional results through clear communication and systematic execution" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      // Calculate which step should be active based on scroll position
      // Add a small offset to make the focus more accurate
      const stepHeight = 1 / steps.length;
      const offset = stepHeight * 0.3; // 30% offset for better accuracy
      const adjustedProgress = v + offset;
      const newIndex = Math.min(Math.floor(adjustedProgress / stepHeight), steps.length - 1);
      
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < steps.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, steps.length]);

  const getCardVariants = (index: number) => {
    const baseDelay = index * 0.2;

    return {
      initial: { 
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0 
      },
      whileInView: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        },
      },
      viewport: { once: false, margin: "-100px" },
    };
  };

  return (
    <div
      ref={scrollRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="relative mx-auto">
          {/* Background timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border z-10"></div>

          {/* Enhanced Progress Indicator with Traveling Glow */}
          <motion.div
            className="absolute top-0 z-20"
            style={{
              height: progressHeight,
              width: '4px',
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "9999px",
              background: `linear-gradient(to bottom, var(--primary), var(--accent), var(--secondary))`,
              boxShadow: `
                0 0 8px var(--primary),
                0 0 12px var(--accent)
              `,
            }}
          />
          {/* The traveling glow "comet" at the head of the line */}
          <motion.div
            className="absolute z-30"
            style={{
              top: progressHeight,
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <motion.div
              className="w-5 h-5 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--accent) 0%, var(--primary) 40%, rgba(34,211,238,0) 70%)",
                boxShadow: `
                  0 0 8px 2px var(--accent),
                  0 0 12px 4px var(--primary),
                  0 0 20px 8px var(--secondary)
                `,
              }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <div className="relative z-20">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  timelineRefs.current[index] = el;
                }}
                className={`relative flex items-center mb-20 py-4 flex-col lg:flex-row ${
                  index % 2 === 0 
                    ? "lg:justify-start" 
                    : "lg:flex-row-reverse lg:justify-start"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute top-1/2 transform -translate-y-1/2 z-30 left-1/2 -translate-x-1/2">
                  <motion.div
                    className={`w-12 h-12 rounded-full border-4 bg-card flex items-center justify-center shadow-lg ${
                      index <= activeIndex
                        ? "border-primary"
                        : "border-border"
                    }`}
                    animate={
                      index <= activeIndex
                        ? {
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              "0 0 0px var(--primary)",
                              "0 0 20px var(--primary)",
                              "0 0 0px var(--primary)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  className={`mt-12 lg:mt-0 w-full lg:w-[calc(50%-40px)] ${
                    index % 2 === 0 
                      ? "lg:mr-[calc(50%+20px)]" 
                      : "lg:ml-[calc(50%+20px)]"
                  }`}
                  variants={getCardVariants(index)}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: false, margin: "-100px" }}
                >
                  <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    {/* Icon at top left of card */}
                    <div className="mb-4 flex items-center">
                      <span className="mr-3">
                        {step.icon}
                      </span>
                      {/* Duration Badge */}
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-accent/10 text-primary`}> 
                        {step.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-muted-foreground font-medium mb-3 text-lg">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* You get section */}
                    <div className="border-t border-border pt-4">
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full mr-2"></span>
                        You get:
                      </h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-muted rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;