'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Search,
  X,
  Filter,
  Users,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { portfolioItems, type PortfolioItem } from '@/data/portfolio-data';
import { PortfolioShowcaseProps } from '@/types/sections';
import PortfolioCard from './PortfolioCard';


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
  const personaOptions = ['Ankit', 'Priya', 'Karan', 'Mixed'];
  const serviceOptions = ['Product MVP', 'Internal OS', 'Automation MVP', 'Custom', 'R&D'];
  const industryOptions = ['SaaS', 'E-commerce', 'Health-tech', 'Fintech', 'EdTech'];
  
  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = portfolioItems;
    
    // Persona filter
    if (selectedPersonas.length > 0) {
      filtered = filtered.filter(project => {
        return selectedPersonas.includes(project.meta.persona);
      });
    }
    
    // Service filter
    if (selectedServices.length > 0) {
      filtered = filtered.filter(project => {
        return selectedServices.includes(project.meta.serviceTrack);
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
        project.cardTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        project.story.problem.toLowerCase().includes(searchText.toLowerCase()) ||
        project.execution.coreMandate.toLowerCase().includes(searchText.toLowerCase()) ||
        project.client.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (project.meta.tags && project.meta.tags.some((tag: string) => tag.toLowerCase().includes(searchText.toLowerCase()))) ||
        (project.techStack.frontend && project.techStack.frontend.some(tech => tech.toLowerCase().includes(searchText.toLowerCase()))) ||
        (project.techStack.backend && project.techStack.backend.some(tech => tech.toLowerCase().includes(searchText.toLowerCase())))
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
  
  // Helper function to map projects to industries
  const getProjectIndustries = (project: PortfolioItem): string[] => {
    const industries: string[] = [];
    
    // Map based on project characteristics
    if (project.cardTitle.toLowerCase().includes('crm') || project.cardTitle.toLowerCase().includes('saas') || project.cardTitle.toLowerCase().includes('platform')) {
      industries.push('SaaS');
    }
    if (project.cardTitle.toLowerCase().includes('food') || project.cardTitle.toLowerCase().includes('delivery') || project.cardTitle.toLowerCase().includes('e-commerce')) {
      industries.push('E-commerce');
    }
    if (project.cardTitle.toLowerCase().includes('health') || project.cardTitle.toLowerCase().includes('medical') || project.cardTitle.toLowerCase().includes('wellness')) {
      industries.push('Health-tech');
    }
    if (project.cardTitle.toLowerCase().includes('forex') || project.cardTitle.toLowerCase().includes('trading') || project.cardTitle.toLowerCase().includes('finance')) {
      industries.push('Fintech');
    }
    if (project.cardTitle.toLowerCase().includes('cat') || project.cardTitle.toLowerCase().includes('education') || project.cardTitle.toLowerCase().includes('prep')) {
      industries.push('EdTech');
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

    const PortfolioCardWrapper = ({ item }: { item: PortfolioItem }) => (
    <PortfolioCard item={item} />
  );

  const mobileCarouselRef = React.useRef<HTMLDivElement | null>(null);

  const scrollMobile = (direction: 'left' | 'right') => {
    const container = mobileCarouselRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

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
                  <span>&quot;{searchText}&quot;</span>
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
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
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

        {/* Portfolio Grid - Mobile Carousel */}
        <div className="relative md:hidden mb-12">
          <div
            ref={mobileCarouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 -mx-1 py-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {displayedProjects.map((item) => (
              <motion.div
                key={item.id}
                className="relative snap-center shrink-0 w-[90vw] max-w-xs p-2 rounded-2xl flex flex-col mx-1 mt-4 min-h-[520px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <PortfolioCardWrapper item={item} />
              </motion.div>
            ))}
          </div>
          {/* Mobile nav arrows */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollMobile('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 border border-border flex items-center justify-center shadow backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollMobile('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 border border-border flex items-center justify-center shadow backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Portfolio Grid - Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {displayedProjects.map((item, index) => (
            <motion.div
              key={item.id}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PortfolioCardWrapper item={item} />
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