'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  CheckCircle,
  Star,
  Code,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import { portfolioItems, type PortfolioItem } from '@/data/portfolio-data';

// Function to get project by ID
const getProjectById = (id: string): PortfolioItem | undefined => {
  return portfolioItems.find(item => item.id === id);
};

export default function PortfolioItemPage() {
  const params = useParams();
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  // Get portfolio data from centralized source
  const portfolioData = getProjectById(params.id as string);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-full break-words overflow-wrap">
          <h1 className="text-2xl font-bold mb-4 break-words max-w-full overflow-wrap">Project not found</h1>
        </div>
      </div>
    );
  }

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
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-w-0"
          >
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4 min-w-0">
                {(() => {
                  return (
                    <Globe className="w-5 h-5" />
                  );
                })()}
                <span className="text-sm text-muted-foreground capitalize truncate max-w-full break-words overflow-wrap">
                  {portfolioData.meta.serviceTrack}
                </span>
                {portfolioData.meta.featured && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs min-w-0">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight break-words max-w-full overflow-wrap">
                {(() => {
                  const titleParts = portfolioData.cardTitle.split(': ');
                  const mainTitle = titleParts[0];
                  return mainTitle;
                })()}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed break-words max-w-full overflow-wrap">
                {(() => {
                  const titleParts = portfolioData.cardTitle.split(': ');
                  const subTitle = titleParts[1] || portfolioData.story.problem;
                  return subTitle;
                })()}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 min-w-0">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2 min-w-0">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Persona</span>
                  </div>
                  <p className="text-lg font-bold text-foreground truncate max-w-full break-words overflow-wrap">
                    {portfolioData.meta.persona}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2 min-w-0">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Client</span>
                  </div>
                  <p className="text-lg font-bold text-foreground truncate max-w-full break-words overflow-wrap">
                    {portfolioData.client.name}
                  </p>
                </div>
                {/* Result info box removed */}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 min-w-0">
                {portfolioData.meta.links.live && (
                  <Link href={portfolioData.meta.links.live} target="_blank">
                    <Button className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </Button>
                  </Link>
                )}
                {portfolioData.meta.links.github && (
                  <Link href={portfolioData.meta.links.github} target="_blank">
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      View Code
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center min-w-0">
                <div className="text-primary/50 text-6xl font-bold truncate max-w-full break-words overflow-wrap">
                  {(() => {
                    const titleParts = portfolioData.cardTitle.split(': ');
                    // Take first letter of each word, max 3 letters
                    const shortForm = titleParts[0].split(' ').slice(0, 3).map(word => word[0]).join('');
                    return shortForm;
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TABS SECTION */}
      {/* ARCHIVED: Tab navigation and all tabbed content removed. See archive for code. */}
      {/*
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
      */}
      {/* MAIN CONTENT: Only Overview content remains */}
      <section className="relative px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-w-0"
          >
            {/* Challenge & Solution */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 break-words max-w-full overflow-wrap">
                  <Target className="w-6 h-6 text-primary" />
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed break-words max-w-full overflow-wrap">
                  {portfolioData.story.problem}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 break-words max-w-full overflow-wrap">
                  <Zap className="w-6 h-6 text-accent" />
                  Our Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed break-words max-w-full overflow-wrap">
                  {portfolioData.execution.coreMandate}
                </p>
              </div>
            </div>
            {/* Technologies & Results */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 break-words max-w-full overflow-wrap">
                  <Code className="w-6 h-6 text-primary" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 min-w-0">
                  {portfolioData.techStack.frontend && portfolioData.techStack.frontend.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium truncate max-w-full break-words overflow-wrap"
                    >
                      {tech}
                    </span>
                  ))}
                  {portfolioData.techStack.backend && portfolioData.techStack.backend.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium truncate max-w-full break-words overflow-wrap"
                    >
                      {tech}
                    </span>
                  ))}
                  {portfolioData.techStack.database && portfolioData.techStack.database.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium truncate max-w-full break-words overflow-wrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2 break-words max-w-full overflow-wrap">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  Key Results
                </h3>
                <div className="space-y-3">
                  {portfolioData.outcome.qualitativeWins.map((win, index) => (
                    <div key={index} className="flex items-center gap-3 min-w-0">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground truncate max-w-full break-words overflow-wrap">{win}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* END MAIN CONTENT */}

      {/* Optional Project Gallery */}
      {(portfolioData.hasGallery || (portfolioData.gallery && portfolioData.gallery.length > 0)) && (
        <section className="relative px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center break-words max-w-full overflow-wrap">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-w-0">
              {portfolioData.gallery && portfolioData.gallery.length > 0 ? (
                portfolioData.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center min-w-0">
                    <img src={img} alt={`Project Gallery Image ${idx + 1}`} className="object-cover w-full h-full max-w-full max-h-full" />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground break-words max-w-full overflow-wrap">No gallery images available.</div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Content Section */}
      {/* ARCHIVED: Related Content section removed. See archive for code. */}

      {/* Final CTA Section */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-t border-border mt-12">
        <div className="max-w-2xl mx-auto text-center break-words max-w-full overflow-wrap">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 break-words max-w-full overflow-wrap">Interested in a Similar Solution?</h2>
          <p className="text-lg text-muted-foreground mb-8 break-words max-w-full overflow-wrap">Let&apos;s discuss your project and see how we can deliver the same quality and results for you.</p>
          <Link href="/contact">
            <Button className="font-semibold px-8 py-4 text-lg truncate max-w-full break-words overflow-wrap">Book a Discovery Call</Button>
          </Link>
        </div>
      </section>
    </main>
  );
} 