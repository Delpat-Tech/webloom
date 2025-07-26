'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  BookOpen,
  Code,
  Zap,
  Database,
  Server,
  Globe,
  Shield,
  Layers,
  GitBranch,
  Monitor,
  Cloud,
  Settings,
  ChevronDown,
  Lightbulb,
  Cog,
  Brain,
  HelpCircle
} from 'lucide-react';
import { Rocket } from 'lucide-react';
import HowWeThink from '@/components/sections/HowWeThink';
import ToolsAndStack from '@/components/sections/ToolsAndStack';
import FAQAccordion from '@/components/sections/FAQAccordion';

export default function ResourcesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { scrollYProgress } = useScroll();
  
  // Unique parallax patterns for resources page
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // How We Think categories data
  const thinkingCategories = [
  {
    title: 'Startup Execution Guides',
    description: 'From idea validation to MVP launch strategies that actually work in the real world.',
    icon: Rocket,
    color: 'from-primary to-secondary',
    articleCount: 12,
    featured: 'The 90-Day MVP Framework'
  },
  {
    title: 'Operations Automation Case Studies',
    description: 'Real client stories of how we eliminated manual processes and scaled operations.',
    icon: Cog,
    color: 'from-accent to-green-400',
    articleCount: 8,
    featured: 'How We Cut 40 Hours/Week with Smart Automation'
  },
  {
    title: 'Tech Stack Philosophy',
    description: 'Why we choose boring technology and how it accelerates your time-to-market.',
    icon: Code,
    color: 'from-secondary to-pink-400',
    articleCount: 15,
    featured: 'The Boring Technology Manifesto'
  }
];

  // Tech stack data
  const techStack = [
    {
      category: 'Frontend',
      description: 'User interfaces that scale with your business',
      tools: [
        { name: 'React', icon: <Monitor className="w-6 h-6" />, reason: 'Component reusability and ecosystem maturity' },
        { name: 'Next.js', icon: <Globe className="w-6 h-6" />, reason: 'Full-stack capabilities with excellent performance' },
        { name: 'TypeScript', icon: <Code className="w-6 h-6" />, reason: 'Catches errors before they reach users' },
        { name: 'Tailwind CSS', icon: <Layers className="w-6 h-6" />, reason: 'Rapid prototyping without sacrificing customization' }
      ]
    },
    {
      category: 'Backend',
      description: 'Robust foundations for reliable operations',
      tools: [
        { name: 'Node.js', icon: <Server className="w-6 h-6" />, reason: 'JavaScript everywhere reduces context switching' },
        { name: 'PostgreSQL', icon: <Database className="w-6 h-6" />, reason: 'ACID compliance with excellent performance' },
        { name: 'Redis', icon: <Zap className="w-6 h-6" />, reason: 'Caching and session management made simple' },
        { name: 'GraphQL', icon: <GitBranch className="w-6 h-6" />, reason: 'Flexible APIs that evolve with your needs' }
      ]
    },
    {
      category: 'Infrastructure',
      description: 'Scalable deployment and monitoring',
      tools: [
        { name: 'Vercel', icon: <Cloud className="w-6 h-6" />, reason: 'Zero-config deployment with global CDN' },
        { name: 'Railway', icon: <Server className="w-6 h-6" />, reason: 'Simple backend hosting with database included' },
        { name: 'Supabase', icon: <Shield className="w-6 h-6" />, reason: 'PostgreSQL with real-time subscriptions' },
        { name: 'GitHub Actions', icon: <Settings className="w-6 h-6" />, reason: 'Automated testing and deployment pipelines' }
      ]
    }
  ];

  // FAQ data
  const faqData = [
    {
      category: 'Process & Timeline',
      questions: [
        {
          question: 'What does your typical project timeline look like?',
          answer: 'Most projects follow our 3-phase approach: Discovery & Planning (1-2 weeks), MVP Development (4-8 weeks), and Launch & Optimization (2-4 weeks). We provide weekly progress updates and maintain full transparency throughout.'
        },
        {
          question: 'How do you handle scope changes during development?',
          answer: 'We expect and plan for scope evolution. Our contracts include a built-in buffer for reasonable changes. Major scope adjustments are discussed transparently with timeline and budget implications clearly outlined before implementation.'
        },
        {
          question: 'What happens after the project launches?',
          answer: 'We provide 30 days of complimentary support post-launch, followed by optional maintenance packages. We also offer training sessions to ensure your team can manage ongoing updates and content changes.'
        }
      ]
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          question: 'How do you structure your pricing?',
          answer: 'We use fixed-price project contracts based on clearly defined scope and deliverables. This eliminates billing surprises and allows you to budget accurately. Payment is typically split into 3-4 milestones aligned with project phases.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes, we understand cash flow considerations. We can structure payments across project milestones and offer extended payment terms for established businesses. Each arrangement is customized to your specific situation.'
        },
        {
          question: 'What\'s included in the project cost?',
          answer: 'Project cost includes all development work, basic hosting setup, documentation, team training, and 30 days of post-launch support. Additional features, advanced integrations, or extended support are quoted separately.'
        }
      ]
    },
    {
      category: 'Technology & Stack',
      questions: [
        {
          question: 'Why do you focus on "boring" technology?',
          answer: 'Boring technology is battle-tested, well-documented, and has large communities. This means faster development, easier maintenance, and simpler team onboarding. We choose tools that will still be relevant in 5 years.'
        },
        {
          question: 'Can you work with our existing tech stack?',
          answer: 'Absolutely. While we have preferred technologies, we\'re experienced with a wide range of tools and frameworks. We\'ll assess your current stack and recommend the best path forward, whether that\'s enhancement or migration.'
        },
        {
          question: 'How do you ensure code quality and maintainability?',
          answer: 'We use TypeScript for type safety, comprehensive testing suites, code reviews, and automated deployment pipelines. All code is documented and follows industry best practices. You receive complete source code ownership.'
        }
      ]
    },
    {
      category: 'Client Relationship',
      questions: [
        {
          question: 'How involved do we need to be during development?',
          answer: 'We design our process to respect your time. We need about 2-4 hours of your involvement per week for feedback and decision-making. Our async-first approach means you can engage on your schedule, not ours.'
        },
        {
          question: 'What if we\'re not satisfied with the work?',
          answer: 'Client satisfaction is our top priority. We provide regular check-ins and revisions throughout the process. If issues arise, we address them immediately and transparently. We also offer a satisfaction guarantee on final deliverables.'
        },
        {
          question: 'Do you sign NDAs and work exclusively with us?',
          answer: 'Yes, we regularly sign NDAs and take confidentiality seriously. While we work with multiple clients, we ensure no conflicts of interest and maintain strict boundaries around proprietary information and competitive projects.'
        }
      ]
    }
  ];

  const categories = ['All', ...faqData.map(section => section.category)];

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background with Resources-themed Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Knowledge-themed shapes */}
        <motion.div
          className="absolute top-1/5 left-1/8 w-72 h-72 bg-gradient-to-r from-primary/12 to-secondary/12 rounded-full blur-3xl"
          style={{ translateY, scale }}
        />
        <motion.div
          className="absolute top-2/3 right-1/6 w-96 h-96 bg-gradient-to-r from-accent/12 to-secondary/12 rounded-full blur-3xl"
          style={{ opacity, scale: useTransform(scrollYProgress, [0, 1], [1.1, 0.9]) }}
        />
        
        {/* Grid pattern with learning motif */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_3px_3px,rgba(var(--primary-rgb),0.02)_3px,transparent_0)] bg-[size:80px_80px]" />
        
        {/* Interactive cursor effect */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-secondary/6 to-pink-400/6 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
            scale: [1, 1.15, 1]
          }}
          transition={{
            x: { type: "spring", stiffness: 25, damping: 25 },
            y: { type: "spring", stiffness: 25, damping: 25 },
            scale: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
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
            className="text-center max-w-6xl mx-auto"
          >
            {/* Floating knowledge icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-16 -left-16 text-primary/30"
                animate={{ 
                  y: [0, -25, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookOpen className="w-20 h-20" />
              </motion.div>
              <motion.div
                className="absolute -top-12 -right-20 text-secondary/30"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -8, 0]
                }}
                transition={{ 
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <Brain className="w-16 h-16" />
              </motion.div>
              <motion.div
                className="absolute -bottom-8 left-1/3 text-accent/30"
                animate={{ 
                  y: [0, -18, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ 
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Lightbulb className="w-18 h-18" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-foreground">Knowledge</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Arsenal
              </motion.span>
              <span className="block text-foreground text-5xl md:text-6xl lg:text-7xl">for Builders.</span>
            </motion.h1>

            {/* Philosophy tagline */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tools, insights, and frameworks from our execution playbook. 
              Everything we&apos;ve learned about bridging the gap between ideas and impact.
            </motion.p>

            {/* Quick navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
            >
              {[
                { label: 'How We Think', icon: <Brain className="w-4 h-4" />, href: '#thinking' },
                { label: 'Tech Stack', icon: <Code className="w-4 h-4" />, href: '#stack' },
                { label: 'FAQ', icon: <HelpCircle className="w-4 h-4" />, href: '#faq' }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="min-w-[180px] flex items-center justify-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {link.icon}
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

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
                <span className="text-sm">Explore our resources</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HOW WE THINK SECTION */}
      <HowWeThink categories={thinkingCategories} />

      {/* TOOLS & STACK SECTION */}
      <ToolsAndStack techStack={techStack} />

      {/* FAQ SECTION */}
      <FAQAccordion 
        faqData={faqData}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        openFAQ={openFAQ}
        setOpenFAQ={setOpenFAQ}
      />
    </main>
  );
}
