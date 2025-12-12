"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import {
  Globe,
  Target,
  MessageCircle,
  Calendar,
  UserCheck,
  FileText,
  Coffee,
  Users,
  Tool,
} from 'react-feather';

// Expanded list of all 9 cultural principles
const culturePrinciples = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Deep Work Blocks',
    description: '4-hour focused sessions for complex problem-solving.',
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Async Communication',
    description: 'Thoughtful written updates over reactive meetings.',
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Meeting-Light Days',
    description: 'Maximum 2 hours of meetings per day, ever.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Timezone Respect',
    description: "Work when you're most productive, communicate clearly.",
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: 'Clear Ownership & Accountability',
    description: 'Every task has a clear owner. Autonomy is empowered by clarity.',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Documentation by Default',
    description: 'We document decisions, not just code, ensuring alignment.',
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: 'Flexible Work Routines',
    description: 'We value outcomes over hours and support work-life integration.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Intentional Collaboration',
    description: 'Pre-set windows make synchronous moments efficient.',
  },
  {
    icon: <Tool className="w-8 h-8" />,
    title: 'Tool-Driven Transparency',
    description: 'We leverage async tools to keep everyone aligned without interruptions.',
  },
];

// Interactive Culture Grid Component
const InteractiveCultureGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number; side: 'left' | 'right' | 'bottom' }>({
    x: 0,
    y: 0,
    side: 'bottom'
  });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    if (isMobile) return;

    setHoveredIndex(index);

    // Calculate improved positioning - center below the card
    const rect = event.currentTarget.getBoundingClientRect();
    const popoverWidth = 320; // Approximate width of the popover (max-w-xs = 320px)
    // const popoverHeight = 150; // Approximate height of the popover

    // Center the popover below the card with some spacing
    const x = rect.left + rect.width / 2;
    const y = rect.bottom + 15;

    // Adjust for viewport boundaries
    const adjustedX = Math.max(popoverWidth / 2, Math.min(window.innerWidth - popoverWidth / 2, x));

    setPopoverPosition({
      x: adjustedX,
      y: y,
      side: 'bottom' // Not used in new positioning but kept for compatibility
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHoveredIndex(null);
  };

  const handleTap = (index: number) => {
    if (!isMobile) return;
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Culture Header */}
      <div className="space-y-6 mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full text-sm font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Globe className="w-4 h-4" />
          Our Culture
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
          Our Remote,
          <span className="block bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
            Async-First OS
          </span>
        </h2>

        <p className="text-xl text-muted-foreground leading-relaxed font-sans">
          We believe deep work requires focus. Our async-first culture minimizes
          unnecessary meetings, maximizing the time we spend building and creating.
        </p>
      </div>

      {/* Interactive 3x3 Grid (Desktop) / Single Column (Mobile) */}
      <div ref={gridRef} className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {culturePrinciples.map((principle, index) => (
            <div key={principle.title} className="relative">
              <motion.div
                className={`
                  relative rounded-2xl cursor-pointer overflow-hidden
                  bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm
                  border-2 transition-all duration-150 ease-out
                  ${hoveredIndex === index
                    ? 'border-[var(--accent)] scale-105 shadow-xl'
                    : 'border-gray-200 dark:border-gray-700 shadow-sm'
                  }
                  ${!isMobile && hoveredIndex !== null && hoveredIndex !== index ? 'opacity-60' : 'opacity-100'}
                  ${isMobile ? 'p-6' : 'aspect-square p-6'}
                `}
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleTap(index)}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                layout={isMobile}
                transition={{ duration: 0.15 }}
              >
                {/* Content */}
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-[var(--accent)] mb-3">
                    {React.cloneElement(principle.icon, {
                      className: "w-10 h-10 md:w-12 md:h-12",
                      strokeWidth: 1.5
                    })}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground leading-tight">
                    {principle.title}
                  </h3>

                  {/* Mobile Expanded Description */}
                  <AnimatePresence>
                    {isMobile && expandedIndex === index && (
                      <motion.p
                        className="text-sm text-muted-foreground leading-relaxed mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {principle.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Desktop Smart Popover */}
        <AnimatePresence>
          {!isMobile && hoveredIndex !== null && (
            <motion.div
              className="fixed z-50 pointer-events-none"
              style={{
                left: popoverPosition.x,
                top: popoverPosition.y,
                transform: 'translate(-50%, 0)',
              }}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{
                duration: 0.2,
                ease: 'easeOut'
              }}
            >
              <div className="relative">
                {/* Triangular Beak - now positioned at the top center */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
                >
                  <div
                    className="w-0 h-0 border-x-8 border-x-transparent border-b-8"
                    style={{
                      borderBottomColor: 'rgba(16, 185, 129, 0.3)',
                    }}
                  />
                </div>

                {/* Glassmorphism Popover */}
                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-[var(--accent)]/30 rounded-2xl p-6 shadow-2xl max-w-xs">
                  <h4 className="font-bold text-foreground mb-2 text-base text-white">
                    {culturePrinciples[hoveredIndex].title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {culturePrinciples[hoveredIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Culture = () => {
  return (
    <section className="relative min-h-screen flex items-start justify-center px-4 md:px-8 lg:px-12 pt-16 pb-20 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InteractiveCultureGrid />
        </motion.div>
      </div>
    </section>
  );
};

export default Culture;