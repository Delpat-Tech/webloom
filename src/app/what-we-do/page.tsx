'use client';

import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import PageBackdrop from '@/components/ui/PageBackdrop';
import AddOnsList from '@/components/sections/AddOnsList';
import ServiceRecommender from '@/components/sections/ServiceRecommender';
import EngagementModels from '@/components/sections/EngagementModels';
import { useRouter, useSearchParams } from 'next/navigation';

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

const SERVICE_REDIRECT_MAP: Record<string, string> = {
  'mvp-engine': 'mvp-engine',
  mvp_engine: 'mvp-engine',
  mvp: 'mvp-engine',
  'internal-os': 'internal-os',
  internal_os: 'internal-os',
  inter_ops: 'internal-os',
  internal: 'internal-os',
  'automation-mvp': 'automation-mvp',
  automation_mvp: 'automation-mvp',
  automation: 'automation-mvp',
};

function resolveServiceSlug(utmService: string | null): string | undefined {
  if (!utmService) return undefined;
  return SERVICE_REDIRECT_MAP[utmService.toLowerCase()];
}

function UTMRedirector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // UTM-based redirect priority: utm_ads -> contact, else utm_service -> service page.
    const utmAds = searchParams.get('utm_ads');
    if (utmAds) {
      const query = searchParams.toString();
      const suffix = query ? `?${query}` : '';
      router.replace(`/contact${suffix}`);
      return;
    }

    const utmService = searchParams.get('utm_service');
    const serviceSlug = resolveServiceSlug(utmService);
    if (serviceSlug) {
      const query = searchParams.toString();
      const suffix = query ? `?${query}` : '';
      router.replace(`/what-we-do/${serviceSlug}${suffix}`);
    }
  }, [router, searchParams]);

  return null;
}

export default function ServicesPage() {
  const router = useRouter();

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

  const goContact = () => router.push('/contact#contact-form');

  return (
    <main className="relative overflow-hidden">
      <Suspense fallback={null}>
        <UTMRedirector />
      </Suspense>
      <PageBackdrop />

      {/* HERO */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs md:text-sm text-muted-foreground backdrop-blur"
          >
            <Zap className="w-3.5 h-3.5 text-primary" /> Productized services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Stop the bleeding.{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Start shipping.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            A suite of productized services built around critical challenges. Clear scope, clear timelines,
            clear outcomes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              href="#services"
              variant="gradient-monotone"
              className="px-7 py-4 rounded-2xl font-semibold inline-flex items-center justify-center gap-2"
            >
              Explore services <ChevronDown className="w-4 h-4" />
            </Button>
            <Button
              href="/contact#contact-form"
              variant="tertiary"
              className="px-7 py-4 rounded-2xl font-medium border border-border text-foreground hover:bg-muted inline-flex items-center justify-center gap-2"
            >
              Scope a project <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <ul className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
            {serviceCategories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition-colors hover:border-primary/50"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-white`}>
                    {c.icon}
                  </span>
                  <span className="font-semibold text-foreground">{c.title}</span>
                  <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our services</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Each one built for a specific outcome
            </h2>
          </div>

          {serviceCategories.map((category, index) => (
            <motion.article
              key={category.id}
              id={category.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-24 rounded-3xl border border-border bg-card/70 p-6 md:p-10 backdrop-blur-sm"
            >
              <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-white`}>
                      {category.icon}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-foreground">{category.title}</h3>
                  <p className="mt-2 text-muted-foreground">{category.subtitle}</p>
                  <p className="mt-5 text-lg text-foreground leading-relaxed">{category.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {category.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        {useCase}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={goContact}
                    variant="gradient-monotone"
                    className="mt-8 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                  >
                    Adopt our model <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <ul className="grid sm:grid-cols-2 gap-3 content-start">
                  {category.services.map((service) => (
                    <li
                      key={service.name}
                      className="rounded-2xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/50"
                    >
                      <div className="flex items-center gap-2.5 text-primary">
                        {service.icon}
                        <span className="text-sm font-semibold text-foreground">{service.name}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{service.examples.join(' · ')}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <ServiceRecommender />
      <EngagementModels />

      <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <AddOnsList />
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 p-8 md:p-14 text-center">
          <span className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground mb-6">
            <Star className="w-7 h-7" />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Your software: a bespoke execution plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            For complex, mission-critical projects that don&apos;t fit a standard mold. We scope, architect and
            build a fully custom solution from the ground up.
          </p>
          <Button
            onClick={goContact}
            variant="gradient-monotone"
            className="mt-8 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3"
          >
            Scope a custom project <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </main>
  );
}
