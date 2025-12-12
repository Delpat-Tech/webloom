'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Rocket,
  Settings,
  Zap,
  ArrowRight,
  Star,
  ChevronDown,
  Code,
  Database,
  Palette,
  Globe,
  Lightbulb,
  Cloud,
  Shield,
  BarChart3,
  FileText,
  Users,
  Workflow,
  Mail,
  Play,
  Briefcase,
  Search,
  Brain,
  CheckCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import AddOnsList from '@/components/sections/AddOnsList';
import ServiceRecommender from '@/components/sections/ServiceRecommender';
import EngagementModels from '@/components/sections/EngagementModels';
import { useRouter } from 'next/navigation';

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  services: ServiceItem[];
  useCases: string[];
}

interface ServiceItem {
  name: string;
  examples: string[];
  icon: React.ReactNode;
}

export default function ServicesPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'mvp-engine',
      title: 'MVP Engine',
      subtitle: 'Rapid prototyping, product-market fit, and go-to-market for early-stage startups and teams.',
      description: 'Go from idea to live product in an average of 6 weeks. Fixed timeline, zero surprises.',
      icon: <Rocket className="w-8 h-8" />,
      gradient: 'from-primary to-accent',
      useCases: [
        'SaaS MVPs',
        'Client-Facing Dashboards',
        'Mobile App Prototypes'
      ],
      services: [
        {
          name: 'MVP-as-a-Service',
          examples: ['SaaS MVPs', 'Demo apps'],
          icon: <Code className="w-5 h-5" />
        },
        {
          name: 'Mobile & Web App Development',
          examples: ['Trading apps', 'EdTech platforms'],
          icon: <Globe className="w-5 h-5" />
        },
        {
          name: 'UX/UI Design',
          examples: ['Figma designs', 'Excalidraw', 'Custom UIs'],
          icon: <Palette className="w-5 h-5" />
        },
        {
          name: 'Website Design & Development',
          examples: ['Marketing sites', 'Event platforms'],
          icon: <Globe className="w-5 h-5" />
        },
        {
          name: 'Product Strategy & Discovery',
          examples: ['Discovery workshops', 'Roadmaps'],
          icon: <Lightbulb className="w-5 h-5" />
        },
        {
          name: 'AI Solutions',
          examples: ['Resume rankers', 'Dehazing AI', 'Bots'],
          icon: <Brain className="w-5 h-5" />
        },
        {
          name: 'API Development & Integration',
          examples: ['Payment APIs', 'CRM APIs', 'Analytics APIs'],
          icon: <Database className="w-5 h-5" />
        },
        {
          name: 'No-Code/Low-Code Solutions',
          examples: ['Quick prototypes', 'Airtable', 'Webflow'],
          icon: <Code className="w-5 h-5" />
        },
        {
          name: 'E-commerce Development',
          examples: ['Shopify', 'Custom carts', 'Plugins'],
          icon: <Briefcase className="w-5 h-5" />
        },
        {
          name: 'Training & Documentation',
          examples: ['Handover docs', 'Onboarding guides'],
          icon: <FileText className="w-5 h-5" />
        }
      ]
    },
    {
      id: 'internal-os',
      title: 'Internal OS',
      subtitle: 'Core systems, dashboards, and digital infrastructure for operations and scalability.',
      description: 'Eliminate 20+ hours of manual work per week. Connect your systems, automate chaos.',
      icon: <Settings className="w-8 h-8" />,
      gradient: 'from-secondary to-primary',
      useCases: [
        'Custom CRMs',
        'Automated Reporting Systems',
        'Operational Dashboards'
      ],
      services: [
        {
          name: 'Custom Software Development',
          examples: ['Internal tools', 'Custom CRMs'],
          icon: <Code className="w-5 h-5" />
        },
        {
          name: 'Internal Tools & Dashboards',
          examples: ['KPI dashboards', 'Knowledge bases'],
          icon: <BarChart3 className="w-5 h-5" />
        },
        {
          name: 'IT Consultancy & System Integration',
          examples: ['Notion', 'Airtable', 'Slack', 'n8n integrations'],
          icon: <Workflow className="w-5 h-5" />
        },
        {
          name: 'Data Engineering & Analytics',
          examples: ['Market analytics', 'Reporting tools'],
          icon: <BarChart3 className="w-5 h-5" />
        },
        {
          name: 'Support & Maintenance',
          examples: ['Retainers', 'Monthly support'],
          icon: <Shield className="w-5 h-5" />
        },
        {
          name: 'Technical Due Diligence',
          examples: ['Tech audits', 'Risk registers'],
          icon: <Search className="w-5 h-5" />
        },
        {
          name: 'White-Label Development',
          examples: ['Agency partnerships', 'B2B tools'],
          icon: <Users className="w-5 h-5" />
        },
        {
          name: 'Cloud Solutions & DevOps',
          examples: ['AWS', 'Vercel', 'CI/CD pipelines'],
          icon: <Cloud className="w-5 h-5" />
        }
      ]
    },
    {
      id: 'automation-mvp',
      title: 'Automation MVP',
      subtitle: 'Automating repetitive processes, intelligent workflows, and data handling.',
      description: 'Save time and resources with AI-powered workflows that work 24/7.',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-accent to-primary',
      useCases: [
        'Data Scraping & Processing',
        'Automated Lead Nurturing',
        'Workflow Integrations'
      ],
      services: [
        {
          name: 'Business Process Automation',
          examples: ['Data sync', 'Reporting', 'Scraping'],
          icon: <Workflow className="w-5 h-5" />
        },
        {
          name: 'Email Automation',
          examples: ['Streamlined outreach'],
          icon: <Mail className="w-5 h-5" />
        },
        {
          name: 'YouTube Automation',
          examples: ['Engagement bots'],
          icon: <Play className="w-5 h-5" />
        },
        {
          name: 'Job Posting Automation',
          examples: ['Automated job reposting'],
          icon: <Briefcase className="w-5 h-5" />
        },
        {
          name: 'AI Solutions',
          examples: ['Resume optimizer', 'Smart bots'],
          icon: <Brain className="w-5 h-5" />
        },
        {
          name: 'API Development & Integration',
          examples: ['CRM APIs', 'Analytics APIs'],
          icon: <Database className="w-5 h-5" />
        },
        {
          name: 'IT Consultancy & System Integration',
          examples: ['n8n workflows', 'Automation setups'],
          icon: <Workflow className="w-5 h-5" />
        },
        {
          name: 'Cloud Solutions & DevOps',
          examples: ['CI/CD', 'Infra automation'],
          icon: <Cloud className="w-5 h-5" />
        }
      ]
    }
  ];

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
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl pointer-events-none"
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

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Floating service icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-10 -left-10 text-primary/40"
                animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-14 h-14" />
              </motion.div>
              <motion.div
                className="absolute -top-16 -right-8 text-secondary/40"
                animate={{ y: [0, -20, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Settings className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -bottom-8 left-1/3 text-accent/40"
                animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <Zap className="w-10 h-10" />
              </motion.div>
            </div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Stop the Bleeding.</span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Start Shipping.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A suite of productized services designed to solve critical challenges. Clear scope, clear timelines, clear outcomes.
            </motion.p>

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

      {/* SERVICE CATEGORIES SECTION */}
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
              Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Each service focuses on specific challenges and delivers clear outcomes
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative h-full p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group-hover:shadow-2xl">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Category header */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.gradient} text-white mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.subtitle}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Use Cases list */}
                  <div className="relative z-10 space-y-4 mb-8">
                    <h4 className="font-semibold text-foreground mb-3">Common Use Cases:</h4>
                    <div className="grid gap-3">
                      {category.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="text-accent mt-0.5">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{useCase}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="relative z-10 space-y-3">
                    {/* <Button
                      onClick={() => handleLearnMore(category.id)}
                      variant="gradient-outline"
                      className="w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button> */}
                    <Button
                      onClick={() => router.push('/contact#contact-form')}
                      variant="gradient-monotone"
                      className="w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      Adopt Our Model
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE RECOMMENDER QUIZ SECTION */}
      <ServiceRecommender />

      {/* ENGAGEMENT MODELS SECTION */}
      <EngagementModels />

      {/* ADD-ONS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <AddOnsList />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your Software: A Bespoke Execution Plan
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                For complex, mission-critical projects that don&apos;t fit a standard mold.
                We partner with you to scope, architect, and build a fully custom software solution from the ground up.
              </p>
              <Button
                onClick={() => router.push('/contact#contact-form')}
                variant="gradient-monotone"
                className="px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto"
              >
                Scope a Custom Project
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SPACER */}
      <div className="h-20" />
    </main>
  );
}
