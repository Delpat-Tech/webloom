'use client';

import React from 'react';
import type { NextPage } from 'next';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

import Loader from '@/components/ui/Loader';
import {
  ArrowRight,
  Target,
  Play
} from 'lucide-react';
import GlobeDemo from '@/components/ui/globe-demo';
import SocialProofSection from '@/components/sections/SocialProof';
import MagicBento from '@/components/sections/MagicBento';
import ServicesGrid from '@/components/sections/ServicesGrid';
import FounderQuote from '@/components/sections/FounderQuote';
import GeoMap from '@/components/sections/GeoMap';
import EnhancedTestimonialsCarousel from '@/components/sections/EnhancedTestimonialsCarousel';
import CTASection from '@/components/sections/CTASection';
import Button from '@/components/ui/Button';
import RippleGrid from './RippleGrid';
import { testAnalytics } from '@/utils/testAnalytics';

const HomePage: NextPage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);

  useEffect(() => {
    // Check if this is the first visit or a page refresh
    const isFirstVisit = sessionStorage.getItem('homePageVisited') === null;
    const isPageRefresh = !sessionStorage.getItem('navigationType') || 
                         sessionStorage.getItem('navigationType') === 'refresh' ||
                         (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)?.type === 'reload';
    
    if (isFirstVisit || isPageRefresh) {
      // Show loader only on first visit or refresh
      setShowLoader(true);
      setLoaderGone(false);
      const timer = setTimeout(() => setShowLoader(false), 1500);
      
      // Mark that we've visited the home page
      sessionStorage.setItem('homePageVisited', 'true');
      sessionStorage.setItem('navigationType', 'refresh');
      
      return () => clearTimeout(timer);
    } else {
      // If navigating from another page, don't show loader
      setShowLoader(false);
      setLoaderGone(true);
    }
  }, []);

  // Track navigation type
  useEffect(() => {
    // Mark as navigation when component mounts (indicating navigation from another page)
    if (sessionStorage.getItem('homePageVisited')) {
      sessionStorage.setItem('navigationType', 'navigation');
    }
  }, []);

  const handleFadeOut = useCallback(() => setLoaderGone(true), []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  // Unique scroll animations - orbital pattern
  const waveYRaw = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const waveY = shouldReduceMotion ? 0 : waveYRaw;

  useEffect(() => {
    if (shouldReduceMotion) return;
    // Disabled mouse tracking to prevent interference with globe component
    // const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    //   setMousePosition({ x: e.clientX, y: e.clientY });
    // };
    // window.addEventListener('mousemove', handleMouseMove);
    // return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Detect dark mode (copied from Header)
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || document.documentElement.classList.contains('dark')) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  }, []);

  // Test analytics on component mount (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        testAnalytics();
      }, 2000); // Wait for analytics to load
    }
  }, []);

  // Set global loader state for header visibility - set immediately
  useEffect(() => {
    // Set a global flag that the header can read
    if (typeof window !== 'undefined') {
      // Set loader active immediately when component mounts
      document.documentElement.setAttribute('data-loader-active', 'true');
    }
  }, []); // Empty dependency array to run only once on mount

  // Update loader state when showLoader changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (showLoader) {
        document.documentElement.setAttribute('data-loader-active', 'true');
      } else {
        document.documentElement.removeAttribute('data-loader-active');
      }
    }
  }, [showLoader]);

  return (
    <div className="relative overflow-hidden">
      {/* Loader overlay */}
      {!loaderGone && (
        <Loader show={showLoader} onFadeOut={handleFadeOut} />
      )}
      {/* Main content, animated in after loader is gone */}
      <div className={loaderGone ? "animate-fade-in" : "opacity-0 pointer-events-none select-none"}>
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
          style={{ display: 'none' }} // Disabled to prevent interference with globe
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
        <section ref={heroRef} className="relative px-6 md:px-12 lg:px-20 pt-8 md:pt-12 pb-12 md:pb-20 min-h-screen flex items-start backdrop-blur-[1px]">
          {/* RippleGrid Background - only in hero section */}
          <div className="absolute inset-0 opacity-80 dark:opacity-60 pointer-events-none -z-10">
            <RippleGrid
              enableRainbow={false}
              gridColor={isDark ? "#00FFB2" : "#0A2E2B"} // dark: keep as is, light: change color
              rippleIntensity={0.06}
              gridSize={7.0}
              gridThickness={22.0}
              fadeDistance={1.5}
              vignetteStrength={isDark ? 2.0 : 1.0}
              glowIntensity={0.18}
              opacity={0.85}
              gridRotation={12}
              mouseInteraction={false} // Disabled to prevent interference with globe
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

          <div className="grid lg:grid-cols-2 gap-16 items-start w-full mt-8 md:mt-12">
            {/* Left Column - Content */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -50 }}
              animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
              transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
              className="space-y-6 pl-4 md:pl-8 lg:pl-12"
            >


                             {/* Enhanced Main headline with interactive elements */}
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
                      Startup Execution
                    </motion.span>
                 </h1>
               </motion.div>

                             {/* Enhanced Subheadline with stats */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                 transition={{ duration: 0.8, delay: 0.5 }}
                 className="space-y-4"
               >
                 <motion.p 
                   className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
                 >
                   We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, 
                   customized tools when no-code fails, devs are out of reach, or time is running out.
                 </motion.p>
                 
                 {/* Quick stats */}
                 <motion.div
                   className="flex flex-wrap gap-6 pt-4"
                   initial={{ opacity: 0, y: 20 }}
                   animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                   transition={{ duration: 0.8, delay: 0.7 }}
                 >
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                     <span className="text-sm font-medium text-muted-foreground">5-8 weeks delivery</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                     <span className="text-sm font-medium text-muted-foreground">100+ projects shipped</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                     <span className="text-sm font-medium text-muted-foreground">24/7 support</span>
                   </div>
                 </motion.div>
               </motion.div>

                             {/* Enhanced CTAs with additional features */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                 transition={{ duration: 0.8, delay: 0.8 }}
                 className="space-y-4"
               >
                 <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
                   {/* Book a Discovery Call CTA */}
                   <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="relative group"
                   >
                     <Button
                       href="/contact"
                       variant="gradient-monotone"
                       className="relative px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl inline-flex items-center gap-3"
                     >
                       <Target className="w-5 h-5" />
                       Book a Discovery Call
                       <ArrowRight className="w-5 h-5" />
                     </Button>
                     {/* Glow effect */}
                     <motion.div
                       className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                       transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity }}
                     />
                   </motion.div>

                   {/* Explore our Work CTA */}
                   <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="relative group"
                   >
                     <Button
                       href="/proof"
                       variant="tertiary"
                       className="relative px-6 py-4 border border-border text-foreground font-medium rounded-2xl hover:bg-muted transition-colors inline-flex items-center gap-2"
                     >
                       <Play className="w-4 h-4" />
                       Explore our Work
                     </Button>
                   </motion.div>
                 </div>
                 
                 {/* Trust indicators */}
                 <motion.div
                   className="flex items-center gap-4 text-xs text-muted-foreground"
                   initial={{ opacity: 0 }}
                   animate={isHeroInView ? { opacity: 1 } : {}}
                   transition={{ duration: 0.8, delay: 1.0 }}
                 >
                   <div className="flex items-center gap-1">
                     <div className="flex -space-x-1">
                       <div className="w-4 h-4 bg-primary rounded-full border border-white"></div>
                       <div className="w-4 h-4 bg-secondary rounded-full border border-white"></div>
                       <div className="w-4 h-4 bg-accent rounded-full border border-white"></div>
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

             {/* Enhanced Right Column - Globe Visual */}
             <motion.div
               initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
               animate={shouldReduceMotion ? false : (isHeroInView ? { opacity: 1, x: 0 } : {})}
               transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }}
                className="relative h-64 sm:h-80 md:h-[600px] flex items-center justify-center"
             >
               {/* Globe Component */}
               <div className="relative w-full h-full">
                 <GlobeDemo />
               </div>
             </motion.div>

          
          </div>
        </section>

        
      

        {/* SOCIAL PROOF SECTION */}
        <SocialProofSection />

        {/* MAGIC BENTO SECTION */}
        <section className="relative py-12 md:py-20 lg:py-32 px-6 md:px-12 lg:px-20 mt-8 md:mt-16">
          <div className="w-full max-w-none mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6">
                <span className="text-foreground">Execution,</span>{" "}
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
              />
            </div>
          </div>
        </section>

        {/* SERVICE GRID */}
        <ServicesGrid />

        {/* FOUNDER QUOTE */}
        <FounderQuote />

        {/* GEO MAP */}
        <GeoMap />

              {/* TESTIMONIALS SECTION */}
      <EnhancedTestimonialsCarousel />

        {/* FINAL CTA SECTION */}
        <CTASection />
      </div>
    </div>
  );
};

export default HomePage;