import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, CheckCircle, Star, MessageCircle, Clock, ArrowRight, Home, Search, X, Filter } from 'react-feather';
import { Project, ProjectShowcaseProps } from '@/types';
import SimpleCard from '@/components/ui/SimpleCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, filterOptions }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // Multi-select toggle functions
  const togglePersona = (personaId: string) => {
    setSelectedPersonas(prev => 
      prev.includes(personaId) 
        ? prev.filter(id => id !== personaId)
        : [...prev, personaId]
    );
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industryId) 
        ? prev.filter(id => id !== industryId)
        : [...prev, industryId]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedPersonas([]);
    setSelectedServices([]);
    setSelectedIndustries([]);
    setSearchText('');
  };

  // Remove individual filter
  const removeFilter = (type: 'persona' | 'service' | 'industry', value: string) => {
    switch (type) {
      case 'persona':
        setSelectedPersonas(prev => prev.filter(id => id !== value));
        break;
      case 'service':
        setSelectedServices(prev => prev.filter(id => id !== value));
        break;
      case 'industry':
        setSelectedIndustries(prev => prev.filter(id => id !== value));
        break;
    }
  };

  // Get label for filter value
  const getFilterLabel = (type: 'persona' | 'service' | 'industry', value: string) => {
    switch (type) {
      case 'persona':
        return filterOptions.personas.find(p => p.id === value)?.label || value;
      case 'service':
        return filterOptions.services.find(s => s.id === value)?.label || value;
      case 'industry':
        return filterOptions.industries.find(i => i.id === value)?.label || value;
    }
  };

  // Filter projects based on all criteria
  useEffect(() => {
    const filtered = projects.filter(project => {
      // Persona filter (multi-select)
      const personaMatch = selectedPersonas.length === 0 || selectedPersonas.includes(project.persona);
      
      // Service filter (multi-select)
      const serviceMatch = selectedServices.length === 0 || selectedServices.includes(project.service);
      
      // Industry filter (multi-select)
      const industryMatch = selectedIndustries.length === 0 || selectedIndustries.includes(project.industry);
      
      // Text search filter
      const searchMatch = searchText === '' || 
        project.title.toLowerCase().includes(searchText.toLowerCase()) ||
        project.description.toLowerCase().includes(searchText.toLowerCase());
      
      return personaMatch && serviceMatch && industryMatch && searchMatch;
    });
    setFilteredProjects(filtered);
  }, [selectedPersonas, selectedServices, selectedIndustries, searchText, projects]);

  // Check if any filters are active
  const hasActiveFilters = selectedPersonas.length > 0 || selectedServices.length > 0 || selectedIndustries.length > 0 || searchText !== '';

  // Get all active filters for tag display
  const getActiveFilters = () => {
    const filters: { type: 'persona' | 'service' | 'industry'; value: string; label: string }[] = [];
    selectedPersonas.forEach(id => filters.push({ type: 'persona' as const, value: id, label: getFilterLabel('persona', id) }));
    selectedServices.forEach(id => filters.push({ type: 'service' as const, value: id, label: getFilterLabel('service', id) }));
    selectedIndustries.forEach(id => filters.push({ type: 'industry' as const, value: id, label: getFilterLabel('industry', id) }));
    return filters;
  };

  return (
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
            Filter by persona, tech stack, or pain point solved to find projects similar to yours.
          </p>
        </motion.div>

        {/* Search Bar */}
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
              placeholder="Search projects by title or description..."
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

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Persona Filter */}
            <fieldset className="flex-1 bg-card/30 rounded-xl p-6 border border-border">
              <legend className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                By Persona
                {selectedPersonas.length > 0 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {selectedPersonas.length}
                  </span>
                )}
              </legend>
              <div className="flex flex-wrap gap-3">
                {filterOptions.personas.map((persona) => (
                  <motion.button
                    key={persona.id}
                    onClick={() => togglePersona(persona.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selectedPersonas.includes(persona.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {persona.icon}
                    <span className="text-sm font-medium">{persona.label}</span>
                  </motion.button>
                ))}
              </div>
            </fieldset>

            {/* Service Filter */}
            <fieldset className="flex-1 bg-card/30 rounded-xl p-6 border border-border">
              <legend className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                By Service
                {selectedServices.length > 0 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {selectedServices.length}
                  </span>
                )}
              </legend>
              <div className="flex flex-wrap gap-3">
                {filterOptions.services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selectedServices.includes(service.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {service.icon}
                    <span className="text-sm font-medium">{service.label}</span>
                  </motion.button>
                ))}
              </div>
            </fieldset>

            {/* Industry Filter */}
            <fieldset className="flex-1 bg-card/30 rounded-xl p-6 border border-border">
              <legend className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                By Industry
                {selectedIndustries.length > 0 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {selectedIndustries.length}
                  </span>
                )}
              </legend>
              <div className="flex flex-wrap gap-3">
                {filterOptions.industries.map((industry) => (
                  <motion.button
                    key={industry.id}
                    onClick={() => toggleIndustry(industry.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selectedIndustries.includes(industry.id)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {industry.icon}
                    <span className="text-sm font-medium">{industry.label}</span>
                  </motion.button>
                ))}
              </div>
            </fieldset>
          </div>
        </motion.div>

        {/* Active Filters and Clear All */}
        {hasActiveFilters && (
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
              
              {/* Other filter tags */}
              {getActiveFilters().map((filter) => (
                <motion.div
                  key={`${filter.type}-${filter.value}`}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{filter.label}</span>
                  <Button
                    onClick={() => removeFilter(filter.type, filter.value)}
                    className="hover:text-primary/70 transition-colors"
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

        {/* Results count and status */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.length > 0 ? (
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredProjects.length}</span> of <span className="text-foreground font-medium">{projects.length}</span> projects
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

        {/* Project Grid */}
        {filteredProjects.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <SimpleCard className="h-full flex flex-col">
                  <div className="space-y-4">
                    {/* Project Image */}
                    <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 h-48 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} project`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-primary/50">
                          
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {project.tech.slice(0, 2).map((tech: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-black/20 backdrop-blur-sm rounded-lg text-xs text-white">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="px-2">
                      <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>
                    
                    {/* Results */}
                    <div className="space-y-2 px-2">
                      {project.results.map((result: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Testimonial */}
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl mx-2">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground italic mb-2">
                            {project.testimonial}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            — {project.client}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border mt-auto px-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {project.timeline}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.hasCaseStudy && (
                          <Link href={`/case-studies/${project.id}`}>
                            <motion.button
                              className="flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-xs"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="font-medium">View Case Study</span>
                              <ArrowRight className="w-3 h-3" />
                            </motion.button>
                          </Link>
                        )}
                        
                        {project.serviceId && (
                          <Link href={`/what-we-do/${project.serviceId}`}>
                            <motion.button
                              className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors text-xs"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="font-medium">Get This Service</span>
                              <ArrowRight className="w-3 h-3" />
                            </motion.button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </SimpleCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Show all projects CTA - only show if filters are active */}
        {hasActiveFilters && filteredProjects.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-card/50 hover:bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Show All Projects</span>
              <Star className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectShowcase;