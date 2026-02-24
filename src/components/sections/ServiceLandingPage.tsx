'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Play, Target, Zap } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { buildHrefWithQuery, extractUTMParams } from '@/lib/utm';
import RippleGrid from '@/app/home/RippleGrid';
import MagicBento from '@/components/sections/MagicBento';
import FounderQuote from '@/components/sections/FounderQuote';
import PortfolioShowcase from '@/components/sections/PortfolioShowcase';
import EnhancedTestimonialsCarousel from '@/components/sections/EnhancedTestimonialsCarousel';
import CTASection from '@/components/sections/CTASection';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface ServiceLandingPageProps {
  serviceId: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export default function ServiceLandingPage({
  serviceId,
  title,
  subtitle,
  description,
  ctaLabel,
  ctaTitle,
  ctaSubtitle,
}: ServiceLandingPageProps) {
  const searchParams = useSearchParams();
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const [isDark, setIsDark] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const bgBlob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgBlob1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const bgBlob2Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const bgBlob2Scale = useTransform(scrollYProgress, [0, 1], [1.2, 0.8]);

  const bgBlob3Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgBlob3Scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { contactHref, proofHref } = useMemo(() => {
    const utm = extractUTMParams(searchParams);

    return {
      contactHref: buildHrefWithQuery('/contact', {
        ...utm,
        service: serviceId,
      }),
      proofHref: buildHrefWithQuery('/proof', utm),
    };
  }, [searchParams, serviceId]);

  const serviceTrackFilter = useMemo(() => {
    switch (serviceId) {
      case 'mvp-engine':
        return 'Product MVP';
      case 'internal-os':
        return 'Internal OS';
      case 'automation-mvp':
        return 'Automation MVP';
      default:
        return undefined;
    }
  }, [serviceId]);

  const bentoCards = useMemo(() => {
    if (serviceId === 'mvp-engine') {
      return [
        {
          color: 'var(--card)',
          title: 'MVP Engine',
          description: 'From idea to a live, revenue-ready product in an average of 6 weeks.',
          image: '/images/bentogrid/product.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Scope Sprint',
          description: 'Define scope, timeline, and success metrics before writing code.',
          image: '/images/bentogrid/collaboration.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Prototype + UX',
          description: 'Clickable flows that reduce rework and accelerate decisions.',
          image: '/images/bentogrid/product.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Build + Ship',
          description: 'Production-grade delivery with clean handoff-ready code.',
          image: '/images/bentogrid/development.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Launch Loops',
          description: 'Tight feedback cycles to iterate fast after release.',
          image: '/images/bentogrid/automation.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Support + Handover',
          description: 'Post-launch support and documentation so you can scale confidently.',
          image: '/images/bentogrid/security.jpg',
        },
      ];
    }

    if (serviceId === 'internal-os') {
      return [
        {
          color: 'var(--card)',
          title: 'Internal OS',
          description: 'Custom tools that save 20+ hours of manual work per week.',
          image: '/images/bentogrid/internalOS.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Systems Audit',
          description: 'Map bottlenecks and define the minimum system that removes chaos.',
          image: '/images/bentogrid/collaboration.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Dashboards',
          description: 'One source of truth with reliable reporting, not spreadsheets.',
          image: '/images/bentogrid/internalOS.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Integrations',
          description: 'Connect tools so data flows automatically across teams.',
          image: '/images/bentogrid/development.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Automation',
          description: 'Eliminate repetitive ops work with smart workflows.',
          image: '/images/bentogrid/automation.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Governance',
          description: 'Permissions, auditability, and best practices baked in.',
          image: '/images/bentogrid/security.jpg',
        },
      ];
    }

    if (serviceId === 'automation-mvp') {
      return [
        {
          color: 'var(--card)',
          title: 'Automation MVP',
          description: 'AI-powered workflows that eliminate operational bottlenecks.',
          image: '/images/bentogrid/automation.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Workflow Mapping',
          description: 'Identify the highest-leverage automations first.',
          image: '/images/bentogrid/collaboration.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Integrations',
          description: 'Connect CRMs, docs, email, and internal tools end-to-end.',
          image: '/images/bentogrid/development.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Data Pipelines',
          description: 'Clean inputs, reliable outputs, fewer manual fixes.',
          image: '/images/bentogrid/internalOS.jpg',
        },
        {
          color: 'var(--card)',
          title: 'AI Assist',
          description: 'Human-in-the-loop where it matters; automation where it doesn’t.',
          image: '/images/bentogrid/product.jpg',
        },
        {
          color: 'var(--card)',
          title: 'Monitoring',
          description: 'Visibility, alerts, and safeguards to keep workflows stable.',
          image: '/images/bentogrid/security.jpg',
        },
      ];
    }

    return undefined;
  }, [serviceId]);

  return (
    <main className="relative overflow-hidden pb-0">
      {/* Global Animated Background (like Home) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full blur-3xl"
          style={{
            translateY: shouldReduceMotion ? 0 : bgBlob1Y,
            scale: shouldReduceMotion ? 1 : bgBlob1Scale,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-3xl"
          style={{
            opacity: shouldReduceMotion ? 1 : bgBlob2Opacity,
            scale: shouldReduceMotion ? 1 : bgBlob2Scale,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-3xl"
          style={{
            translateY: shouldReduceMotion ? 0 : bgBlob3Y,
            scale: shouldReduceMotion ? 1 : bgBlob3Scale,
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(37,38,39,0.04)_2px,transparent_0)] bg-[size:60px_60px]" />

        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-secondary/8 to-accent/8 rounded-full blur-3xl pointer-events-none"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: mousePosition.x - 128,
                  y: mousePosition.y - 128,
                  scale: [1, 1.2, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  x: { type: 'spring', stiffness: 20, damping: 20 },
                  y: { type: 'spring', stiffness: 20, damping: 20 },
                  scale: {
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  },
                }
          }
        />
      </div>

      <section
        ref={heroRef}
        className="relative px-4 sm:px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-12 md:pb-20 min-h-[100svh] flex items-start"
      >
        {/* RippleGrid Background - only in hero section */}
        <div className="absolute inset-0 opacity-80 dark:opacity-60 pointer-events-none -z-10">
          <RippleGrid
            enableRainbow={false}
            gridColor={isDark ? '#00FFB2' : '#0A2E2B'}
            rippleIntensity={0.06}
            gridSize={7.0}
            gridThickness={22.0}
            fadeDistance={1.5}
            vignetteStrength={isDark ? 2.0 : 1.0}
            glowIntensity={0.18}
            opacity={0.85}
            gridRotation={12}
            mouseInteraction={true}
            mouseInteractionRadius={1.4}
          />
        </div>
        {/* Professional floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-primary/40 dark:bg-primary/30 rounded-full"
            animate={shouldReduceMotion ? undefined : { y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-32 right-20 w-1 h-1 bg-secondary/50 dark:bg-secondary/40 rounded-full"
            animate={shouldReduceMotion ? undefined : { y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-32 w-3 h-3 bg-accent/30 dark:bg-accent/20 rounded-full"
            animate={shouldReduceMotion ? undefined : { y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-14 items-start w-full max-w-7xl mx-auto mt-8 md:mt-12">
          {/* Left Column */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
            animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
            className="space-y-6 pl-4 md:pl-8 lg:pl-12"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight relative">
                <motion.span
                  className="block text-foreground"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
                  transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }}
                >
                  The Operating
                </motion.span>
                <motion.span
                  className="block text-foreground"
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
                  transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.5 }}
                >
                  System for
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent relative"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, scale: 1 } : {})}
                  transition={shouldReduceMotion ? undefined : { duration: 1, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {title}
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4"
            >
              <motion.p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle} {description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2 pt-4 justify-start items-center max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="group relative flex items-center justify-center gap-1 min-w-0 px-3 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 ring-1 ring-transparent hover:bg-card/60 hover:scale-[1.005] hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap">
                  <span className="pointer-events-none absolute -inset-1 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative z-10 w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="relative z-10 text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground text-center leading-tight">
                    6-Week Average Delivery to MVP
                  </span>
                </div>
                <div className="group relative flex items-center justify-center gap-1 min-w-0 px-3 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 ring-1 ring-transparent hover:bg-card/60 hover:scale-[1.005] hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap">
                  <span className="pointer-events-none absolute -inset-1 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative z-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="relative z-10 text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground text-center leading-tight">
                    50+ projects shipped
                  </span>
                </div>
                <div className="group relative flex items-center justify-center gap-2 min-w-0 px-3 py-2 rounded-full border border-border bg-card/30 backdrop-blur-sm transition-all duration-300 ring-1 ring-transparent hover:bg-card/60 hover:scale-[1.005] hover:shadow-md hover:shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background whitespace-nowrap">
                  <span className="pointer-events-none absolute -inset-1 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative z-10 w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="relative z-10 text-[10px] sm:text-xs md:text-sm font-medium text-muted-foreground text-center leading-tight">
                    Dedicated Post-Launch Support
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-start gap-3 sm:gap-4 w-full">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                  <Button
                    href={contactHref}
                    variant="gradient-monotone"
                    className="relative px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-2xl inline-flex items-center gap-3 w-full sm:w-auto justify-center"
                  >
                    <Target className="w-5 h-5" />
                    {ctaLabel}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                    transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                  <Button
                    href={proofHref}
                    variant="tertiary"
                    className="relative px-6 py-4 border border-border text-foreground font-medium rounded-2xl hover:bg-muted transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Play className="w-4 h-4" />
                    Explore our Work
                  </Button>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center gap-4 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isHeroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 bg-primary rounded-full border border-white" />
                    <div className="w-4 h-4 bg-secondary rounded-full border border-white" />
                    <div className="w-4 h-4 bg-accent rounded-full border border-white" />
                  </div>
                  <span>Trusted by 100+ founders</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  <span>Free consultation</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
            animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto"
          >
            <div className="relative w-full min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full backdrop-blur-sm border border-accent/30"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-full h-full flex items-center justify-center text-accent">
                  <span className="text-xs font-bold">MVP</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full backdrop-blur-sm border border-secondary/30"
                animate={shouldReduceMotion ? undefined : { y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="w-full h-full flex items-center justify-center text-secondary">
                  <span className="text-xs font-bold">OS</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-1/4 w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full backdrop-blur-sm border border-primary/30"
                animate={shouldReduceMotion ? undefined : { y: [0, -15, 0], rotate: [0, 8, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="w-full h-full flex items-center justify-center text-primary">
                  <span className="text-xs font-bold">Auto</span>
                </div>
              </motion.div>

              <motion.div
                className="relative mx-auto w-80 h-80 flex items-center justify-center"
                animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
                transition={shouldReduceMotion ? undefined : { duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/20"
                  animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                  transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-140px)`,
                    }}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }
                    }
                  />
                ))}

                <motion.div
                  className="absolute inset-8 rounded-full border border-secondary/30"
                  animate={shouldReduceMotion ? undefined : { scale: [1.1, 1, 1.1], rotate: [0, -360] }}
                  transition={shouldReduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: 'linear' }}
                />

                <motion.div
                  className="relative z-10 w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl shadow-2xl flex items-center justify-center cursor-pointer"
                  animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-16 h-16 text-white" />

                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-xl"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }
                    }
                    transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              <div className="absolute inset-0 -z-10">
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-3xl"
                  animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity }}
                />

                <motion.div
                  className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary/30 rounded-full"
                  animate={shouldReduceMotion ? undefined : { y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-secondary/30 rounded-full"
                  animate={shouldReduceMotion ? undefined : { y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={shouldReduceMotion ? undefined : { duration: 2.5, repeat: Infinity, delay: 1.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 md:py-20 lg:py-32 px-6 md:px-12 lg:px-20 mt-8 md:mt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-accent/5 via-primary/5 to-secondary/5 rounded-full blur-3xl"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1.1, 1, 1.1],
                    rotate: [360, 180, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
          />
        </div>

        <div className="relative z-10 w-full max-w-none mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-foreground">Execution,</span>{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Distilled into a Service
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              From custom development to seamless integrations, we provide the tools and expertise
              to transform your vision into reality.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center w-full">
            <MagicBento
              cards={bentoCards}
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              disableAnimations={false}
              spotlightRadius={300}
              particleCount={12}
              enableTilt={false}
              glowColor="115, 192, 237"
              clickEffect={true}
              enableMagnetism={true}
              focusTitle={title}
              focusMode="center"
            />
          </div>
        </div>
      </section>

      <section className="relative mt-8 md:mt-16">
        <FounderQuote />
      </section>

      <PortfolioShowcase
        title="Related Projects"
        subtitle={`Projects we've shipped under ${title}`}
        maxItems={3}
        showViewAll={false}
        showFilters={false}
        serviceTrackFilter={serviceTrackFilter}
      />

      {serviceTrackFilter && (
        <EnhancedTestimonialsCarousel
          title="Client Success Stories"
          subtitle={`Real results from ${title} projects`}
          serviceTrackFilter={serviceTrackFilter}
        />
      )}

      <CTASection
        title={ctaTitle}
        subtitle={ctaSubtitle}
        buttonText="Ready to adopt our model"
        href={contactHref}
      />
    </main>
  );
}
