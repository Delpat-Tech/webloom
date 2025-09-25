'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Settings, 
  Zap, 
  CheckCircle, 
  Clock, 
  Target, 
  Award,
  ArrowLeft,
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
  ArrowRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from '@/components/ui/Link';

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  services: ServiceItem[];
  timeline: string;
  outcome: string;
  features: string[];
}

interface ServiceItem {
  name: string;
  examples: string[];
  icon: React.ReactNode;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'mvp-engine',
          title: 'MVP Engine',
    subtitle: 'Rapid prototyping, product-market fit, and go-to-market for early-stage startups and teams.',
    description: 'Go from idea to live product in an average of 6 weeks. Fixed timeline, zero surprises.',
    icon: <Send className="w-8 h-8" />,
    gradient: 'from-primary to-accent',
    timeline: '6 weeks',
    outcome: 'A fully functional MVP ready for real users and investor demos',
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
    timeline: '4-5 weeks',
    outcome: 'Streamlined operations saving 20+ hours weekly',
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
    timeline: '2-3 weeks',
    outcome: 'Automated workflows saving significant time and resources',
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

export default function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [service, setService] = React.useState<ServiceCategory | null>(null);
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

  React.useEffect(() => {
    const getParams = async () => {
      const { slug: resolvedSlug } = await params;
      const foundService = serviceCategories.find((s) => s.id === resolvedSlug);
      setService(foundService || null);
    };
    getParams();
  }, [params]);

  if (!service) return null;

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
            {/* Floating service icon */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-10 -left-10 text-primary/40"
                animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {service.icon}
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">{service.title}</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Service Track
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {service.subtitle}
            </motion.p>
            <motion.p 
              className="text-xl md:text-2xl text-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {service.description}
            </motion.p>


          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Services <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Included</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.services.map((item, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="text-accent mt-1">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.examples.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Features Section */}
          <div className="h-full flex flex-col">
            <div className="bg-card border-2 border-primary/10 dark:border-primary/30 rounded-2xl p-8 shadow-md h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">What&apos;s Included</h2>
              </div>
              <div className="grid gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 dark:bg-muted/30 hover:bg-muted/70 dark:hover:bg-muted/50 transition-colors">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline & Outcome */}
          <div className="h-full flex flex-col gap-8">
            {/* Timeline Card */}
            <div className="bg-card border-2 border-accent/20 dark:border-accent/40 rounded-2xl p-8 shadow-md flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Timeline</h2>
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${service.gradient} text-primary-foreground text-2xl font-bold mb-4 shadow-lg border-4 border-border/40 dark:border-border/60`}>
                  {service.timeline.split(' ')[0]}
                </div>
                <p className="text-lg text-muted-foreground font-medium">{service.timeline}</p>
              </div>
            </div>

            {/* Outcome Card */}
            <div className="bg-card border-2 border-primary/10 dark:border-primary/30 rounded-2xl p-8 shadow-md flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Expected Outcome</h2>
              </div>
              <div className="relative p-6 rounded-xl bg-muted/60 dark:bg-muted/40 border border-accent/20 dark:border-accent/40 shadow-sm">
                <p className="text-foreground font-medium text-lg leading-relaxed">
                  {service.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Content Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              See This Service <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">In Action</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our projects and case studies that showcase this service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Projects */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Related Projects</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Browse our portfolio to see real examples of projects built using this service.
              </p>
              <Link href={`/portfolios?service=${service.id}`}>
                <Button variant="secondary" className="flex items-center gap-2">
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            {/* Related Case Studies */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-semibold text-foreground">Case Studies</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Deep dive into our process, challenges, and measurable results achieved.
              </p>
              <Link href={`/case-studies?service=${service.id}`}>
                <Button variant="accent" className="flex items-center gap-2">
                  <span>View Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className={`inline-block p-8 rounded-3xl bg-gradient-to-r ${service.gradient} from-accent to-primary shadow-xl border-2 border-accent/30 dark:border-accent/50`}>
            <h3 className="text-2xl font-bold text-primary-foreground mb-4 drop-shadow">Ready to get started?</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Let&apos;s discuss your project and create a custom solution that fits your needs perfectly.
            </p>
            <Button
              onClick={() => router.push('/contact')}
              variant="gradient-monotone"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-primary text-accent-foreground font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border-2 border-border/20 dark:border-border/40"
            >
              <Send className="w-5 h-5" />
              Quote Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}