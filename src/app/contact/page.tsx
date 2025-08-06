'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Calendar,
  ArrowRight,
  FileText
} from 'lucide-react';
import ContactForm from '@/components/sections/ContactForm';
import CalendlyEmbed from '@/components/sections/CalendlyEmbed';
import ContactQualificationQuiz from '@/components/sections/ContactQualificationQuiz';
import Modal from '@/components/ui/Modal';


export default function ContactPage() {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
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
      if (hash === '#qualification') {
        // Store the hash and clear it from URL
        const originalHash = window.location.hash;
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        
        // Wait for the page to be fully loaded and rendered
        const handleScroll = () => {
          const element = document.getElementById('qualification');
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        };
        
        // Try multiple times to ensure the element is rendered
        setTimeout(handleScroll, 200);
        setTimeout(handleScroll, 500);
        setTimeout(handleScroll, 1000);
      }
    }
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
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
                Book Free Discovery Call
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

      {/* DETAILED CONTACT FORM SECTION */}
      <section id="contact-form" className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.2 }}
            >
              <FileText className="w-4 h-4" />
              Project Details
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tell Us About
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Project
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The more details you share, the better we can help you succeed.
            </p>
          </motion.div>
          
          {/* Contact Form & Calendar Side by Side */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-3/5">
              <CalendlyEmbed url="https://calendly.com/kaushikiagrawal283/30min" variant="full" width="90%" inModal={false} />
            </div>
            <div className="w-full lg:w-2/5">
              <div className="flex items-center justify-center min-h-[900px]">
                <ContactForm 
                  selectedGoal={selectedGoal}
                  selectedTier={selectedTier}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Modal */}
      <Modal
        isOpen={isCalendlyModalOpen}
        onClose={() => setIsCalendlyModalOpen(false)}
        title="Book Your Discovery Call"
        size="xl"
      >
        <div className="p-4 modal h-full">
          <CalendlyEmbed 
            url="https://calendly.com/kaushikiagrawal283/30min" 
            variant="full" 
            width="100%"
            inModal={true}
          />
        </div>
      </Modal>
    </main>
  );
}
