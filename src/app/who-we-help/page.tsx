'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import PersonaSection from '@/components/sections/PersonaSection';
import InfiniteScroll from '@/components/sections/InfiniteScroll';
import { useState, useEffect } from 'react';
import { Zap, Target, Rocket, Code, Users, TrendingUp, ChevronDown } from 'lucide-react';

export default function WhoWeHelpPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const executionStats = [
    { icon: <Zap className="w-6 h-6" />, number: "6 weeks", label: "Average delivery time" },
    { icon: <Target className="w-6 h-6" />, number: "100%", label: "Success rate on MVPs" },
    { icon: <Users className="w-6 h-6" />, number: "50+", label: "Founders helped" },
    { icon: <TrendingUp className="w-6 h-6" />, number: "$2M+", label: "Funding raised by clients" }
  ];

  // Mock case study data for the carousel
  const caseStudies = [
    {
      id: '1',
      title: 'AI-powered Workflow Automation',
      summary: 'Automated 80% of manual tasks for a fintech client.',
      challenge: 'Manual processes slowed down growth.',
      solution: 'Custom AI workflow engine.',
      results: 'Saved 1000+ hours/year.',
    },
    {
      id: '2',
      title: 'E-commerce Growth Platform',
      summary: 'Scaled to 10k+ users in 3 months.',
      challenge: 'Needed rapid, reliable scaling.',
      solution: 'Serverless, auto-scaling infra.',
      results: 'Zero downtime, 5x revenue.',
    },
    {
      id: '3',
      title: 'Healthcare Data Portal',
      summary: 'Unified patient data for 5 clinics.',
      challenge: 'Fragmented, insecure records.',
      solution: 'HIPAA-compliant cloud portal.',
      results: 'Improved care, 2x faster onboarding.',
    },
    {
      id: '4',
      title: 'SaaS Analytics Suite',
      summary: 'Real-time insights for founders.',
      challenge: 'No visibility into user behavior.',
      solution: 'Custom analytics dashboard.',
      results: 'Drove 30% feature adoption.',
    },
    {
      id: '5',
      title: 'Marketplace Launch',
      summary: 'Launched in 6 weeks, 100+ vendors onboarded.',
      challenge: 'Tight timeline, complex onboarding.',
      solution: 'Automated vendor workflows.',
      results: 'Onboarded 100+ vendors in 2 weeks.',
    },
    {
      id: '6',
      title: 'EdTech Mobile App',
      summary: 'Enabled remote learning for 20k+ students.',
      challenge: 'Needed scalable, interactive platform.',
      solution: 'React Native + Firebase app.',
      results: 'Doubled engagement, 99.9% uptime.',
    },
    {
      id: '7',
      title: 'Logistics Optimization',
      summary: 'Reduced delivery times by 40%.',
      challenge: 'Inefficient route planning.',
      solution: 'AI-powered route optimization.',
      results: 'Saved $500k/year in costs.',
    },
    {
      id: '8',
      title: 'Subscription SaaS Launch',
      summary: 'Reached 1k paid users in 2 months.',
      challenge: 'Needed frictionless onboarding.',
      solution: 'Self-serve onboarding flow.',
      results: '80% trial-to-paid conversion.',
    },
    {
      id: '9',
      title: 'Retail Analytics Platform',
      summary: 'Unified sales data for 200+ stores.',
      challenge: 'Disparate legacy systems.',
      solution: 'Centralized cloud analytics.',
      results: '20% increase in sales insights.',
    },
    {
      id: '10',
      title: 'Fintech KYC Automation',
      summary: 'Automated KYC for 50k+ users.',
      challenge: 'Manual compliance checks.',
      solution: 'AI document verification.',
      results: 'Cut onboarding time by 90%.',
    },
    // Add 20 more unique case studies for a total of 30
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${11 + i}`,
      title: `Case Study ${11 + i}`,
      summary: `Summary for case study ${11 + i}.`,
      challenge: `Challenge for case study ${11 + i}.`,
      solution: `Solution for case study ${11 + i}.`,
      results: `Results for case study ${11 + i}.`,
    })),
  ];

  const infiniteScrollItems = caseStudies.map(cs => ({
    content: (
      <div>
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 8 }}>{cs.title}</h3>
        <div style={{ color: '#666', fontSize: '1rem', marginBottom: 8 }}>{cs.summary}</div>
        <div style={{ fontSize: '0.95rem', marginBottom: 4 }}><b>Challenge:</b> {cs.challenge}</div>
        <div style={{ fontSize: '0.95rem', marginBottom: 4 }}><b>Solution:</b> {cs.solution}</div>
        <div style={{ fontSize: '0.95rem' }}><b>Outcome:</b> {cs.results}</div>
      </div>
    ),
    link: `/proof/${cs.id}`,
    ctaText: 'See Case Study →',
  }));

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, 100]),
            y: y1
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-3xl"
          style={{
            x: useTransform(scrollYProgress, [0, 1], [0, -100]),
            y: y2
          }}
        />
        
        {/* Grid Pattern */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground-rgb),0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
         */}
        {/* Mouse-following gradient */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Floating icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-8 -left-8 text-primary/40"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -top-12 -right-12 text-accent/40"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Rocket className="w-10 h-10" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 left-1/4 text-secondary/40"
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Target className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Main heading with enhanced typography */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Built for a</span>
              <span className="block text-foreground">Specific Mindset:</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Execution
              </motion.span>
            </motion.h1>

            {/* Subtitle with animation */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your role may differ, but the goal is the same: deliver results, fast. 
              We are the specialized partner for those who build.
            </motion.p>

            {/* Stats section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {executionStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-primary mb-3">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <Link href="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <Button className="relative px-12 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-secondary text-primary-foreground border-0 rounded-2xl shadow-2xl">
                    See Our Services
                  </Button>
                </motion.div>
              </Link>
              
              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">Scroll to explore</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROOF CAROUSEL SECTION */}
      <section className="flex flex-col items-center py-16 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-foreground">Proof:</span>
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent ml-2">
            Real Results for Real Builders
          </span>
        </h2>
        <div style={{ width: '100%', maxWidth: '100vw' }}>
          <InfiniteScroll
            width="100%"
            maxHeight="32rem"
            negativeMargin="-1.5em"
            items={infiniteScrollItems}
            itemMinHeight={260}
            autoplay={true}
            autoplaySpeed={0.7}
            autoplayDirection="down"
            pauseOnHover={true}
            columns={3}
          />
        </div>
      </section>

      {/* PERSONA SECTIONS */}
      <section className="relative space-y-20">
        {/* Section divider with animated line */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-background rounded-full">
            
          </div>
        </motion.div>

        {/* Enhanced title for persona section */}
        <motion.div
          className="text-center max-w-4xl mx-auto px-6 md:px-12 lg:px-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
         
        </motion.div>

        <PersonaSection />
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
    </main>
  );
}
