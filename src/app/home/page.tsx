'use client';

import React from 'react';
import type { NextPage } from 'next';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Zap,
  ArrowRight,
  Users,
  Target,
  Play
} from 'lucide-react';
import SocialProofSection from '@/components/sections/SocialProof';
import ServicesGrid from '@/components/sections/ServicesGrid';
import FounderQuote from '@/components/sections/FounderQuote';
import GeoMap from '@/components/sections/GeoMap';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';
import Button from '@/components/ui/Button';
import RippleGrid from './RippleGrid';

const HomePage: NextPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  
  // Unique scroll animations - orbital pattern
  const waveY = shouldReduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays for better contrast in both modes */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      
      {/* Wave pattern - Enhanced for both modes */}
      <motion.div
        className="absolute top-2/3 right-1/6 w-80 h-80"
        style={{ y: waveY }}
        animate={shouldReduceMotion ? undefined : undefined}
        transition={shouldReduceMotion ? undefined : {}}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Additional floating elements that adapt to theme */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-60 h-60 opacity-20 dark:opacity-10"
        animate={shouldReduceMotion ? undefined : { 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={shouldReduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl" />
      </motion.div>
        
      {/* Mouse follower - Enhanced for theme compatibility */}
      <motion.div
        className="absolute w-32 h-32 pointer-events-none"
        animate={shouldReduceMotion ? undefined : {
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
        }}
        transition={shouldReduceMotion ? undefined : {
          type: "spring",
          stiffness: 25,
          damping: 35
        }}
      >
        <motion.div 
          className="w-full h-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-2xl"
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360] 
          }}
          transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative px-6 md:px-12 lg:px-20 py-20 md:py-32 min-h-screen flex items-center backdrop-blur-[1px]">
        {/* RippleGrid Background - only in hero section */}
        <div className="absolute inset-0 opacity-80 dark:opacity-60 pointer-events-none -z-10">
          <RippleGrid
            enableRainbow={false}
            gridColor="#00FFB2"
            rippleIntensity={0.06}
            gridSize={7.0}
            gridThickness={22.0}
            fadeDistance={1.5}
            vignetteStrength={1.0}
            glowIntensity={0.18}
            opacity={0.85}
            gridRotation={12}
            mouseInteraction={true}
            mouseInteractionRadius={1.4}
          />
        </div>

        {/* Professional floating elements with theme awareness */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-primary/40 dark:bg-primary/30 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-32 right-20 w-1 h-1 bg-secondary/50 dark:bg-secondary/40 rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-32 w-3 h-3 bg-accent/30 dark:bg-accent/20 rounded-full"
            animate={{ y: [0, -25, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
            animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
            className="space-y-8"
          >
            {/* Professional badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full text-sm font-medium text-muted-foreground"
            >
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
              />
              Trusted by 500+ Startups
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, y: 0 } : {})}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground">The Operating</span>
                <span className="block text-foreground">System for</span>
                <motion.span 
                  className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1 } : {})}
                  transition={shouldReduceMotion ? undefined : { duration: 1, delay: 0.6 }}
                >
                  Startup Execution
                </motion.span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, 
              customized tools when no-code fails, devs are out of reach, or time is running out.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="gradient-monotone" className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl">
                <Target className="w-5 h-5" />
                Get Your Free Execution Roadmap
                <ArrowRight className="w-5 h-5" />
              </Button>

              <motion.button
                className="inline-flex items-center gap-2 px-6 py-4 border border-border text-foreground font-medium rounded-2xl hover:bg-muted transition-colors"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              >
                <Play className="w-4 h-4" />
                See How We Solve Your Problem
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Column - Visual Element */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
            animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
            transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main visual container */}
            <div className="relative">
              {/* Central icon with enhanced styling */}
              <motion.div
                className="relative mx-auto w-80 h-80 flex items-center justify-center"
                animate={shouldReduceMotion ? undefined : { 
                  rotate: [0, 360],
                }}
                transition={shouldReduceMotion ? undefined : { 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Outer ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-primary/20"
                  animate={shouldReduceMotion ? undefined : { 
                    scale: [1, 1.1, 1],
                  }}
                  transition={shouldReduceMotion ? undefined : { 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Middle ring */}
                <motion.div 
                  className="absolute inset-8 rounded-full border border-secondary/30"
                  animate={shouldReduceMotion ? undefined : { 
                    scale: [1.1, 1, 1.1],
                    rotate: [0, -360]
                  }}
                  transition={shouldReduceMotion ? undefined : { 
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Central element */}
                <motion.div
                  className="relative z-10 w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl shadow-2xl flex items-center justify-center"
                  animate={shouldReduceMotion ? undefined : { 
                    y: [0, -10, 0],
                    rotateY: [0, 180, 360]
                  }}
                  transition={shouldReduceMotion ? undefined : { 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Zap className="w-16 h-16 text-white" />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-xl"
                    animate={shouldReduceMotion ? undefined : { 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              {/* Floating service icons */}
              <motion.div
                className="absolute top-16 -left-8 p-3 bg-card border border-border rounded-2xl shadow-lg"
                animate={shouldReduceMotion ? undefined : { 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, delay: 0 }}
              >
                <Users className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute top-32 -right-12 p-3 bg-card border border-border rounded-2xl shadow-lg"
                animate={shouldReduceMotion ? undefined : { 
                  y: [0, -20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, delay: 1 }}
              >
                <Target className="w-6 h-6 text-secondary" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 -left-16 p-3 bg-card border border-border rounded-2xl shadow-lg"
                animate={shouldReduceMotion ? undefined : { 
                  y: [0, -10, 0],
                  rotate: [0, 3, 0]
                }}
                transition={shouldReduceMotion ? undefined : { duration: 3.5, repeat: Infinity, delay: 2 }}
              >
                <ArrowRight className="w-6 h-6 text-accent" />
              </motion.div>

              {/* Background decoration */}
              <div className="absolute inset-0 -z-10">
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-3xl"
                  animate={shouldReduceMotion ? undefined : { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>

        
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <SocialProofSection />

      {/* SERVICES GRID */}
      <ServicesGrid />

      {/* FOUNDER QUOTE */}
      <FounderQuote />

      {/* GEO MAP */}
      <GeoMap />

      {/* TESTIMONIALS PREVIEW */}
      <Testimonials />

      {/* FINAL CTA SECTION */}
      <CTASection />
    </div>
  );
};

export default HomePage;