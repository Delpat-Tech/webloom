'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from '@/components/ui/Link';
import { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle, 
  ArrowRight,
  Rocket,
  Users,
  Heart,
  Settings,
  Quote,
  Star,
  Award,
  TrendingUp,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import PortfolioShowcase from '@/components/sections/PortfolioShowcase';
import CaseStudyGrid from '@/components/sections/CaseStudyGrid';

export default function ProofPage() {
  const { scrollYProgress } = useScroll();
  
  // Different parallax pattern for proof page
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);



  // Mock testimonial data - Updated to match seed data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO, TechFlow',
      company: 'SaaS Startup',
      video: '/api/placeholder/400/300',
      quote: 'Delpat delivered our MVP in 5 weeks when our internal team estimated 4 months. Game changer. We shipped, they didn\'t ghost.',
      results: ['5-week MVP delivery', '4-month original estimate', 'Zero ghosting'],
      avatar: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      role: 'Founder, HealthTrack',
      company: 'HealthTech Startup',
      video: '/api/placeholder/400/300',
      quote: 'We went from idea to 10K users in just 8 weeks. The MVP they built became the foundation for our ₹2M funding round.',
      results: ['Idea to 10K users', '8-week delivery', 'Validated business model'],
      avatar: '/api/placeholder/60/60'
    }
  ];

  // Remove unused socialProof variable
  // const socialProof = [
  //   {
  //     id: 1,
  //     platform: 'linkedin',
  //     author: 'Alex Johnson',
  //     role: 'CTO, StartupX',
  //     content: 'Just launched our new internal tool built by the team. The productivity gains are incredible - our team is 2x more efficient!',
  //     engagement: { likes: 127, comments: 23, shares: 15 },
  //     date: '2 days ago',
  //     avatar: '/api/placeholder/40/40'
  //   },
  //   {
  //     id: 2,
  //     platform: 'twitter',
  //     author: 'Emma Wilson',
  //     role: 'Founder, EcoTech',
  //     content: 'Thread: How we reduced manual work by 80% with a custom automation system. The ROI was immediate and the results speak for themselves... 🧵',
  //     engagement: { likes: 89, comments: 12, shares: 34 },
  //     date: '5 days ago',
  //     avatar: '/api/placeholder/40/40'
  //   },
  //   {
  //     id: 3,
  //     platform: 'medium',
  //     author: 'David Park',
  //     role: 'Operations Director',
  //     content: 'Case Study: How We Scaled Our Operations Without Hiring - A deep dive into the automation system that transformed our business processes.',
  //     engagement: { likes: 156, comments: 28, shares: 45 },
  //     date: '1 week ago',
  //     avatar: '/api/placeholder/40/40'
  //   }
  // ];



  return (
    <main className="relative overflow-hidden">
      {/* Animated Background with Proof-themed Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Floating testimonial-like shapes */}
        <motion.div
          className="absolute top-1/5 left-1/5 w-40 h-40 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"
          style={{ rotateX, scale }}
        />
        <motion.div
          className="absolute top-2/3 right-1/5 w-56 h-56 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-2xl"
          style={{ rotateY, scale }}
        />
        
        {/* Hexagonal Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(37,38,39,0.03)_1px,transparent_0)] bg-[size:40px_40px]" />
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
            {/* Floating proof icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-10 -left-10 text-green-500/40"
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CheckCircle className="w-14 h-14" />
              </motion.div>
              <motion.div
                className="absolute -top-16 -right-8 text-blue-500/40"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -12, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Award className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -bottom-8 left-1/3 text-purple-500/40"
                animate={{ 
                  y: [0, -30, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ 
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Star className="w-10 h-10" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Proof
              </motion.span>
              <span className="text-foreground"> of </span>
              <motion.span 
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Execution
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We don&apos;t talk, we ship. Explore the MVPs, internal tools, and automations we&apos;ve built for founders and ops leaders who needed results, fast.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { number: '50+', label: 'Projects Shipped', icon: <CheckCircle className="w-6 h-6" /> },
                { number: '95%', label: 'Client Retention Rate', icon: <Star className="w-6 h-6" /> },
                { number: 'Zero', label: 'Required Rebuilds', icon: <Award className="w-6 h-6" /> },
                { number: '5,000+', label: 'Hours of Manual Work Automated', icon: <Settings className="w-6 h-6" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
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

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">Explore our work</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE SECTION WITH FILTERS */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Project <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Filter by category, technology, or project type to find projects similar to yours.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <PortfolioShowcase 
            title=""
            subtitle=""
            maxItems={9}
            showViewAll={true}
            showFilters={true}
          />
        </div>
      </section>

      {/* FOUNDER-VERIFIED RESULTS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Founder-Verified <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Video testimonials and direct quotes from clients, building unimpeachable trust through real results.
            </p>
          </motion.div>

          {/* Testimonials */}
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Video Testimonial */}
                <div className="flex-1 relative">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative group cursor-pointer">
                    <div className="text-primary/50 group-hover:text-primary/70 transition-colors">
                      <Play className="w-20 h-20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{testimonial.name}</p>
                          <p className="text-white/80 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 space-y-6">
                  <div className="relative">
                    <Quote className="w-10 h-10 text-primary/30 absolute -top-2 -left-2" />
                    <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed pl-6">
                      {testimonial.quote}
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {testimonial.results.map((result: string, idx: number) => (
                      <div key={idx} className="p-4 bg-card/50 rounded-xl border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">{result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <CaseStudyGrid />


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
              Ready to build something amazing?
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your Project Could Be
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Next in Line
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We&apos;ve proven we can deliver results. Now let&apos;s prove it for your business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/contact">
                <motion.button
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Book a Discovery Call</span>
                  <Rocket className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/how-we-work">
                <motion.button
                  className="inline-flex items-center gap-3 px-8 py-4 bg-card/50 hover:bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground rounded-2xl font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>See Our Process</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}