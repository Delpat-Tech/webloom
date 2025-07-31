'use client';

import React, { useState, useEffect } from 'react';
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
  Activity,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { getAllCaseStudies, getCaseStudiesByCategory, type CaseStudy } from '@/data/case-studies';

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  const allCaseStudies = getAllCaseStudies();
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>(allCaseStudies);

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'web-apps', name: 'Web Applications', icon: <Globe className="w-4 h-4" /> },
    { id: 'mobile-apps', name: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'automation', name: 'Automation', icon: <Settings className="w-4 h-4" /> },
    { id: 'data', name: 'Data Analytics', icon: <Database className="w-4 h-4" /> },
    { id: 'ui-ux', name: 'UI/UX Design', icon: <Palette className="w-4 h-4" /> }
  ];

  useEffect(() => {
    let filtered = allCaseStudies;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(study => study.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(study => 
        study.title.toLowerCase().includes(term) ||
        study.subtitle.toLowerCase().includes(term) ||
        study.description.toLowerCase().includes(term) ||
        study.client.toLowerCase().includes(term) ||
        study.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredCaseStudies(filtered);
  }, [searchTerm, selectedCategory, allCaseStudies]);

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


          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Case <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Studies</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Deep dive into our process, challenges faced, and measurable results achieved. 
              See how we've helped businesses transform their operations and achieve remarkable outcomes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Total Cases</span>
                </div>
                <p className="text-lg font-bold text-foreground">{allCaseStudies.length}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Featured</span>
                </div>
                <p className="text-lg font-bold text-foreground">{allCaseStudies.filter(s => s.featured).length}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Categories</span>
                </div>
                <p className="text-lg font-bold text-foreground">{categories.length - 1}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Clients</span>
                </div>
                <p className="text-lg font-bold text-foreground">{new Set(allCaseStudies.map(s => s.client)).size}</p>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 bg-card rounded-lg border border-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-muted-foreground">
              Showing {filteredCaseStudies.length} of {allCaseStudies.length} case studies
            </p>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="relative px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredCaseStudies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No case studies found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="secondary"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/case-studies/${caseStudy.id}`}>
                    <div className={`bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 ${
                      viewMode === 'list' ? 'flex gap-6 p-6' : 'h-full'
                    }`}>
                      {/* Image */}
                      <div className={`${
                        viewMode === 'list' 
                          ? 'w-48 h-32 flex-shrink-0' 
                          : 'aspect-video'
                      } bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden`}>
                        <div className="text-primary/50 text-4xl font-bold">
                          {caseStudy.title.split(' ').map(word => word[0]).join('')}
                        </div>
                        {caseStudy.featured && (
                          <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-medium">
                            <Star className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          {getCategoryIcon(caseStudy.category)}
                          <span className="text-sm text-muted-foreground capitalize">
                            {caseStudy.category.replace('-', ' ')}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {caseStudy.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {caseStudy.subtitle}
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{caseStudy.timeline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">{caseStudy.teamSize}</span>
                          </div>
                        </div>

                        {/* Results Preview */}
                        <div className="space-y-2">
                          {caseStudy.results.slice(0, 2).map((result, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                              <span className="text-muted-foreground line-clamp-1">{result}</span>
                            </div>
                          ))}
                        </div>

                        {/* View Button */}
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{caseStudy.client}</span>
                            <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                              <span className="text-sm font-medium">View Case Study</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
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
              Ready to Create Your Own
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Success Story?
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
              <Link href="/proof">
                <Button variant="secondary" className="flex items-center gap-3">
                  <span>View More Proof</span>
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