'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft,
  ExternalLink,
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
  Quote,
  Award,
  Clock,
  Target,
  Zap,
  Eye,
  Heart,
  Settings,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Users2,
  DollarSign,
  Activity
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useParams, useRouter } from 'next/navigation';
import { getCaseStudyById, type CaseStudy } from '@/data/case-studies';

export default function CaseStudyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  // Get case study data
  const caseStudy = getCaseStudyById(params.id as string);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link href="/case-studies">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-apps': return <Globe className="w-5 h-5" />;
      case 'mobile-apps': return <Smartphone className="w-5 h-5" />;
      case 'ui-ux': return <Palette className="w-5 h-5" />;
      case 'automation': return <Settings className="w-5 h-5" />;
      case 'data': return <Database className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
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
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/case-studies">
              <Button variant="secondary" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Button>
            </Link>
          </motion.div>

          {/* Case Study Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {getCategoryIcon(caseStudy.category)}
                <span className="text-sm text-muted-foreground capitalize">
                  {caseStudy.category.replace('-', ' ')}
                </span>
                {caseStudy.featured && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                {caseStudy.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                {caseStudy.subtitle}
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {caseStudy.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Timeline</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{caseStudy.timeline}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Team</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{caseStudy.teamSize}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Budget</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{caseStudy.budget}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Results</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{caseStudy.results.length}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {caseStudy.liveUrl && (
                  <Link href={caseStudy.liveUrl} target="_blank">
                    <Button className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
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
                  {caseStudy.title.split(' ').map(word => word[0]).join('')}
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
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
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
              className="space-y-12"
            >
              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    The Challenge
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-accent" />
                    Our Solution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Technologies & Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-primary" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
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
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" />
                  Measurable Impact
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {caseStudy.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-card rounded-xl border border-border text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-primary-foreground">
                          {/* Render icon based on string name */}
                          {metric.icon === 'DollarSign' && <DollarSign className="w-5 h-5" />}
                          {metric.icon === 'Activity' && <Activity className="w-5 h-5" />}
                          {metric.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                          {metric.icon === 'Shield' && <Shield className="w-5 h-5" />}
                          {metric.icon === 'Users' && <Users className="w-5 h-5" />}
                          {metric.icon === 'Star' && <Star className="w-5 h-5" />}
                          {metric.icon === 'Zap' && <Zap className="w-5 h-5" />}
                          {metric.icon === 'CheckCircle' && <CheckCircle className="w-5 h-5" />}
                          {metric.icon === 'Heart' && <Heart className="w-5 h-5" />}
                          {metric.icon === 'Settings' && <Settings className="w-5 h-5" />}
                          {metric.icon === 'Target' && <Target className="w-5 h-5" />}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-foreground mb-2">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </motion.div>
                  ))}
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
                {caseStudy.process.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{step}</p>
                    </div>
                  </motion.div>
                ))}
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
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                  Project Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudy.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-card rounded-xl border border-border text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <p className="text-foreground font-medium">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              {caseStudy.testimonials.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                    Client Testimonials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {caseStudy.testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        className="p-8 bg-card rounded-2xl border border-border"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <Quote className="w-8 h-8 text-primary/30 mb-4" />
                        <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold">
                              {testimonial.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
                {caseStudy.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-primary/50 text-2xl font-bold">
                      Image {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
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
              Ready to Achieve
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Similar Results?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how we can deliver the same level of success 
              and measurable impact for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="flex items-center gap-3">
                  <span>Start Your Project</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="secondary" className="flex items-center gap-3">
                  <span>View More Case Studies</span>
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