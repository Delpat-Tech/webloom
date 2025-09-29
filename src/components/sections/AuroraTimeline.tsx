'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Target,
  DraftingCompass,
  Clock,
  Handshake,
  Users,
  Eye,
  Sparkles,
} from 'lucide-react';

type CoreValue = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
};

const coreValues: CoreValue[] = [
  {
    icon: Target,
    title: 'Client-Aligned Execution',
    description:
      "Every line of code, every design decision, every strategic choice is filtered through one question: does this serve our client's success?",
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    accentColor: 'text-blue-500',
  },
  {
    icon: DraftingCompass,
    title: 'Precision Scoping, Creative Freedom',
    description:
      "We define the 'what' with surgical precision, then give our team complete creative freedom in the 'how'. Structure enables creativity.",
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    accentColor: 'text-emerald-500',
  },
  {
    icon: Clock,
    title: 'Time and Energy Discipline',
    description:
      'Your time is finite. Your energy is precious. We treat both with the respect they deserve through ruthless prioritization.',
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    accentColor: 'text-amber-500',
  },
  {
    icon: Handshake,
    title: 'Relationship-Weighted Negotiation',
    description:
      'We optimize for long-term partnerships over short-term gains. Every decision considers the relationship impact.',
    gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
    accentColor: 'text-violet-500',
  },
  {
    icon: Users,
    title: 'The Team is the Brand',
    description:
      'Our reputation is built person by person, project by project. Every team member is an ambassador of our standards.',
    gradient: 'from-indigo-500/20 via-blue-500/20 to-purple-500/20',
    accentColor: 'text-indigo-500',
  },
  {
    icon: Eye,
    title: 'Transparent Execution',
    description:
      "No black boxes. No surprises. You see exactly what we're building, why we're building it, and how it's progressing.",
    gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    accentColor: 'text-green-500',
  },
];

const EXPAND_DELAY_MS = 350;

export default function AuroraTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isMobile = useIsMobile();

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (isMobile) return;
      setHoverIndex(index);
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
      hoverTimer.current = window.setTimeout(() => {
        setActiveIndex(index);
      }, EXPAND_DELAY_MS);
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setHoverIndex(null);
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
  }, [isMobile]);

  const handleContainerLeave = useCallback(() => {
    if (isMobile) return;
    setHoverIndex(null);
    setActiveIndex(null);
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
  }, [isMobile]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    node.addEventListener('mouseleave', handleContainerLeave);
    return () => node.removeEventListener('mouseleave', handleContainerLeave);
  }, [handleContainerLeave]);

  const handleTap = useCallback(
    (index: number) => {
      if (!isMobile) return;
      setActiveIndex((prev) => (prev === index ? null : index));
    },
    [isMobile]
  );

  const items = useMemo(() => coreValues, []);

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Foundation
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Our <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Core Values</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            The principles that guide every decision, every line of code, and every client interaction at Delpat.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="group relative w-full select-none flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center md:items-stretch"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;
            const isHovered = hoverIndex === index;
            const isStale = activeIndex !== null && activeIndex !== index;

            // Overlap effect for stale nodes in desktop: shift with negative margins
            const staleOffset = isStale ? '-ml-8 md:-ml-16' : '';

            return (
              <motion.button
                key={item.title}
                type="button"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleTap(index)}
                className={
                  [
                    'relative z-0',
                    'rounded-2xl border border-border/60 bg-card/60 backdrop-blur',
                    'transition-all duration-300 ease-out',
                    'shadow-sm hover:shadow-lg',
                    'p-4 md:p-6',
                    'flex-shrink-0',
                    'text-left',
                    'overflow-hidden',
                    isActive ? 'ring-2 ring-primary/40 shadow-xl' : '',
                    isStale ? staleOffset : '',
                    !isMobile ? 'md:hover:z-10' : '',
                    'w-full md:w-auto',
                    'min-h-[140px] md:min-h-[140px]',
                  ].join(' ')
                }
                style={{
                  // collapsed size for desktop nodes - increased width to show full text
                  width: isMobile ? '100%' : isActive ? 400 : 200,
                  height: isMobile ? 'auto' : isActive ? 300 : 140,
                  maxWidth: isMobile ? '100%' : isActive ? 400 : 200,
                  minHeight: isMobile ? '120px' : '140px',
                }}
                whileHover={!isMobile && !shouldReduceMotion ? { 
                  scale: 1.05, 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)' 
                } : undefined}
                animate={{
                  zIndex: isActive ? 20 : isHovered ? 10 : 0,
                }}
                layout
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`} />
                
                {/* Icon and header row */}
                <div className="relative flex flex-col items-center justify-center text-center gap-3 mb-4">
                  <motion.div
                    className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 ${item.accentColor} shadow-lg flex-shrink-0`}
                    layout
                    initial={false}
                    animate={{
                      width: isActive ? 40 : isMobile ? 56 : 48,
                      height: isActive ? 40 : isMobile ? 56 : 48,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <Icon className={isActive ? 'w-5 h-5' : isMobile ? 'w-7 h-7' : 'w-6 h-6'} />
                  </motion.div>
                  <motion.h3
                    className={`font-semibold text-foreground leading-tight text-center ${
                      item.title === 'Relationship-Weighted Negotiation' 
                        ? 'text-sm md:text-sm' 
                        : 'text-lg md:text-base'
                    }`}
                    layout
                  >
                    {item.title}
                  </motion.h3>
                </div>

                {/* Collapsed hint line */}
                {!isActive && !isMobile && item.title !== 'Relationship-Weighted Negotiation' && (
                  <motion.div
                    className="mt-3 h-1 rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      className="relative mt-4 md:mt-6 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <p className="text-base md:text-base text-muted-foreground leading-relaxed break-words">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const update = () => setMobile(window.matchMedia('(max-width: 768px)').matches);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return mobile;
}
