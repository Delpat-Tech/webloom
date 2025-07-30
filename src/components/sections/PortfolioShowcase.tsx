'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Eye,
  Search,
  X,
  Filter
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { portfolioItems, type PortfolioItem } from '@/data/portfolio';

interface PortfolioShowcaseProps {
  title?: string;
  subtitle?: string;
  maxItems?: number;
  showViewAll?: boolean;
  showFilters?: boolean;
  className?: string;
}

export default function PortfolioShowcase({
  title = "Featured Work",
  subtitle = "A glimpse of our latest projects and their impact",
  maxItems = 3,
  showViewAll = true,
  showFilters = false,
  className = ""
}: PortfolioShowcaseProps) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<PortfolioItem[]>(portfolioItems);
  
  // Dropdown states
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  
  // Define filter options
  const personaOptions = ['Founders', 'Ops Leaders', 'Agencies'];
  const serviceOptions = ['MVP', 'Internal Tools', 'Automation'];
  const industryOptions = ['SaaS', 'E-commerce', 'Health-tech'];
  
  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = portfolioItems;
    
    // Persona filter
    if (selectedPersonas.length > 0) {
      filtered = filtered.filter(project => {
        // Map projects to personas based on their characteristics
        const projectPersonas = getProjectPersonas(project);
        return selectedPersonas.some(persona => projectPersonas.includes(persona));
      });
    }
    
    // Service filter
    if (selectedServices.length > 0) {
      filtered = filtered.filter(project => {
        const projectServices = getProjectServices(project);
        return selectedServices.some(service => projectServices.includes(service));
      });
    }
    
    // Industry filter
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(project => {
        const projectIndustries = getProjectIndustries(project);
        return selectedIndustries.some(industry => projectIndustries.includes(industry));
      });
    }
    
    // Search filter
    if (searchText.trim()) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchText.toLowerCase()) ||
        project.description.toLowerCase().includes(searchText.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    
    setFilteredProjects(filtered);
  }, [selectedPersonas, selectedServices, selectedIndustries, searchText]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Close persona dropdown
      if (personaDropdownOpen && !target.closest('[data-dropdown="persona"]')) {
        setPersonaDropdownOpen(false);
      }
      
      // Close service dropdown
      if (serviceDropdownOpen && !target.closest('[data-dropdown="service"]')) {
        setServiceDropdownOpen(false);
      }
      
      // Close industry dropdown
      if (industryDropdownOpen && !target.closest('[data-dropdown="industry"]')) {
        setIndustryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [personaDropdownOpen, serviceDropdownOpen, industryDropdownOpen]);
  
  const displayedProjects = showFilters ? filteredProjects.slice(0, maxItems) : portfolioItems.slice(0, maxItems);
  
  // Helper functions to map projects to filter categories
  const getProjectPersonas = (project: PortfolioItem): string[] => {
    const personas: string[] = [];
    
    // Map based on project characteristics
    if (project.category === 'mobile-apps' || project.category === 'web-apps') {
      if (project.title.toLowerCase().includes('crm') || project.title.toLowerCase().includes('trading')) {
        personas.push('Founders');
      }
      if (project.title.toLowerCase().includes('erp') || project.title.toLowerCase().includes('management')) {
        personas.push('Ops Leaders');
      }
      if (project.title.toLowerCase().includes('dashboard') || project.title.toLowerCase().includes('analytics')) {
        personas.push('Agencies');
      }
    }
    
    // Default mappings based on project type
    if (project.category === 'automation') {
      personas.push('Ops Leaders');
    }
    if (project.category === 'web-apps' && project.title.toLowerCase().includes('crm')) {
      personas.push('Founders');
    }
    
    return personas.length > 0 ? personas : ['Founders']; // Default to Founders if no specific mapping
  };
  
  const getProjectServices = (project: PortfolioItem): string[] => {
    const services: string[] = [];
    
    // Map based on project characteristics
    if (project.title.toLowerCase().includes('prototype') || project.title.toLowerCase().includes('hackathon')) {
      services.push('MVP');
    }
    if (project.title.toLowerCase().includes('dashboard') || project.title.toLowerCase().includes('scraping') || project.title.toLowerCase().includes('internal')) {
      services.push('Internal Tools');
    }
    if (project.title.toLowerCase().includes('automation') || project.title.toLowerCase().includes('bot') || project.title.toLowerCase().includes('neat')) {
      services.push('Automation');
    }
    
    // Default mappings
    if (project.category === 'automation') {
      services.push('Automation');
    }
    if (project.category === 'mobile-apps' && !project.title.toLowerCase().includes('automation')) {
      services.push('MVP');
    }
    
    return services.length > 0 ? services : ['MVP']; // Default to MVP if no specific mapping
  };
  
  const getProjectIndustries = (project: PortfolioItem): string[] => {
    const industries: string[] = [];
    
    // Map based on project characteristics
    if (project.title.toLowerCase().includes('crm') || project.title.toLowerCase().includes('saas') || project.title.toLowerCase().includes('platform')) {
      industries.push('SaaS');
    }
    if (project.title.toLowerCase().includes('food') || project.title.toLowerCase().includes('delivery') || project.title.toLowerCase().includes('e-commerce')) {
      industries.push('E-commerce');
    }
    if (project.title.toLowerCase().includes('health') || project.title.toLowerCase().includes('medical') || project.title.toLowerCase().includes('wellness')) {
      industries.push('Health-tech');
    }
    
    // Default mappings
    if (project.category === 'web-apps' && project.title.toLowerCase().includes('crm')) {
      industries.push('SaaS');
    }
    if (project.category === 'mobile-apps' && project.title.toLowerCase().includes('food')) {
      industries.push('E-commerce');
    }
    
    return industries.length > 0 ? industries : ['SaaS']; // Default to SaaS if no specific mapping
  };
  
  // Toggle filter functions
  const togglePersona = (persona: string) => {
    setSelectedPersonas(prev => 
      prev.includes(persona) 
        ? prev.filter(p => p !== persona)
        : [...prev, persona]
    );
  };
  
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };
  
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedPersonas([]);
    setSelectedServices([]);
    setSelectedIndustries([]);
    setSearchText('');
  };
  
  const hasActiveFilters = selectedPersonas.length > 0 || selectedServices.length > 0 || selectedIndustries.length > 0 || searchText !== '';

  const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-medium shadow-lg">
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
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category and Featured Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            {item.category.replace('-', ' ')}
          </span>
          {item.featured && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-primary" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-primary" />
            <span className="font-medium">{item.timeline}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-primary" />
            <span className="font-medium">{item.teamSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="font-medium">{item.results.length} results</span>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-6">
          {item.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/portfolios/${item.id}`}>
            <Button variant="secondary" className="text-sm px-3 py-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          {item.liveUrl && (
            <Link href={item.liveUrl} target="_blank">
              <Button variant="gradient-outline" className="text-sm px-3 py-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className={`relative py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        {title && (
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        )}

        {/* Search Bar */}
        {showFilters && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects by title, description, or technology..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
              />
              {searchText && (
                <Button
                  onClick={() => setSearchText('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  variant="tertiary"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Filter Categories */}
        {showFilters && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* By Persona Dropdown */}
              <div className="relative" data-dropdown="persona">
                <motion.button
                  onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                  className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border rounded-xl text-foreground hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">By Persona</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${personaDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                
                {personaDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {personaOptions.map((persona) => (
                      <button
                        key={persona}
                        onClick={() => togglePersona(persona)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          selectedPersonas.includes(persona) ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                        }`}
                      >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm font-medium">{persona}</span>
                        {selectedPersonas.includes(persona) && (
                          <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* By Service Dropdown */}
              <div className="relative" data-dropdown="service">
                <motion.button
                  onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                  className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border rounded-xl text-foreground hover:border-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="font-medium">By Service</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                
                {serviceDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          selectedServices.includes(service) ? 'text-accent bg-accent/10' : 'text-muted-foreground'
                        }`}
                      >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm font-medium">{service}</span>
                        {selectedServices.includes(service) && (
                          <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* By Industry Dropdown */}
              <div className="relative" data-dropdown="industry">
                <motion.button
                  onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                  className="flex items-center gap-3 px-6 py-3 bg-card/50 border border-border rounded-xl text-foreground hover:border-secondary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Star className="w-4 h-4 text-secondary" />
                  <span className="font-medium">By Industry</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${industryDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                
                {industryDropdownOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg z-50 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {industryOptions.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => toggleIndustry(industry)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          selectedIndustries.includes(industry) ? 'text-secondary bg-secondary/10' : 'text-muted-foreground'
                        }`}
                      >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm font-medium">{industry}</span>
                        {selectedIndustries.includes(industry) && (
                          <div className="ml-auto w-2 h-2 bg-secondary rounded-full" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters */}
        {showFilters && hasActiveFilters && (
          <motion.div
            className="mb-8 p-4 bg-card/30 rounded-xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-foreground">Active filters:</span>
              
              {/* Search text filter tag */}
              {searchText && (
                <motion.div
                  className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search className="w-3 h-3" />
                  <span>"{searchText}"</span>
                  <Button
                    onClick={() => setSearchText('')}
                    className="hover:text-accent/70 transition-colors"
                    variant="tertiary"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              )}
              
              {/* Persona filter tags */}
              {selectedPersonas.map((persona) => (
                <motion.div
                  key={persona}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Persona: {persona}</span>
                  <Button
                    onClick={() => togglePersona(persona)}
                    className="hover:text-primary/70 transition-colors"
                    variant="tertiary"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}

              {/* Service filter tags */}
              {selectedServices.map((service) => (
                <motion.div
                  key={service}
                  className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Service: {service}</span>
                  <Button
                    onClick={() => toggleService(service)}
                    className="hover:text-accent/70 transition-colors"
                    variant="tertiary"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}

              {/* Industry filter tags */}
              {selectedIndustries.map((industry) => (
                <motion.div
                  key={industry}
                  className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Industry: {industry}</span>
                  <Button
                    onClick={() => toggleIndustry(industry)}
                    className="hover:text-secondary/70 transition-colors"
                    variant="tertiary"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
              
              {/* Clear all button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-3 py-1 bg-muted/10 text-muted-foreground hover:text-foreground rounded-lg text-sm transition-colors"
                  variant="tertiary"
                >
                  <X className="w-3 h-3" />
                  <span>Clear all</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        {showFilters && (
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.length > 0 ? (
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-medium">{Math.min(filteredProjects.length, maxItems)}</span> of <span className="text-foreground font-medium">{filteredProjects.length}</span> projects
              </p>
            ) : (
              <div className="py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-300"
                    variant="tertiary"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all filters</span>
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/portfolios">
              <Button className="flex items-center gap-3 px-8 py-3">
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
} 