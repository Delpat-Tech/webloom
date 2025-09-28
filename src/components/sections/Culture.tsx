"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import {
  Globe,
  Target,
  MessageCircle,
  Calendar,
  Clock,
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
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Base design dimensions we scale from
  const BASE_HEIGHT = 560; // px (smaller tiles)
  const BASE_WIDTH = 720; // px (smaller grid width)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsively scale the whole section to fit the viewport without cropping
  useEffect(() => {
    const computeScale = () => {
      if (window.innerWidth < 768) {
        setScale(1); // Don't scale on mobile; use fluid layout
        return;
      }
      const heightRatio = window.innerHeight / BASE_HEIGHT;
      const widthRatio = window.innerWidth / BASE_WIDTH;
      const nextScale = Math.min(1, heightRatio, widthRatio);
      setScale(nextScale);
    };
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    if (isMobile) return;
    
    setHoveredIndex(index);
    
    // Calculate popover position
    const rect = event.currentTarget.getBoundingClientRect();
    const gridRect = gridRef.current?.getBoundingClientRect();
    
    if (gridRect) {
      const column = index % 3;
      const isRightColumn = column === 2;
      
      setPopoverPosition({
        x: isRightColumn ? rect.left - 320 : rect.right + 20,
        y: rect.top + rect.height / 2
      });
    }
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
    <div className="relative">
        {/* Culture Content */}
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

      {/* Interactive 3x3 Grid */}
      <div ref={gridRef} className="relative">
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mx-auto w-full"
          style={
            isMobile
              ? { width: '100%', transform: 'none' }
              : { width: `${BASE_WIDTH}px`, transform: `scale(${scale})`, transformOrigin: 'top center' }
          }
        >
          {culturePrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
              className={`
                relative rounded-xl cursor-pointer overflow-hidden
                bg-white dark:bg-neutral-900/70 border-2 border-gray-200 dark:border-gray-700 shadow-sm
                transition-all duration-150 ease-out
                ${hoveredIndex === index ? 'scale-105 border-[var(--accent)] shadow-lg' : ''}
                ${isMobile ? 'aspect-square' : 'aspect-square'}
              `}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleTap(index)}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={isMobile ? { scale: 0.98 } : {}}
              style={
                !isMobile && hoveredIndex === index
                  ? {
                      boxShadow:
                        '0 0 0 4px rgba(16,185,129,0.9), 0 12px 32px rgba(16,185,129,0.35), 0 0 36px 10px rgba(16,185,129,0.45)'
                    }
                  : undefined
              }
            >
              {/* Hover Glow + Double Border (desktop only) */}
              {!isMobile && (
                <>
                  {/* Outer emerald ring (thicker) */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-xl ring-[3px] ring-emerald-400 transition-opacity duration-150 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {/* Inner white inset ring (thicker) */}
                  <div
                    className={`pointer-events-none absolute inset-[7px] rounded-lg ring-[3px] ring-white transition-opacity duration-150 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                  {/* Tight inner emerald ring */}
                  <div
                    className={`pointer-events-none absolute inset-[12px] rounded-md ring-2 ring-emerald-300 transition-opacity duration-150 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
              {/* Grid Item Content */}
              <div
                className={`flex flex-col items-center justify-center h-full p-2 text-center relative z-[1] ${
                  isMobile && expandedIndex === index
                    ? 'opacity-0 pointer-events-none'
                    : !isMobile && hoveredIndex !== null && hoveredIndex !== index
                    ? 'opacity-60'
                    : 'opacity-100'
                }`}
                aria-hidden={isMobile && expandedIndex === index}
              >
                <div className="text-black dark:text-gray-300 mb-1">
                  {React.cloneElement(principle.icon, { className: `md:w-5 md:h-5 w-6 h-6` })}
                </div>
                <h3 className="text-[11px] md:text-xs font-semibold text-black dark:text-gray-100 leading-tight">
                  {principle.title}
                </h3>
              </div>

              {/* Mobile Expanded Content - Overlay instead of pushing down */}
              {isMobile && expandedIndex === index && (
                <motion.div
                  className="absolute inset-0 z-10 bg-white dark:bg-neutral-900/95 backdrop-blur-sm border-2 border-[var(--accent)] rounded-xl p-2 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedIndex(null);
                    }}
                  >
                    ×
                  </button>
                  
                  <div className="text-black dark:text-gray-300 mb-2">
                    {React.cloneElement(principle.icon, { className: "w-7 h-7" })}
                  </div>
                  <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-2 text-center">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-black dark:text-gray-300 leading-relaxed text-center">
                    {principle.description}
                  </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
        </div>

        {/* Desktop Popover */}
        <AnimatePresence>
          {!isMobile && hoveredIndex !== null && (
            <motion.div
              ref={popoverRef}
              className="fixed z-50 pointer-events-none"
              style={{
                left: popoverPosition.x,
                top: popoverPosition.y,
                transform: 'translateY(-50%)'
              }}
              initial={{ opacity: 0, scale: 0.8, y: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.8, y: '-50%' }}
              transition={{ 
                duration: 0.2, 
                delay: 0.15,
                ease: 'easeOut'
              }}
            >
              <div className="relative bg-white dark:bg-neutral-900/85 backdrop-blur-xl border border-emerald-300 rounded-2xl p-6 shadow-[0_14px_30px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.45),0_2px_6px_rgba(0,0,0,0.35)] max-w-xs">
                
                <h4 className="font-bold text-black dark:text-gray-100 mb-2">
                  {culturePrinciples[hoveredIndex].title}
                </h4>
                <p className="text-sm text-black dark:text-gray-300 leading-relaxed">
                  {culturePrinciples[hoveredIndex].description}
                </p>
                
                {/* Chevron */}
                <div className="absolute bottom-2 right-2 text-[var(--accent)]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
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
    <section className="relative min-h-screen flex items-start justify-center px-4 md:px-8 lg:px-12 pt-8 pb-10 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <motion.div
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
