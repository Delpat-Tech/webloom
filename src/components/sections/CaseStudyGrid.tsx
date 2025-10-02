import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Settings,
  TrendingUp,
  Eye,
  ArrowRight,
  ExternalLink,
  Globe,
  Smartphone,
  Palette,
  Database,
  Briefcase,
  Code,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getFeaturedCaseStudies, getCaseStudyById, CaseStudy } from "@/data/case-studies";
import React from "react";

interface CaseStudyGridProps {
  featuredIds?: string[];
}

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ featuredIds }) => {
  let caseStudies: CaseStudy[];
  if (featuredIds && featuredIds.length > 0) {
    caseStudies = featuredIds
      .map(id => getCaseStudyById(id))
      .filter((study): study is CaseStudy => study !== undefined);
  } else {
    caseStudies = getFeaturedCaseStudies().slice(0, 3);
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product-mvp': return <Rocket className="w-4 h-4 text-primary" />;
      case 'internal-os': return <Settings className="w-4 h-4 text-primary" />;
      case 'automation-mvp': return <Zap className="w-4 h-4 text-primary" />;
      case 'custom': return <Code className="w-4 h-4 text-primary" />;
      case 'r&d': return <Database className="w-4 h-4 text-primary" />;
      default: return <Briefcase className="w-4 h-4 text-primary" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'product-mvp': return 'Product MVP';
      case 'internal-os': return 'Internal OS';
      case 'automation-mvp': return 'Automation MVP';
      case 'custom': return 'Custom';
      case 'r&d': return 'R&D';
      default: return category.replace('-', ' ');
    }
  };

  const mobileCarouselRef = React.useRef<HTMLDivElement | null>(null);

  const scrollMobile = (direction: 'left' | 'right') => {
    const container = mobileCarouselRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.9;
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
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
            From Problem to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Outcome</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dive into our process, challenges faced, and measurable results
            achieved.
          </p>
        </motion.div>

        {/* Case Study Grid - Mobile Carousel */}
        <div className="relative md:hidden mb-12">
          <div
            ref={mobileCarouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 -mx-1"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                className="snap-center shrink-0 w-[90vw] max-w-xs p-2 rounded-2xl flex flex-col h-full mx-1 mt-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Link href={`/case-studies/${caseStudy.id}`}>
                  <div className="relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 h-full">
                    {/* Background Image */}
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                      <div className="text-primary/50 text-6xl font-bold">
                        {caseStudy.title.split(' ').map(word => word[0]).join('')}
                      </div>
                      {/* Case Study Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        Case Study
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Category Icon */}
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(caseStudy.category)}
                        <span className="text-sm text-muted-foreground">
                          {getCategoryName(caseStudy.category)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {caseStudy.subtitle}
                      </p>
                      {/* Challenge Preview */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Settings className="w-4 h-4 text-destructive" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">
                              The Challenge
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {caseStudy.challenge.substring(0, 80)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Settings className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">
                              Our Solution
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {caseStudy.solution.substring(0, 80)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">
                              The Outcome
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {caseStudy.results[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* View Case Study Button */}
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            <span>Full walkthrough</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                            <span className="text-sm font-medium">View Case</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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

        {/* Case Study Grid - Desktop/Tablet */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={`/case-studies/${caseStudy.id}`}>
                <div className="relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Background Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                    <div className="text-primary/50 text-6xl font-bold">
                      {caseStudy.title.split(' ').map(word => word[0]).join('')}
                    </div>
                    {/* Case Study Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Case Study
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Category Icon */}
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(caseStudy.category)}
                      <span className="text-sm text-muted-foreground">
                        {getCategoryName(caseStudy.category)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {caseStudy.subtitle}
                    </p>
                    {/* Challenge Preview */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Settings className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            The Challenge
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {caseStudy.challenge.substring(0, 80)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Settings className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            Our Solution
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {caseStudy.solution.substring(0, 80)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            The Outcome
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {caseStudy.results[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* View Case Study Button */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>Full walkthrough</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                          <span className="text-sm font-medium">View Case</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default CaseStudyGrid;
