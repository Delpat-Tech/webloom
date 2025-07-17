'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ChevronDown,
  Clock,
  Users,
  Target,
  Zap,
  ArrowRight,
  Shield,
  Eye,
  HeartHandshake
} from 'lucide-react';
import TrustSignals from '@/components/sections/TrustSignals';
import ProcessOverview from '@/components/sections/ProcessOverview';

export default function HowWeWorkPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const processStats = [
    { icon: <Clock className="w-6 h-6" />, number: "24h", label: "Response guarantee" },
    { icon: <Shield className="w-6 h-6" />, number: "100%", label: "Process transparency" },
    { icon: <Eye className="w-6 h-6" />, number: "0", label: "Hidden surprises" },
    { icon: <HeartHandshake className="w-6 h-6" />, number: "∞", label: "Communication clarity" }
  ];

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
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,38,39,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,38,39,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
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
                <Shield className="w-12 h-12" />
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
                <Eye className="w-10 h-10" />
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
                <HeartHandshake className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">The</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Zero-Friction
              </motion.span>
              <span className="block text-foreground">Path</span>
              <span className="block text-foreground text-5xl md:text-6xl lg:text-7xl">from Contact to Kickoff</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              No surprises. No ghosting. Just a clear, transparent process from kickoff to handover. 
              You'll know exactly what's happening at every stage.
            </motion.p>

            {/* Stats section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {processStats.map((stat, index) => (
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <Button className="relative px-12 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-secondary text-primary-foreground border-0 rounded-2xl shadow-2xl">
                    Start Your Project
                  </Button>
                </motion.div>
              </Link>
              
              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">See the process</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUST SIGNALS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-8">
        <TrustSignals />
      </section>

      {/* PROCESS OVERVIEW SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <ProcessOverview />
      </section>

      {/* TRANSPARENCY SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100%</span> Transparency
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No black boxes. No surprises. You'll have complete visibility into every aspect of your project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Dashboard",
                description: "Live project tracking with progress metrics, timeline updates, and deliverable status.",
                icon: <Target className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Daily Updates",
                description: "Brief daily progress reports so you're never wondering what's happening.",
                icon: <MessageSquare className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Open Communication",
                description: "Direct access to your development team through Slack, email, or scheduled calls.",
                icon: <Users className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to experience the difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start with a simple conversation. No commitments, no pressure - just clarity on how we can help.
            </p>
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group inline-block"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <Button className="relative px-12 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-secondary text-primary-foreground border-0 rounded-2xl shadow-2xl flex items-center gap-3">
                  Let's Talk
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20" />
    </main>
  );
}