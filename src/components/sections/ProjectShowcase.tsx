import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Settings, Layers, CheckCircle, Quote, Calendar, ExternalLink, Camera } from 'lucide-react';
import { Project, ProjectShowcaseProps } from '@/types';

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, filterOptions }) => {
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    const filtered = projects.filter(project => {
      const personaMatch = selectedPersona === 'all' || project.persona === selectedPersona;
      const serviceMatch = selectedService === 'all' || project.service === selectedService;
      const industryMatch = selectedIndustry === 'all' || project.industry === selectedIndustry;
      return personaMatch && serviceMatch && industryMatch;
    });
    setFilteredProjects(filtered);
  }, [selectedPersona, selectedService, selectedIndustry, projects]);

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
            Project <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Showcase</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Filter by persona, tech stack, or pain point solved to find projects similar to yours.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Persona Filter */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                By Persona
              </h3>
              <div className="flex flex-wrap gap-3">
                {filterOptions.personas.map((persona) => (
                  <motion.button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selectedPersona === persona.id
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
            </div>

            {/* Service Filter */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                By Service
              </h3>
              <div className="flex flex-wrap gap-3">
                {filterOptions.services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selectedService === service.id
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
            </div>

            {/* Industry Filter */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                By Industry
              </h3>
              <div className="flex flex-wrap gap-3">
                {filterOptions.industries.map((industry) => (
                  <motion.button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                      selectedIndustry === industry.id
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
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative p-6 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Project Image */}
              <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 h-48 flex items-center justify-center">
                <div className="text-primary/50">
                  <Camera className="w-16 h-16" />
                </div>
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
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  {project.results.map((result: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">{result}</span>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
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
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.timeline}
                    </div>
                  </div>
                  <Link href={`/case-study/${project.id}`}>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm font-medium">View Case</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show all projects CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            onClick={() => {
              setSelectedPersona('all');
              setSelectedService('all');
              setSelectedIndustry('all');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card/50 hover:bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Show All Projects</span>
            <Layers className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
