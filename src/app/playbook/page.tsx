'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Rocket, Lightbulb, Brain, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import BlogPostsSection from '@/components/sections/BlogPostsSection';

export default function PlaybookPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Parallax animation values
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.75]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Animated Ambient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        {/* Ambient gradients */}
        <motion.div
          className="absolute top-1/6 left-1/10 w-96 h-96 bg-gradient-to-r from-primary/12 to-secondary/12 rounded-full blur-3xl"
          style={{ translateY, scale }}
        />
        <motion.div
          className="absolute top-1/2 right-1/8 w-80 h-80 bg-gradient-to-r from-accent/12 to-secondary/12 rounded-full blur-3xl"
          style={{ opacity, scale: useTransform(scrollYProgress, [0, 1], [1.1, 0.9]) }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_3px_3px,rgba(var(--primary-rgb),0.02)_3px,transparent_0)] bg-[size:80px_80px]" />

        {/* Interactive glow following cursor */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-secondary/6 to-pink-400/6 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 144,
            y: mousePosition.y - 144,
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 25, damping: 25 },
            y: { type: 'spring', stiffness: 25, damping: 25 },
            scale: {
              repeat: Infinity,
              duration: 4,
              ease: 'easeInOut',
            },
          }}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Floating icons */}
            <div className="relative mb-6">
              <motion.div
                className="absolute -top-12 -left-12 text-primary/30 hidden sm:block"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <BookOpen className="w-16 h-16" />
              </motion.div>
              <motion.div
                className="absolute -top-10 -right-16 text-secondary/30 hidden sm:block"
                animate={{
                  y: [0, -18, 0],
                  rotate: [0, -8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
              >
                <Rocket className="w-14 h-14" />
              </motion.div>
            </div>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Execution Playbook</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-foreground">Tactical Guides &amp; </span>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Execution Frameworks.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Essays, teardowns, and actionable insights from our delivery engine. Everything you need to bridge the gap between ambitious ideas and real-world impact.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ARTICLES GRID SECTION */}
      <BlogPostsSection />

      {/* STILL HAVE QUESTIONS CTA SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 text-center relative overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl" />

            <div className="relative z-10">
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1 }}
              >
                <MessageCircle className="w-12 h-12 mx-auto text-primary mb-4" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-8 text-base md:text-lg max-w-xl mx-auto">
                We&apos;re here to help you make the right decision for your project.
              </p>

              <div className="flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book a Discovery Call
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
