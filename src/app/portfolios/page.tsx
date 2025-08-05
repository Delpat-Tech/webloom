'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Briefcase, 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Database,
  ArrowRight,
  Filter,
  Search,
  Star,
  Calendar,
  Users,
  TrendingUp,
  ChevronDown,
  Eye,
  ExternalLink,
  Github
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { 
  portfolioItems, 
  getProjectsByCategory, 
  searchProjects, 
  getCategories,
  type PortfolioItem 
} from '@/data/portfolio';

export default function PortfoliosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  const categories = [
    { id: 'all', label: 'All Work', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'web-apps', label: 'Web Applications', icon: <Globe className="w-5 h-5" /> },
    { id: 'mobile-apps', label: 'Mobile Apps', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'ui-ux', label: 'UI/UX Design', icon: <Palette className="w-5 h-5" /> },
    { id: 'automation', label: 'Automation', icon: <Code className="w-5 h-5" /> },
    { id: 'data', label: 'Data Solutions', icon: <Database className="w-5 h-5" /> }
  ];

  // Filter items based on category and search
  const filteredItems = React.useMemo(() => {
    let items = portfolioItems;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      items = getProjectsByCategory(selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      items = searchProjects(searchQuery);
      // If category is also selected, filter by both
      if (selectedCategory !== 'all') {
        items = items.filter(item => item.category === selectedCategory);
      }
    }
    
    return items;
  }, [selectedCategory, searchQuery]);

  const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Featured Badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-medium">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

               {/* Image */}
         <div className="relative aspect-video overflow-hidden">
           <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
             <div className="text-primary/50 text-4xl font-bold">
               {item.title.split(' ').map(word => word[0]).join('')}
             </div>
           </div>
         </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{item.timeline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{item.teamSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{item.results.length} results</span>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-4 pt-4 border-t border-border mb-4">
          <div className="flex flex-wrap gap-1">
            {item.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {item.technologies.length > 4 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{item.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/portfolios/${item.id}`}>
            <Button variant="secondary" className="text-sm px-3 py-2">
              View Details
            </Button>
          </Link>
          {item.liveUrl && (
            <Link href={item.liveUrl} target="_blank">
              <Button variant="secondary" className="text-sm px-3 py-2">
                Live Demo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );

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

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Floating portfolio icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-10 -left-10 text-primary/40"
                animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Briefcase className="w-14 h-14" />
              </motion.div>
              <motion.div
                className="absolute -top-16 -right-8 text-secondary/40"
                animate={{ y: [0, -20, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Code className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -bottom-8 left-1/3 text-accent/40"
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Palette className="w-10 h-10" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Our</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Portfolio.
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A showcase of our best work across web applications, mobile apps, 
              automation solutions, and design systems. Each project tells a story of 
              innovation, problem-solving, and measurable results.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { number: '50+', label: 'Projects Completed', icon: <Briefcase className="w-6 h-6" /> },
                { number: '98%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
                { number: '₹10M+', label: 'Revenue Generated', icon: <TrendingUp className="w-6 h-6" /> },
                { number: '100K+', label: 'Users Reached', icon: <Users className="w-6 h-6" /> }
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

      {/* FILTERS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "gradient-monotone" : "secondary"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 text-sm px-3 py-2"
                >
                  {category.icon}
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-muted-foreground text-lg mb-4">
                No projects found matching your criteria
              </div>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                variant="secondary"
              >
                Clear Filters
              </Button>
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
              Ready to Start Your
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and see how we can bring your ideas to life with the same 
              quality and results you see in our portfolio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="flex items-center gap-3">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" className="flex items-center gap-3">
                  <span>View Our Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 