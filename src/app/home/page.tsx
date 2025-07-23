'use client';

import React from 'react';
import type { NextPage } from 'next';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Zap,
  ArrowRight,
  Users,
  Star,
  Rocket,
  Target,
  Play
} from 'lucide-react';
import SocialProofSection from '../../components/sections/SocialProof';
import ServicesGrid from '../../components/sections/ServicesGrid';
import FounderQuote from '../../components/sections/FounderQuote';
import GeoMap from '../../components/sections/GeoMap';
import Testimonials from '../../components/sections/Testimonials';
import CTASection from '../../components/sections/CTASection';
import Button from '../../components/ui/Button';

const HomePage: NextPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  
  // Unique scroll animations - orbital pattern
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const pulseScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.3, 0.8, 1.1]);
  const waveY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Unique Animated Background - Orbital/Wave Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
       
        {/* Wave pattern */}
        <motion.div
          className="absolute top-2/3 right-1/6 w-80 h-80"
          style={{ y: waveY }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-3xl" />
        </motion.div>

        {/* Grid overlay with motion */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 0.3])
          }}
        />
        
        {/* Mouse follower - different from other pages */}
        <motion.div
          className="absolute w-32 h-32 pointer-events-none"
          animate={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
          }}
          transition={{
            type: "spring",
            stiffness: 25,
            damping: 35
          }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-orange-500/15 via-red-500/15 to-pink-500/15 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative px-6 md:px-12 lg:px-20 py-20 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Floating icon */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Main headline - different structure */}
            <motion.h1 
              className="section-title mb-8 leading-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <span className="block">The Operating System</span>
              <span className="block">for</span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.6 }}
              >
                Startup Execution
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, 
              customized tools when no-code fails, devs are out of reach, or time is running out.
            </motion.p>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center gap-2 mb-10 text-sm text-muted-foreground"
            >
              <Users className="w-4 h-4 text-primary" />
              <span>Trusted by 100+ founders and ops leaders who needed to ship fast</span>
            </motion.div>

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
                whileHover={{ scale: 1.02 }}
              >
                <Play className="w-4 h-4" />
                See How We Solve Your Problem
              </motion.button>
            </motion.div>
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