'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageBackdrop from '@/components/ui/PageBackdrop';
import {
  Calendar,
  ArrowRight,
  Clock,
  FileText,
  Handshake,
  Mail,
  ShieldCheck
} from 'lucide-react';
import ContactForm from '@/components/sections/ContactForm';
import CalendlyEmbed from '@/components/sections/CalendlyEmbed';
import ContactQualificationQuiz from '@/components/sections/ContactQualificationQuiz';
import Modal from '@/components/ui/Modal';
import { API_CONFIG } from '@/lib/api-client';

export default function ContactPage() {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  // Deterministic first paint: motion only after mount, so SSR and client markup match.
  const shouldReduceMotion = !hasMounted || Boolean(prefersReducedMotion);

  // Handle URL parameters for auto-selection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const goal = urlParams.get('goal');
    const tier = urlParams.get('tier');

    if (goal) {
      setSelectedGoal(goal);
    }
    if (tier) {
      setSelectedTier(tier);
    }
  }, []);

  // Handle anchor scrolling when page loads with hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      };

      if (hash === '#qualification') {
        // Clear it from URL
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        const handleScroll = () => scrollToId('qualification');
        setTimeout(handleScroll, 200);
        setTimeout(handleScroll, 500);
        setTimeout(handleScroll, 1000);
      }

      if (hash === '#contact-form') {
        // Clear hash from URL to avoid interfering with global scroll
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        const handleScroll = () => scrollToId('contact-form');
        setTimeout(handleScroll, 200);
        setTimeout(handleScroll, 500);
        setTimeout(handleScroll, 1000);
      }
    }
  }, []);

  // Choice-First Contact Section
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const fade = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  return (
    <main className="relative overflow-hidden">
      <PageBackdrop />

      {/* HERO */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs md:text-sm text-muted-foreground backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Free, no-pressure discovery call
          </motion.p>
          <motion.h1
            {...fade(0.1)}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Ready to bridge your{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              execution gap?
            </span>
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Tell us what you&apos;re trying to ship. We&apos;ll tell you honestly whether we&apos;re the right
            partner, and what it would take.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setIsCalendlyModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Book a discovery call
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#choose-method-section"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send a project brief
            </a>
          </motion.div>

          <ul className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
            {[
              ['Reply within 1 business day', Clock],
              ['Fixed scope and timeline', ShieldCheck],
              ['No obligation to proceed', Handshake],
            ].map(([label, Icon]) => {
              const I = Icon as typeof Clock;
              return (
                <li key={label as string} className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
                  <I className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{label as string}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* QUALIFICATION QUIZ SECTION */}
      <ContactQualificationQuiz
        selectedGoal={selectedGoal}
        onRecommendation={(serviceType, tier) => {
          setSelectedGoal(serviceType);
          setSelectedTier(tier);
        }}
      />

      {/* CHOICE-FIRST CONTACT SECTION */}
      <section id="choose-method-section" className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Choose your preferred method
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
            {/* Card A: Project Brief */}
            <motion.button
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex-1 p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-4 text-center shadow-sm hover:shadow-xl backdrop-blur-md overflow-hidden
                ${selectedMethod === 'form'
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border bg-card/60 text-foreground hover:border-primary/40 hover:bg-card/80'}
              `}
              onClick={() => setSelectedMethod(selectedMethod === 'form' ? null : 'form')}
              aria-pressed={selectedMethod === 'form'}
              type="button"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(120px 120px at top right, var(--primary)/12, transparent 70%)'
              }} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${selectedMethod === 'form' ? 'bg-primary/20' : 'bg-muted/40'} `}>
                <FileText className={`w-7 h-7 ${selectedMethod === 'form' ? 'text-primary' : 'text-foreground'}`} />
              </div>

              <span className="text-2xl font-bold">Fill Out Project Brief</span>
              <span className="text-base text-muted-foreground max-w-md">For those who have their thoughts organized and prefer to write.</span>

              {/* Bottom bar accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            {/* Card B: Discovery Call */}
            <motion.button
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex-1 p-6 md:p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-4 text-center shadow-sm hover:shadow-xl backdrop-blur-md overflow-hidden
                ${selectedMethod === 'call'
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border bg-card/60 text-foreground hover:border-primary/40 hover:bg-card/80'}
              `}
              onClick={() => setSelectedMethod(selectedMethod === 'call' ? null : 'call')}
              aria-pressed={selectedMethod === 'call'}
              type="button"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'radial-gradient(120px 120px at top right, var(--primary)/12, transparent 70%)'
              }} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${selectedMethod === 'call' ? 'bg-primary/20' : 'bg-muted/40'} `}>
                <Calendar className={`w-7 h-7 ${selectedMethod === 'call' ? 'text-primary' : 'text-foreground'}`} />
              </div>

              <span className="text-2xl font-bold">Book a Discovery Call</span>
              <span className="text-base text-muted-foreground max-w-md">For those who prefer to talk through their ideas live.</span>

              {/* Bottom bar accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
          {/* Reveal Form or Calendar */}
          <div className="transition-all duration-500">
            {selectedMethod === 'form' && (
              <div className="overflow-hidden animate-fade-in-up">
                <ContactForm selectedGoal={selectedGoal} selectedTier={selectedTier} />
              </div>
            )}
            {selectedMethod === 'call' && (
              <div className="overflow-hidden animate-fade-in-up">
                <CalendlyEmbed
                  url={`https://calendar.app.google/EcquL1pfD3PBvicq8?utm_source=website&utm_medium=contact&utm_content=goal_${selectedGoal || 'unknown'}`}
                  variant="full"
                  width="100%"
                  inModal={false}
                  enableScroll={true}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Calendly Modal (keep for header button) */}
      <Modal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
        title="Book Your Discovery Call"
        size="xl"
      >
        <div className="p-4 modal h-full">
          <CalendlyEmbed
            url={`https://calendar.app.google/EcquL1pfD3PBvicq8?utm_source=website&utm_medium=contact_modal&utm_content=goal_${selectedGoal || 'unknown'}`}
            variant="full"
            width="100%"
            inModal={true}
            enableScroll={true}
          />
        </div>
      </Modal>
    </main>
  );
}
