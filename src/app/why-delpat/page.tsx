'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Target,
  Clock,
  DollarSign,
  CheckCircle,
  Heart,
  ArrowRight,
  Handshake,
  Layers,
  Sparkles,
  Crown,
  Gem,
  Compass
} from 'lucide-react';
import Button from '@/components/ui/Button';
import TrustSignals from '@/components/sections/TrustSignals';

export default function WhyDelpatPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  
  // Different animation patterns from contact page
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.9, 1], [1, 0.9, 0.7, 0.6]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Key Differentiators
  const differentiators = [
    {
      title: 'Fixed Timelines',
      description: 'No endless sprints. We commit to delivery dates and stick to them.',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-primary to-secondary',
      gradient: 'bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10',
      detail: 'Week-by-week milestones with guaranteed delivery',
      metric: '100% on-time delivery'
    },
    {
      title: 'Value-Based Pricing',
      description: 'Pay for outcomes, not hours. Transparent pricing aligned with your success.',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-accent to-primary',
      gradient: 'bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10',
      detail: 'Fixed project pricing with clear scope boundaries',
      metric: 'No hidden fees, ever'
    },
    {
      title: 'Client-Aligned Execution',
      description: 'Your success is our success. We think like co-founders, not contractors.',
      icon: <Handshake className="w-8 h-8" />,
      color: 'from-secondary to-accent',
      gradient: 'bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/10',
      detail: 'Strategic thinking beyond just technical delivery',
      metric: '90% client retention rate'
    },
    {
      title: 'Scalable Architecture',
      description: 'Built to grow with you. No technical debt, no rebuilds later.',
      icon: <Layers className="w-8 h-8" />,
      color: 'from-primary to-accent',
      gradient: 'bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10',
      detail: 'Enterprise-grade foundations from day one',
      metric: 'Zero rebuilds needed'
    }
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Unique Animated Background - Diamond/Gem Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Diamond-shaped floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-32 h-32"
          style={{ rotateX, opacity }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 transform rotate-45 blur-xl" />
        </motion.div>
        
        <motion.div
          className="absolute top-2/3 right-1/4 w-40 h-40"
          style={{ 
            rotateX: useTransform(scrollYProgress, [0, 1], [0, -270]),
            scaleX 
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500/15 to-emerald-500/15 transform rotate-45 blur-2xl" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 transform rotate-45 blur-3xl" />
        </motion.div>

        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_6px_6px,rgba(99,102,241,0.05)_6px,transparent_0)] bg-[size:60px_60px]" />
        
        {/* Mouse-following gem effect */}
        <motion.div
          className="absolute w-24 h-24 pointer-events-none"
          animate={{
            x: mousePosition.x - 48,
            y: mousePosition.y - 48,
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25
          }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 transform rotate-45 blur-xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* HEADER SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center"
          >
            {/* Floating crown icon */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="relative"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="p-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl">
                  <Crown className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-3xl blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Main headline - more compact than contact page */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Why Founders Choose</span>
              <motion.span 
                className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Delpat
              </motion.span>
              <span className="block text-foreground text-2xl md:text-3xl lg:text-4xl font-medium">Over Agencies</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We&apos;re not just another development agency. 
              <span className="font-semibold text-foreground"> We&apos;re your execution partner.</span>
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12 text-sm"
            >
              {[
                { icon: <Target className="w-4 h-4" />, text: '100% On-Time', color: 'text-primary' },
                { icon: <Heart className="w-4 h-4" />, text: '90% Retention', color: 'text-red-600' },
                { icon: <Gem className="w-4 h-4" />, text: 'Zero Rebuilds', color: 'text-secondary' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-2 ${stat.color} font-medium`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.icon}
                  <span>{stat.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                variant="gradient-monotone"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg rounded-2xl font-semibold shadow-2xl"
                onClick={() => window.location.href = '/contact'}
              >
                <Sparkles className="w-5 h-5" />
                <span>Experience the Difference</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DIFFERENTIATORS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Compass className="w-4 h-4" />
              Key Differentiators
            </motion.div>

            <h2 className="section-title">
              What Makes Us
              <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four core principles that set us apart from traditional agencies.
            </p>
          </motion.div>

          {/* Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <motion.div
                key={index}
                className={`group relative p-8 rounded-3xl border border-border/50 ${diff.gradient} backdrop-blur-sm hover:border-primary/30 transition-all duration-500 overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -8 }}
              >
                {/* Background decoration */}
                <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${diff.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${diff.color} mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  {diff.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {diff.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {diff.description}
                  </p>

                  <p className="text-sm text-foreground/80 mb-4 italic">
                    {diff.detail}
                  </p>

                  {/* Metric badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${diff.color} bg-opacity-10 rounded-full`}>
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {diff.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <TrustSignals />
    </main>
  );
}