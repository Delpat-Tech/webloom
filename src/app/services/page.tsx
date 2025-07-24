'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, 
  Settings, 
  Zap, 
  ArrowRight,
  Clock,
  CheckCircle,
  Target,
  Star,
  X,
  ChevronDown
} from 'lucide-react';
import ServiceCard from '@/components/sections/ServiceCard';
import AddOnsList from '@/components/sections/AddOnsList';
import Button from '@/components/ui/Button';

// Types
interface ServiceTrack {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  benefits: string[];
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  timeline: string;
  outcome: string;
}

export default function WhatWeDoPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceTrack | null>(null);
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const serviceTracks: ServiceTrack[] = [
    {
      id: 'mvp-engine',
      title: 'The MVP Engine',
      description: 'Go from idea to live product in 6 weeks. Fixed timeline, fixed cost, zero surprises.',
      startingPrice: '₹40,000',
      benefits: [
        'Deploy to production in 6 weeks',
        'Fixed scope, no surprises',
        'Ready for users and investors'
      ],
      icon: <Rocket className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Complete MVP development',
        'User authentication system',
        'Database design & setup',
        'API development',
        'Basic UI/UX design',
        'Deployment & hosting setup',
        'Testing & QA',
        '4 weeks post-launch support'
      ],
      timeline: '6 weeks',
      outcome: 'A fully functional MVP ready for real users and investor demos'
    },
    {
      id: 'internal-os',
      title: 'The Internal OS',
      description: 'Eliminate 20+ hours of manual work per week. Connect your systems, automate chaos.',
      startingPrice: '₹20,000',
      benefits: [
        'Custom dashboards and workflows',
        'API integrations that actually work',
        'Role-based access control'
      ],
      icon: <Settings className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500',
      features: [
        'Custom internal dashboards',
        'Workflow automation',
        'API integrations',
        'User role management',
        'Data synchronization',
        'Reporting & analytics',
        'Training & documentation',
        '6 weeks ongoing support'
      ],
      timeline: '4-5 weeks',
      outcome: 'Streamlined operations saving 20+ hours weekly'
    },
    {
      id: 'automation-mvp',
      title: 'The Automation MVP',
      description: 'Save $5k+ monthly in operational costs. AI-powered workflows that work 24/7.',
      startingPrice: '₹8,000',
      benefits: [
        'AI agents for data processing',
        'Complex n8n/Make.com pipelines',
        'Error handling and monitoring'
      ],
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'AI workflow automation',
        'Data processing pipelines',
        'Error handling & monitoring',
        'Integration with existing tools',
        'Performance optimization',
        'Automated reporting',
        'Alert systems',
        '3 months monitoring'
      ],
      timeline: '2-3 weeks',
      outcome: 'Automated workflows saving $5k+ monthly'
    }
  ];

  const CustomModal = ({ isOpen, onClose, service }: { isOpen: boolean; onClose: () => void; service: ServiceTrack | null }) => {
    if (!isOpen || !service) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${service.gradient} text-white`}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">Starting at {service.startingPrice}</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What&apos;s Included:</h4>
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Timeline</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{service.timeline}</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Outcome</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{service.outcome}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                Get Started with {service.title}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background - Match Proof Page */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Floating blurred shapes */}
        <motion.div
          className="absolute top-1/5 left-1/5 w-40 h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-2xl"
          style={{ scale }}
        />
        <motion.div
          className="absolute top-2/3 right-1/5 w-56 h-56 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"
          style={{ scale }}
        />
        {/* Hexagonal Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(37,38,39,0.03)_1px,transparent_0)] bg-[size:40px_40px]" />
        {/* Floating cursor */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
            scale: [1, 1.1, 1]
          }}
          transition={{
            x: { type: "spring", stiffness: 25, damping: 15 },
            y: { type: "spring", stiffness: 25, damping: 15 },
            scale: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              type: "tween"
            }
          }}
        />
      </div>

      {/* PAGE HEADER - Match Proof Page */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Floating service icons - match proof style */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-10 -left-10 text-blue-500/40"
                animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-14 h-14" />
              </motion.div>
              <motion.div
                className="absolute -top-16 -right-8 text-green-500/40"
                animate={{ y: [0, -20, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Settings className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -bottom-8 left-1/3 text-purple-500/40"
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Zap className="w-10 h-10" />
              </motion.div>
            </div>
            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Stop the Bleeding.</span>
              <motion.span 
                className="block bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Start Shipping.
              </motion.span>
            </motion.h1>
            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A suite of productized services designed to solve critical challenges. 
              Clear scope, clear timelines, clear outcomes.
            </motion.p>
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm">Explore our services</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICE TRACKS SECTION - Card style update */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Service Tracks</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the track that matches your challenge
            </p>
          </motion.div>
          <ServiceCard
            serviceTracks={serviceTracks}
            onLearnMore={(service) => {
              setSelectedService(service);
              setShowModal(true);
            }}
          />
        </div>
      </section>

      {/* ADD-ONS SECTION - Card style update */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <AddOnsList />
        </div>
      </section>

      {/* BESPOKE SECTION - Card style update */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your Software: A Bespoke Execution Plan
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                For complex, mission-critical projects that don&apos;t fit a standard mold. 
                We partner with you to scope, architect, and build a fully custom software solution from the ground up.
              </p>
              {/* Replace motion.button with Button component */}
              <Button
                onClick={() => setShowModal(true)}
                variant="gradient-monotone"
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto"
              >
                Let&apos;s Discuss Your Vision
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SPACER */}
      <div className="h-20" />

      {/* Modal */}
      <CustomModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedService(null);
        }}
        service={selectedService}
      />
    </main>
  );
}