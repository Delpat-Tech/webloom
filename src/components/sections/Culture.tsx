"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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

const Culture = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMobile = () => setIsMobile(mqMobile.matches);
    const updateReduce = () => setPrefersReducedMotion(mqReduce.matches);

    updateMobile();
    updateReduce();

    mqMobile.addEventListener('change', updateMobile);
    mqReduce.addEventListener('change', updateReduce);

    return () => {
      mqMobile.removeEventListener('change', updateMobile);
      mqReduce.removeEventListener('change', updateReduce);
    };
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Culture Content */}
          <div className="space-y-6">
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

          {/* Interactive Culture Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {culturePrinciples.map((principle, i) => (
              <motion.div
                key={principle.title}
                role="button"
                tabIndex={0}
                aria-expanded={activeIndex === i}
                onClick={() => handleToggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(i);
                  }
                }}
                className="relative rounded-2xl cursor-pointer overflow-hidden min-h-[120px] sm:min-h-[140px] aspect-auto sm:aspect-square"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={
                  prefersReducedMotion || isMobile
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 1, scale: 1, y: [0, -8, 0] }
                }
                transition={
                  prefersReducedMotion || isMobile
                    ? { duration: 0.4, delay: 0.2 + i * 0.04 }
                    : {
                        duration: 0.5,
                        delay: 0.3 + i * 0.05,
                        y: { duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
                      }
                }
                whileHover="hover"
                variants={{ hover: {} }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${
                    i % 3 === 0
                      ? 'from-[var(--primary)]/80 to-[var(--secondary)]/80'
                      : i % 3 === 1
                      ? 'from-[var(--accent)]/80 to-[var(--primary)]/80'
                      : 'from-[var(--secondary)]/80 to-[var(--accent)]/80'
                  }`}
                />

                {/* Overlay Text */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-black/70 text-white rounded-2xl"
                  initial={{ opacity: 0 }}
                  variants={{ hover: { opacity: 1 }, show: { opacity: 1 }, hide: { opacity: 0 } }}
                  animate={activeIndex === i ? 'show' : 'hide'}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-bold text-base mb-1">{principle.title}</h4>
                  <p className="text-sm">{principle.description}</p>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-white"
                  initial={{ opacity: 1 }}
                  variants={{ hover: { opacity: 0 }, show: { opacity: 0 }, hide: { opacity: 1 } }}
                  animate={activeIndex === i ? 'show' : 'hide'}
                  transition={{ duration: 0.2 }}
                >
                  {principle.icon}
                </motion.div>

                {/* Title badge before click/tap (mobile only) */}
                {isMobile && (
                  <motion.div
                    className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-[2] px-3 py-1.5 rounded-full bg-white/10 text-white text-[11px] sm:text-sm font-medium backdrop-blur-md ring-1 ring-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.25)] sm:hidden"
                    initial={{ opacity: 1 }}
                    variants={{ hover: { opacity: 0 }, show: { opacity: 0 }, hide: { opacity: 1 } }}
                    animate={activeIndex === i ? 'show' : 'hide'}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                      <span className="tracking-tight leading-none">{principle.title}</span>
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
      </motion.div>
    </div>
  </section>
);
};

export default Culture; 
