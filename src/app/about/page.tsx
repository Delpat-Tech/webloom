'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Heart,
  ArrowRight,
  Lightbulb,
  Rocket,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import DelpatEthos from '../../components/sections/DelpatEthos';
import CoreValues from '../../components/sections/CoreValues';
import Team from '../../components/sections/Team';
import Culture from '../../components/sections/Culture';

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Unique parallax patterns for about page
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background with About-themed Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Organic shapes for human touch */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-[var(--primary)]/15 to-[var(--secondary)]/15 rounded-full blur-3xl"
          style={{ translateY, scale }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-[var(--accent)]/15 to-[var(--primary)]/15 rounded-full blur-3xl"
          style={{ opacity, scale: useTransform(scrollYProgress, [0, 1], [1.2, 0.8]) }}
        />
        
        {/* Grid pattern with human touch */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(37,38,39,0.04)_2px,transparent_0)] bg-[size:60px_60px]" />
        
        {/* Interactive cursor effect */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-[var(--secondary)]/8 to-[var(--accent)]/8 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
            scale: [1, 1.2, 1]
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 20 },
            y: { type: "spring", stiffness: 20, damping: 20 },
            scale: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }}
        />
      </div>

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Floating brand icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-12 -left-12 text-blue-500/30"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 8, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Lightbulb className="w-16 h-16" />
              </motion.div>
              <motion.div
                className="absolute -top-8 -right-16 text-purple-500/30"
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <Heart className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 left-1/4 text-green-500/30"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 12, 0]
                }}
                transition={{ 
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }}
              >
                <Users className="w-14 h-14" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">We Are the</span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Execution
              </motion.span>
              <span className="block text-foreground text-5xl md:text-6xl lg:text-7xl">Engine.</span>
            </motion.h1>

            {/* Philosophy tagline */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Built by founders, for founders. We understand the gap between brilliant ideas 
              and real-world impact because we&apos;ve lived it, bridged it, and now we help others cross it.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">Discover our story</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DELPAT ETHOS SECTION */}
      <DelpatEthos />

      {/* CORE VALUES SECTION */}
      <CoreValues />

      {/* TEAM SECTION */}
      <Team />

      {/* CULTURE SECTION */}
      <Culture />

      {/* FINAL CTA SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Ready to work with us?
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Let&apos;s Bridge Your
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Execution Gap
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your idea deserves execution that matches its potential. Let&apos;s make it happen.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link 
                href="/contact"
                className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/services"
                className="group flex items-center gap-2 px-8 py-4 bg-card text-foreground border border-border rounded-xl font-semibold text-lg hover:bg-accent transition-all duration-300 hover:scale-105"
              >
                View Our Services
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}