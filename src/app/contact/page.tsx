'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Calendar,
  ArrowRight,
  FileText,
  Handshake,
  Mail
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
  const shouldReduceMotion = useReducedMotion();

  // Background motion like partner page
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 0.95, 0.85, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const scaleMotion = useTransform(scrollYProgress, [0, 1], [1.2, 0.8]);
  const translateYMotion = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

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

  return (
    <main className="relative overflow-hidden">
      {/* Partner-page style Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <motion.div
          className="absolute top-1/6 left-1/12 w-80 h-80 bg-gradient-to-r from-secondary/15 to-pink-400/15 rounded-full blur-3xl"
          style={{ translateY, scale, rotate }}
        />
        <motion.div
          className="absolute top-1/2 right-1/8 w-96 h-96 bg-gradient-to-r from-primary/12 to-secondary/12 rounded-full blur-3xl"
          style={{ opacity, scale: shouldReduceMotion ? 1 : scaleMotion }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-accent/10 to-green-400/10 rounded-full blur-3xl"
          style={{ translateY: shouldReduceMotion ? 0 : translateYMotion, scale }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_4px_4px,rgba(var(--secondary-rgb),0.03)_4px,transparent_0)] bg-[size:100px_100px]" />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-secondary/6 to-primary/6 rounded-full blur-3xl pointer-events-none"
          animate={shouldReduceMotion ? undefined : {
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
            scale: [1, 1.1, 1]
          }}
          transition={shouldReduceMotion ? undefined : {
            x: { type: 'spring', stiffness: 20, damping: 30 },
            y: { type: 'spring', stiffness: 20, damping: 30 },
            scale: { repeat: Infinity, duration: 5, ease: 'easeInOut' }
          }}
        />
      </div>

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Floating contact icons (customized) */}
          <div className="relative mb-8">
            <motion.div
              className="absolute -top-20 -left-20 text-primary/40"
              animate={shouldReduceMotion ? undefined : {
                y: [0, -30, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.08, 1]
              }}
              transition={shouldReduceMotion ? undefined : {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Calendar className="w-20 h-20" />
            </motion.div>
            <motion.div
              className="absolute -top-16 -right-24 text-accent/40"
              animate={shouldReduceMotion ? undefined : {
                y: [0, -25, 0],
                rotate: [0, -12, 0],
                scale: [1.1, 1, 1.1]
              }}
              transition={shouldReduceMotion ? undefined : {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }}
            >
              <Mail className="w-20 h-20" />
            </motion.div>
            <motion.div
              className="absolute -bottom-12 left-1/4 text-secondary/40"
              animate={shouldReduceMotion ? undefined : {
                y: [0, -20, 0],
                rotate: [0, 20, 0],
                scale: [1, 1.12, 1]
              }}
              transition={shouldReduceMotion ? undefined : {
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <Handshake className="w-18 h-18" />
            </motion.div>
          </div>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Ready to</span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.5 }}
              >
                Bridge Your
              </motion.span>
              <span className="block text-foreground text-4xl md:text-5xl lg:text-6xl">Execution Gap?</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }}
            >
              Book a free, no-pressure discovery call to see if we&apos;re the right
              partner for your project. We turn your ideas into reality.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.button
                onClick={() => setIsCalendlyModalOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
              >
                <Calendar className="w-5 h-5" />
                Book a Discovery Call
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
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
      <section id="choose-method-section" className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your Preferred Method
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
