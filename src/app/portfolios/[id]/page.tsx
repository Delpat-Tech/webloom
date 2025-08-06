'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Briefcase,
  ChevronRight,
  Play,
  Quote,
  Award,
  Clock,
  Target,
  Zap,
  Eye,
  Heart,
  Settings,
  FileText
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useParams, useRouter } from 'next/navigation';
import { portfolioItems, type PortfolioItem } from '@/data/portfolio-data';

// Function to get project by ID
const getProjectById = (id: string): PortfolioItem | undefined => {
  return portfolioItems.find(item => item.id === id);
};

// Function to map portfolio service track to service ID
const getServiceIdFromPortfolio = (portfolio: PortfolioItem): string => {
  // Map service tracks to service IDs
  const serviceTrackToServiceMap: Record<string, string> = {
    'Product MVP': 'mvp-engine',
    'Internal OS': 'internal-tools',
    'Automation MVP': 'automation-suite',
    'Custom': 'custom-development',
    'R&D': 'research-development'
  };

  return serviceTrackToServiceMap[portfolio.meta.serviceTrack] || 'mvp-engine';
};

export default function PortfolioItemPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  // Get portfolio data from centralized source
  const portfolioData = getProjectById(params.id as string);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (serviceTrack: string) => {
    switch (serviceTrack) {
      case 'Product MVP':
        return <Globe className="w-5 h-5" />;
      case 'Internal OS':
        return <Settings className="w-5 h-5" />;
      case 'Automation MVP':
        return <Zap className="w-5 h-5" />;
      case 'Custom':
        return <Code className="w-5 h-5" />;
      case 'R&D':
        return <Database className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'process', label: 'Process', icon: <Settings className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <Palette className="w-4 h-4" /> }
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          className="absolute top-1/5 left-1/5 w-40 h-40 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-2xl"
          style={{ scale }}
        />
        <motion.div
          className="absolute top-2/3 right-1/5 w-56 h-56 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-2xl"
          style={{ scale }}
        />
      </div>

      {/* HEADER SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {getCategoryIcon(portfolioData.meta.serviceTrack)}
                <span className="text-sm text-muted-foreground capitalize">
                  {portfolioData.meta.serviceTrack}
                </span>
                {portfolioData.meta.featured && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {(() => {
                  const titleParts = portfolioData.cardTitle.split(': ');
                  const mainTitle = titleParts[0];
                  return mainTitle;
                })()}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {(() => {
                  const titleParts = portfolioData.cardTitle.split(': ');
                  const subTitle = titleParts[1] || portfolioData.story.problem;
                  return subTitle;
                })()}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Persona</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{portfolioData.meta.persona}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Client</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{portfolioData.client.name}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Result</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{portfolioData.outcome.headlineMetric.value}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {portfolioData.meta.links.live && (
                  <Link href={portfolioData.meta.links.live} target="_blank">
                    <Button className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </Button>
                  </Link>
                )}
                {portfolioData.meta.links.github && (
                  <Link href={portfolioData.meta.links.github} target="_blank">
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      View Code
                    </Button>
                  </Link>
                )}
                <Link href="/contact">
                  <Button variant="gradient-outline" className="flex items-center gap-2">
                    <span>Start Similar Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-primary/50 text-6xl font-bold">
                  {(() => {
                    const titleParts = portfolioData.cardTitle.split(': ');
                    const mainTitle = titleParts[0];
                    // Take first letter of each word, max 3 letters
                    const shortForm = mainTitle.split(' ').slice(0, 3).map(word => word[0]).join('');
                    return shortForm;
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TAB CONTENT */}
      <section className="relative px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Challenge & Solution */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    The Challenge
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {portfolioData.story.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-accent" />
                    Our Solution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {portfolioData.execution.coreMandate}
                  </p>
                </div>
              </div>

              {/* Technologies & Results */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-primary" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.techStack.frontend && portfolioData.techStack.frontend.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {portfolioData.techStack.backend && portfolioData.techStack.backend.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {portfolioData.techStack.database && portfolioData.techStack.database.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    Key Results
                  </h3>
                  <div className="space-y-3">
                    {portfolioData.outcome.qualitativeWins.map((win, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{win}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'process' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                Our Development Process
              </h3>
              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Problem Analysis & Requirements Gathering</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Solution Design & Architecture</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Development & Implementation</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Testing & Quality Assurance</p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Deployment & Launch</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  className="p-6 bg-card rounded-xl border border-border text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-2">
                    {portfolioData.outcome.headlineMetric.value}
                  </div>
                  <p className="text-muted-foreground">{portfolioData.outcome.headlineMetric.label}</p>
                </motion.div>

                {portfolioData.outcome.otherMetrics && portfolioData.outcome.otherMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-card rounded-xl border border-border text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-foreground font-medium">{metric}</p>
                  </motion.div>
                ))}
              </div>

              {/* Client Quote */}
              {portfolioData.outcome.clientQuote && (
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                    Client Testimonial
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <motion.div
                      className="p-8 bg-card rounded-2xl border border-border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Quote className="w-8 h-8 text-primary/30 mb-4" />
                      <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        &quot;{portfolioData.outcome.clientQuote.text}&quot;
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold">
                            {portfolioData.outcome.clientQuote.attribution.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{portfolioData.outcome.clientQuote.attribution}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                Project Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="text-primary/50 text-2xl font-bold">
                    Main View
                  </div>
                </motion.div>
                <motion.div
                  className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-primary/50 text-2xl font-bold">
                    Features
                  </div>
                </motion.div>
                <motion.div
                  className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="text-primary/50 text-2xl font-bold">
                    Results
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Content Section */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              Related Content
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Related Case Study */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Case Study</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Deep dive into our process, challenges faced, and measurable results achieved for this project.
                </p>
                <Link href={portfolioData.meta.links.caseStudy}>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <span>View Case Study</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Related Service */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold text-foreground">Get This Service</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Interested in similar results? Learn about our service offerings and how we can help your business.
                </p>
                <Link href={`/services/${getServiceIdFromPortfolio(portfolioData)}`}>
                  <Button variant="accent" className="flex items-center gap-2">
                    <span>Explore Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Build Something
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Similar?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can bring your vision to life with the same
              quality and results you see in this project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="flex items-center gap-3">
                  <span>Start Your Project</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/portfolios">
                <Button variant="secondary" className="flex items-center gap-3">
                  <span>View More Work</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 