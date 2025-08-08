import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react';
import { Testimonial } from '@/types';
import { PortfolioItem } from '@/data/portfolio-types';
import { portfolioItems } from '@/data/portfolio-data';
import Button from '@/components/ui/Button';

interface EnhancedTestimonial extends Testimonial {
  projectTitle?: string;
  projectId?: string;
  metrics?: string[];
  serviceTrack?: string;
  headlineMetric?: {
    value: string;
    label: string;
    icon: string;
  };
}

export interface EnhancedTestimonialsCarouselProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

function extractEnhancedTestimonials(): EnhancedTestimonial[] {
  const enhancedTestimonials: EnhancedTestimonial[] = [];
  
  // Filter projects that have client quotes and are publicly usable
  const projectsWithQuotes = portfolioItems.filter(item => 
    item.outcome.clientQuote && 
    item.client.publiclyUsable
  );
  
  // Convert portfolio items to enhanced testimonials
  projectsWithQuotes.forEach(item => {
    if (item.outcome.clientQuote) {
      const { text, attribution } = item.outcome.clientQuote;
      
      // Parse attribution to extract name and role/company
      const attributionParts = attribution.split(',');
      const author = attributionParts[0]?.trim() || 'Client';
      const role = attributionParts.slice(1).join(',').trim() || item.client.name;
      
      enhancedTestimonials.push({
        quote: text,
        author,
        role,
        avatar: author.split(' ').map(n => n[0]).join('').toUpperCase(),
        projectTitle: item.cardTitle,
        projectId: item.id,
        metrics: item.outcome.otherMetrics || [],
        serviceTrack: item.meta.serviceTrack,
        headlineMetric: item.outcome.headlineMetric
      });
    }
  });
  
  return enhancedTestimonials;
}

export default function EnhancedTestimonialsCarousel({
  testimonials,
  title = "Client Success Stories",
  subtitle = "Real results from real projects",
  autoplay = true,
  autoplayDelay = 6000
}: EnhancedTestimonialsCarouselProps): React.ReactElement {
  const enhancedTestimonials = testimonials ? 
    testimonials.map(t => ({ ...t, projectTitle: undefined, projectId: undefined, metrics: [], serviceTrack: undefined, headlineMetric: undefined })) :
    extractEnhancedTestimonials();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying && enhancedTestimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % enhancedTestimonials.length);
      }, autoplayDelay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, enhancedTestimonials.length, autoplayDelay]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % enhancedTestimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + enhancedTestimonials.length) % enhancedTestimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = enhancedTestimonials[currentIndex];

  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">{title.split(' ').slice(0, -1).join(' ')}</span>{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {title.split(' ').slice(-1)[0]}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

                 {/* Main Carousel */}
         <div className="relative">
           {/* Navigation Buttons - Outside Card */}
           <button
             onClick={goToPrevious}
             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
             aria-label="Previous testimonial"
           >
             <ChevronLeft className="w-6 h-6 text-foreground" />
           </button>

           <button
             onClick={goToNext}
             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
             aria-label="Next testimonial"
           >
             <ChevronRight className="w-6 h-6 text-foreground" />
           </button>

           {/* Testimonial Card */}
           <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl mx-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                {/* Left Column - Quote */}
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {currentTestimonial.avatar}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{currentTestimonial.author}</p>
                      <p className="text-muted-foreground">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Project Context */}
                <div className="space-y-6">
                  {/* Project Title */}
                  {currentTestimonial.projectTitle && (
                    <div className="p-6 bg-muted/50 rounded-2xl border border-border">
                      <h3 className="text-lg font-semibold text-foreground mb-2">Project</h3>
                      <p className="text-muted-foreground">{currentTestimonial.projectTitle}</p>
                      {currentTestimonial.serviceTrack && (
                        <div className="mt-3">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                            {currentTestimonial.serviceTrack}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Headline Metric */}
                  {currentTestimonial.headlineMetric && (
                    <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {currentTestimonial.headlineMetric.value}
                        </div>
                        <div className="text-muted-foreground">
                          {currentTestimonial.headlineMetric.label}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Metrics */}
                  {currentTestimonial.metrics && currentTestimonial.metrics.length > 0 && (
                    <div className="space-y-3">
                      {currentTestimonial.metrics.slice(0, 3).map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {enhancedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">
              {enhancedTestimonials.length}+
            </div>
            <div className="text-muted-foreground">Success Stories</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-3xl font-bold text-secondary mb-2">100%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-xl">
            <div className="text-3xl font-bold text-accent mb-2">5-8</div>
            <div className="text-muted-foreground">Weeks Delivery</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
