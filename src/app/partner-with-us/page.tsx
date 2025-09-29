'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Handshake,
  Users,
  Rocket,
  Shield,
  ChevronDown,
  ExternalLink,
  Star,
  Clock,
  MessageCircle,
  Sparkles,
  Building,
  TrendingUp,
  Heart,
  Send,
  Phone,
  Mail,
  Calendar,
  Quote,
} from 'lucide-react';
import PartnerForm from "@/components/sections/PartnerForm";
import ProcessOverview, { ProcessStep } from "@/components/sections/ProcessOverview";
import Button from "@/components/ui/Button";
import SimpleCard from "@/components/ui/SimpleCard";

export default function CollaboratePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll();
  
  // Partnership-themed parallax patterns
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

  // Partnership benefits data
  const partnershipBenefits = [
    {
      title: 'White-Label Development',
      description: 'We build under your brand. Your clients never know we exist.',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-primary to-secondary',
      stats: '100% Confidential'
    },
    {
      title: 'Reliable Delivery',
      description: 'Fixed timelines, transparent progress, no surprises.',
      icon: <Clock className="w-8 h-8" />,
      color: 'from-accent to-green-400',
      stats: '98% On-Time Delivery'
    },
    {
      title: 'Technical Excellence',
      description: 'Clean, scalable code that your clients will love maintaining.',
      icon: <Star className="w-8 h-8" />,
      color: 'from-secondary to-pink-400',
      stats: 'Enterprise Quality'
    },
    {
      title: 'Scalable Partnership',
      description: 'From single projects to ongoing development partnerships.',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-orange-400 to-red-500',
      stats: 'Grow Together'
    }
  ];

  // Partnership process steps for Timeline
  const partnershipSteps: ProcessStep[] = [
    {
      id: '1',
      title: 'Discovery Call',
      subtitle: 'We learn about your agency',
      description: 'We learn about your agency, clients, and partnership goals.',
      icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
      duration: '30 mins',
      deliverables: ['Understand your needs', 'Discuss partnership fit'],
      color: 'text-blue-500',
    },
    {
      id: '2',
      title: 'Pilot Project',
      subtitle: 'Test our collaboration',
      description: 'Start with a small project to test our collaboration style.',
      icon: <Rocket className="w-8 h-8 text-cyan-500" />,
      duration: '2-4 weeks',
      deliverables: ['Pilot delivery', 'Transparent communication'],
      color: 'text-cyan-500',
    },
    {
      id: '3',
      title: 'Partnership Agreement',
      subtitle: 'Formalize our relationship',
      description: 'Formalize terms, pricing, and communication protocols.',
      icon: <Handshake className="w-8 h-8 text-green-500" />,
      duration: '1 week',
      deliverables: ['Signed agreement', 'Clear terms & pricing'],
      color: 'text-green-500',
    },
    {
      id: '4',
      title: 'Ongoing Collaboration',
      subtitle: 'Grow together',
      description: 'Regular projects, priority support, and growth together.',
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      duration: 'Long-term',
      deliverables: ['Priority support', 'Long-term growth'],
      color: 'text-pink-500',
    },
  ];

  // Testimonials from partner agencies
  const testimonials = [
    {
      quote: "Delpat has become our secret weapon. Our clients get enterprise-quality development while we focus on what we do best - design and strategy.",
      author: "Sarah Chen",
      role: "Creative Director",
      company: "Pixel Perfect Studio",
      projects: "12+ projects together"
    },
    {
      quote: "The white-label approach is flawless. Our clients think we have a team of 20 developers when it's just us + Delpat behind the scenes.",
      author: "Marcus Rodriguez",
      role: "Founder",
      company: "Brand Builders Agency",
      projects: "8-month partnership"
    }
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Partnership-themed Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Partnership connection shapes */}
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
        
        {/* Connection grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_4px_4px,rgba(var(--secondary-rgb),0.03)_4px,transparent_0)] bg-[size:100px_100px]" />
        
        {/* Interactive partnership cursor */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-secondary/6 to-primary/6 rounded-full blur-3xl pointer-events-none"
          animate={shouldReduceMotion ? undefined : {
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
            scale: [1, 1.1, 1]
          }}
          transition={shouldReduceMotion ? undefined : {
            x: { type: "spring", stiffness: 20, damping: 30 },
            y: { type: "spring", stiffness: 20, damping: 30 },
            scale: {
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }
          }}
        />
      </div>

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Floating partnership icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-20 -left-20 text-secondary/40"
                animate={shouldReduceMotion ? undefined : {
                  y: [0, -30, 0],
                  rotate: [0, 15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={shouldReduceMotion ? undefined : {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Handshake className="w-24 h-24" />
              </motion.div>
              <motion.div
                className="absolute -top-16 -right-24 text-primary/40"
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
                <Users className="w-20 h-20" />
              </motion.div>
              <motion.div
                className="absolute -bottom-12 left-1/4 text-accent/40"
                animate={shouldReduceMotion ? undefined : {
                  y: [0, -20, 0],
                  rotate: [0, 20, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={shouldReduceMotion ? undefined : {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <Building className="w-18 h-18" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Become a</span>
              <motion.span 
                className="block bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.5 }}
              >
                Delpat
              </motion.span>
              <span className="block text-foreground">Execution Partner.</span>
            </motion.h1>

            {/* Partnership tagline */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }}
            >
              For agencies & studios: Do you design, but don&apos;t build? We provide 
              reliable, white-label development services that make you look amazing.
            </motion.p>

            {/* Quick CTA */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, delay: 1.0 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={shouldReduceMotion ? undefined : { y: [0, 12, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 2.5, repeat: Infinity }}
              >
                <span className="text-sm">Discover partnership benefits</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PARTNERSHIP BENEFITS SECTION */}
      <section id="benefits" className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Partnership Benefits
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Why Agencies
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Choose Us
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We become your invisible development team, delivering quality work that 
              enhances your reputation and grows your business.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <SimpleCard key={index} className="flex flex-col gap-4 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent mb-2 text-white">
                  {benefit.icon}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">
                      {benefit.title}
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {benefit.stats}
                    </span>
                  </div>
                <p className="text-muted-foreground leading-relaxed mb-2">
                    {benefit.description}
                  </p>
              </SimpleCard>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP PROCESS SECTION (reusing Timeline) */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <ProcessOverview
            steps={partnershipSteps}
            title="How We Partner: Our 4-Step Agency Process"
            subtitle="A simple, transparent process to start and scale our partnership."
          />
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        {/* Decorative background for visual engagement */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(var(--accent-rgb),0.08),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(var(--primary-rgb),0.06),transparent_40%)]" />
          <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,transparent,rgba(var(--border-rgb),0.4),transparent)] [mask-image:radial-gradient(closest-side,black,transparent)]" />
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Star className="w-4 h-4" />
              Partner Success Stories
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              What Our
              <span className="block bg-gradient-to-r from-accent to-green-400 bg-clip-text text-transparent">
                Partners Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real feedback from agencies and studios we&apos;ve partnered with.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <SimpleCard key={index} className="relative overflow-hidden flex flex-col gap-5 h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Stylized quotation mark icon */}
                <div className="pointer-events-none absolute -top-3 -left-3 text-accent/20">
                  <Quote className="w-28 h-28" />
                </div>

                {/* Soft gradient glow on hover */}
                <div className="absolute -inset-12 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" aria-hidden />

                <div className="relative z-10 mb-4">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed">
                    “{testimonial.quote}”
                  </blockquote>
                </div>

                <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm font-medium text-primary">{testimonial.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {testimonial.projects}
                    </div>
                  </div>
                </div>
              </SimpleCard>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP FORM SECTION */}
      <section id="partnership-form" className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Send className="w-4 h-4" />
              <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Start a Partnership</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="">Let&apos;s</span>
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Collaborate
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us about your agency and let&apos;s discuss how we can grow together.
            </p>
          </motion.div>

          {/* Partnership Form (Reusable) */}
          <PartnerForm />
        </div>
      </section>

      {/* QUICK CONTACT SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Prefer a Quick Chat?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a 15-minute discovery call to discuss your partnership needs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+919876543210">
                <Button variant="secondary" className="flex items-center gap-2 px-6 py-3">
                <Phone className="w-4 h-4" />
                +91 98765 43210
                </Button>
              </a>
              <a href="mailto:partnerships@delpat.in">
                <Button variant="secondary" className="flex items-center gap-2 px-6 py-3">
                <Mail className="w-4 h-4" />
                partnerships@delpat.in
                </Button>
              </a>
              <a href="https://calendly.com/delpat/partnership-call" target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2 px-6 py-3">
                <Calendar className="w-4 h-4" />
                Book Discovery Call
                <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
