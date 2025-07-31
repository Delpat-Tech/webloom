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
import { getProjectById, type PortfolioItem } from '@/data/portfolio';

// Extended interface for detailed portfolio data
interface DetailedPortfolioItem extends PortfolioItem {
  longDescription: string;
  challenge: string;
  solution: string;
  process: string[];
  testimonials: {
    quote: string;
    author: string;
    role: string;
    company: string;
  }[];
  gallery: string[];
}

// Function to map portfolio category to service ID
const getServiceIdFromPortfolio = (portfolio: PortfolioItem): string => {
  // Map categories to service IDs
  const categoryToServiceMap: Record<string, string> = {
    'mobile-apps': 'mvp-engine',
    'web-apps': 'mvp-engine',
    'automation': 'automation-suite',
    'ui-ux': 'design-system',
    'data': 'data-solutions'
  };
  
  return categoryToServiceMap[portfolio.category] || 'mvp-engine';
};

export default function PortfolioItemPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  // Get basic portfolio data from centralized source
  const basicPortfolioData = getProjectById(params.id as string);
  
  // Detailed portfolio data for enhanced project pages
  const detailedPortfolioData: Record<string, DetailedPortfolioItem> = {
    'omega-forex-trading': {
      id: 'omega-forex-trading',
      title: 'Omega Forex Trading App',
      description: 'Real-time forex trading application with live market data integration and advanced trading features',
      category: 'mobile-apps',
      tags: ['Finance', 'Trading', 'Real-time', 'Forex'],
      image: '/api/placeholder/1200/600',
      client: 'Omega Forex',
      timeline: '2-3 months',
      teamSize: '3 developers',
      results: ['Successfully deployed with DP@FIN data', 'Real-time market data integration', 'Advanced trading features'],
      technologies: ['React Native', 'MERN Stack', 'AWS', 'WebSocket'],
      liveUrl: 'https://omega-forex.com',
      featured: true,
      longDescription: 'A comprehensive real-time forex trading application that revolutionized how traders access market data and execute trades. The platform integrates with multiple data sources and provides advanced charting, analysis tools, and automated trading capabilities.',
      challenge: 'Omega Forex needed a mobile trading platform that could handle real-time market data with minimal latency while providing advanced trading features and ensuring data accuracy across multiple forex pairs.',
      solution: 'We developed a React Native application with real-time WebSocket connections, integrated multiple data providers, implemented advanced charting with technical indicators, and built a robust trading engine with order management.',
      process: [
        'Requirements analysis and market research',
        'Architecture design for real-time data handling',
        'React Native app development with trading UI',
        'WebSocket integration for live market data',
        'Advanced charting and technical analysis',
        'Testing and deployment with DP@FIN data'
      ],
      testimonials: [
        {
          quote: 'The trading app exceeded our expectations. The real-time data integration and advanced features have significantly improved our trading efficiency.',
          author: 'Alex Thompson',
          role: 'Trading Director',
          company: 'Omega Forex'
        }
      ],
      gallery: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
      ]
    },
    'omega-forex-crm': {
      id: 'omega-forex-crm',
      title: 'CRM for Omega Forex',
      description: 'Comprehensive CRM system with integrated trading features and client management',
      category: 'web-apps',
      tags: ['CRM', 'Finance', 'SaaS', 'Trading'],
      image: '/api/placeholder/1200/600',
      client: 'Omega Forex',
      timeline: '2 months',
      teamSize: '2 developers',
      results: ['Live deployment on Vercel', 'Integrated trading logic', 'Full CRM functionality'],
      technologies: ['MERN Stack', 'Tailwind CSS', 'Auth0', 'Vercel'],
      liveUrl: 'https://omega-crm.vercel.app',
      featured: true,
      longDescription: 'A full-featured CRM system designed specifically for forex trading companies, integrating client management with trading account monitoring and performance analytics.',
      challenge: 'Omega Forex required a CRM that could seamlessly integrate with their trading platform, manage client relationships, and provide insights into trading performance and client behavior.',
      solution: 'We built a modern web application using the MERN stack with real-time data synchronization, comprehensive client management features, and integrated trading account monitoring.',
      process: [
        'Client requirements and trading workflow analysis',
        'Database design for CRM and trading data',
        'Frontend development with Tailwind CSS',
        'Backend API with trading integration',
        'Authentication and security implementation',
        'Deployment and testing on Vercel'
      ],
      testimonials: [
        {
          quote: 'The CRM has streamlined our client management process and provided valuable insights into trading performance.',
          author: 'Sarah Chen',
          role: 'Operations Manager',
          company: 'Omega Forex'
        }
      ],
      gallery: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
      ]
    },
    'fond-food-delivery': {
      id: 'fond-food-delivery',
      title: 'FOND - Food on Demand',
      description: 'HackMITWPU winning food delivery prototype with queue-based fair access system',
      category: 'mobile-apps',
      tags: ['Food Delivery', 'Hackathon', 'Queue System', 'Prototype'],
      image: '/api/placeholder/1200/600',
      client: 'HackMITWPU',
      timeline: '3 days (Hackathon)',
      teamSize: '4 developers',
      results: ['Won HackMITWPU', 'Queue-based fair access', 'Working prototype'],
      technologies: ['Figma', 'JavaScript', 'CSS', 'React'],
      featured: true,
      longDescription: 'An innovative food delivery prototype that addresses the challenge of fair food access through an intelligent queue system, designed and developed during a 3-day hackathon.',
      challenge: 'The hackathon challenge was to create a solution for fair food distribution in crowded environments, ensuring everyone gets equal access to food without chaos or unfair advantages.',
      solution: 'We developed a queue-based system with real-time updates, fair distribution algorithms, and an intuitive mobile interface that ensures orderly and equitable food access.',
      process: [
        'Problem identification and solution brainstorming',
        'UI/UX design with Figma',
        'Frontend development with React',
        'Queue algorithm implementation',
        'Real-time updates and notifications',
        'Demo preparation and presentation'
      ],
      testimonials: [
        {
          quote: 'FOND demonstrated innovative thinking and technical excellence. The queue system was both practical and fair.',
          author: 'HackMITWPU Judges',
          role: 'Competition Panel',
          company: 'HackMITWPU'
        }
      ],
      gallery: [
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
      ]
    }
  };

  const portfolio = basicPortfolioData ? {
    ...basicPortfolioData,
    ...(detailedPortfolioData[params.id as string] || {}),
    // Add fallbacks for missing detailed properties
    longDescription: detailedPortfolioData[params.id as string]?.longDescription || basicPortfolioData.description,
    challenge: detailedPortfolioData[params.id as string]?.challenge || 'Project challenge details coming soon...',
    solution: detailedPortfolioData[params.id as string]?.solution || 'Project solution details coming soon...',
    process: detailedPortfolioData[params.id as string]?.process || [
      'Project planning and requirements gathering',
      'Development and implementation',
      'Testing and quality assurance',
      'Deployment and launch'
    ],
    testimonials: detailedPortfolioData[params.id as string]?.testimonials || [],
    gallery: detailedPortfolioData[params.id as string]?.gallery || [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ]
  } : null;

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-apps': return <Globe className="w-5 h-5" />;
      case 'mobile-apps': return <Smartphone className="w-5 h-5" />;
      case 'ui-ux': return <Palette className="w-5 h-5" />;
      case 'automation': return <Code className="w-5 h-5" />;
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
                {getCategoryIcon(portfolio.category)}
                <span className="text-sm text-muted-foreground capitalize">
                  {portfolio.category.replace('-', ' ')}
                </span>
                {portfolio.featured && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {portfolio.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {portfolio.description}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Timeline</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{portfolio.timeline}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Team</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{portfolio.teamSize}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Results</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{portfolio.results.length}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {portfolio.liveUrl && (
                  <Link href={portfolio.liveUrl} target="_blank">
                    <Button className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </Button>
                  </Link>
                )}
                {portfolio.githubUrl && (
                  <Link href={portfolio.githubUrl} target="_blank">
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
                  {portfolio.title.split(' ').map(word => word[0]).join('')}
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
                    {portfolio.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-accent" />
                    Our Solution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {portfolio.solution}
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
                    {portfolio.technologies.map((tech, index) => (
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
                    {portfolio.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{result}</span>
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
                {portfolio.process.map((step, index) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.results.map((result, index) => (
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

              {/* Testimonials */}
              {portfolio.testimonials.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
                    Client Testimonials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {portfolio.testimonials.map((testimonial, index) => (
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
                {portfolio.gallery.map((image, index) => (
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
                <Link href={`/case-studies/${portfolio.id}`}>
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
                <Link href={`/services/${getServiceIdFromPortfolio(portfolio)}`}>
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