'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  ChevronDown,
  Zap,
  Rocket,
  Shield,
  ArrowRight,
  Sparkles,
  BarChart3,
  Settings,
  X
} from 'lucide-react';
import PricingTiersSection from '@/components/sections/PricingTiers';
import CostCalculator from '@/components/sections/CostCalculator';

// Define types for pricing tiers
interface PricingTierData {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  outcome: string;
  popular?: boolean;
}

interface PricingTiers {
  [key: string]: {
    [key: string]: PricingTierData;
  };
}

export default function PricingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedGoal, setSelectedGoal] = useState<'mvp' | 'internal' | 'automation'>('mvp');
  const [selectedTier, setSelectedTier] = useState<'lite' | 'full' | 'scalable'>('full');
  const [manualHours, setManualHours] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(2000);
  const [employeeCount, setEmployeeCount] = useState(5);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const { scrollYProgress } = useScroll();
  
  // Parallax effects with different patterns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // When goal changes, reset selectedTier to 'full'
  useEffect(() => {
    setSelectedTier('full');
  }, [selectedGoal]);

  // When currency changes, adjust hourly rate to appropriate range
  useEffect(() => {
    if (currency === 'INR' && hourlyRate < 1000) {
      setHourlyRate(2000); // Set to reasonable INR rate
    } else if (currency === 'USD' && hourlyRate > 200) {
      setHourlyRate(50); // Set to reasonable USD rate
    }
  }, [currency]);

  type Goal = {
    id: 'mvp' | 'internal' | 'automation';
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  };

  const goals: Goal[] = [
    {
      id: 'mvp',
      title: 'Launch MVP',
      description: 'Get your idea to market fast',
      icon: <Rocket className="w-6 h-6" />, // icon color handled by card
      color: 'from-primary to-accent'
    },
    {
      id: 'internal',
      title: 'Internal Tool',
      description: 'Streamline your operations',
      icon: <Settings className="w-6 h-6" />, // icon color handled by card
      color: 'from-secondary to-primary'
    },
    {
      id: 'automation',
      title: 'Automation',
      description: 'Eliminate manual processes',
      icon: <Zap className="w-6 h-6" />, // icon color handled by card
      color: 'from-accent to-primary'
    }
  ];

  // Currency conversion rates (approximate)
  const USD_TO_INR = 83; // 1 USD = 83 INR (approximate)

  const pricingTiers: PricingTiers = {
    mvp: {
      lite: {
        name: 'MVP Lite',
        price: currency === 'USD' ? '$15,000' : '₹12,50,000',
        duration: '4 weeks',
        description: 'Perfect for testing your core idea',
        features: [
          'Core feature development',
          'Basic UI/UX design',
          'User authentication',
          'Database setup',
          'Basic deployment',
          '2 weeks support'
        ],
        outcome: 'Validate your idea with real users'
      },
      full: {
        name: 'MVP Full',
        price: currency === 'USD' ? '$25,000' : '₹20,75,000',
        duration: '6 weeks',
        description: 'Complete MVP ready for launch',
        features: [
          'Full feature development',
          'Professional UI/UX design',
          'Advanced authentication',
          'Payment integration',
          'Analytics setup',
          'SEO optimization',
          '4 weeks support'
        ],
        outcome: 'Launch-ready product with growth potential',
        popular: true
      },
      scalable: {
        name: 'MVP Scalable',
        price: currency === 'USD' ? '$40,000' : '₹33,20,000',
        duration: '8 weeks',
        description: 'Enterprise-ready with scaling infrastructure',
        features: [
          'Full MVP development',
          'Advanced UI/UX design',
          'Multi-tenant architecture',
          'Advanced integrations',
          'Load testing',
          'DevOps setup',
          'Team training',
          '8 weeks support'
        ],
        outcome: 'Scale from day one with enterprise features'
      }
    },
    internal: {
      lite: {
        name: 'Tool Lite',
        price: currency === 'USD' ? '$10,000' : '₹8,30,000',
        duration: '3 weeks',
        description: 'Simple internal productivity tool',
        features: [
          'Basic workflow automation',
          'Simple dashboard',
          'User management',
          'Data export',
          'Basic reporting',
          '2 weeks support'
        ],
        outcome: 'Streamline one key process'
      },
      full: {
        name: 'Tool Full',
        price: currency === 'USD' ? '$20,000' : '₹16,60,000',
        duration: '5 weeks',
        description: 'Comprehensive internal solution',
        features: [
          'Advanced workflow automation',
          'Custom dashboard',
          'Role-based access',
          'API integrations',
          'Advanced reporting',
          'Training materials',
          '4 weeks support'
        ],
        outcome: 'Transform multiple business processes',
        popular: true
      },
      scalable: {
        name: 'Tool Enterprise',
        price: currency === 'USD' ? '$35,000' : '₹29,05,000',
        duration: '7 weeks',
        description: 'Enterprise-grade internal platform',
        features: [
          'Complex workflow automation',
          'Executive dashboard',
          'SSO integration',
          'Multiple API integrations',
          'Advanced analytics',
          'Custom training program',
          'Priority support',
          '8 weeks support'
        ],
        outcome: 'Company-wide digital transformation'
      }
    },
    automation: {
      lite: {
        name: 'Auto Lite',
        price: currency === 'USD' ? '$8,000' : '₹6,64,000',
        duration: '2 weeks',
        description: 'Automate one key process',
        features: [
          'Single process automation',
          'Basic monitoring',
          'Error handling',
          'Simple reporting',
          '2 weeks support'
        ],
        outcome: 'Eliminate one manual task'
      },
      full: {
        name: 'Auto Full',
        price: currency === 'USD' ? '$18,000' : '₹14,94,000',
        duration: '4 weeks',
        description: 'Comprehensive automation suite',
        features: [
          'Multiple process automation',
          'Advanced monitoring',
          'Intelligent error handling',
          'Comprehensive reporting',
          'Integration with existing tools',
          '4 weeks support'
        ],
        outcome: 'Streamline entire workflows',
        popular: true
      },
      scalable: {
        name: 'Auto Enterprise',
        price: currency === 'USD' ? '$30,000' : '₹24,90,000',
        duration: '6 weeks',
        description: 'Enterprise automation platform',
        features: [
          'Complex multi-step automation',
          'Real-time monitoring',
          'AI-powered optimization',
          'Advanced analytics',
          'Custom integrations',
          'Team training',
          '6 weeks support'
        ],
        outcome: 'Transform business operations'
      }
    }
  };

  const calculateROI = () => {
    const monthlySavings = manualHours * hourlyRate * employeeCount * 4; // 4 weeks per month
    const yearlySavings = monthlySavings * 12;
    
    // Extract numeric value from price string and convert to number
    const priceString = pricingTiers[selectedGoal][selectedTier].price;
    const numericPrice = parseInt(priceString.replace(/[$,₹]/g, '').replace(/,/g, ''));
    
    // Convert INR price to USD for ROI calculation if needed
    let automationCost = numericPrice;
    if (currency === 'INR') {
      automationCost = numericPrice / USD_TO_INR; // Convert to USD for calculation
    }
    
    const roi = ((yearlySavings - automationCost) / automationCost) * 100;
    
    return {
      monthlySavings,
      yearlySavings,
      roi: Math.max(0, roi),
      breakEven: Math.ceil(automationCost / monthlySavings)
    };
  };

  const roiData = calculateROI();

  return (
    <main className="relative overflow-hidden">
      {/* Animated Background with Different Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        
        {/* Rotating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl"
          style={{ rotate, y: y1 }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-2xl"
          style={{ 
            rotate: useTransform(scrollYProgress, [0, 1], [0, -360]),
            y: y2 
          }}
        />
        
        {/* Diagonal Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(37,38,39,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(37,38,39,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Pricing-themed floating elements */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 144,
            y: mousePosition.y - 144,
            scale: 1.2
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
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
            {/* Floating pricing icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-8 -left-8 text-primary/40"
                animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <DollarSign className="w-12 h-12" />
              </motion.div>
              <motion.div
                className="absolute -top-12 -right-12 text-accent/40"
                animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <BarChart3 className="w-10 h-10" />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 left-1/4 text-secondary/40"
                animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <TrendingUp className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Main heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Value-Based
              </motion.span>
              <span className="block text-foreground">Pricing.</span>
              <span className="block text-foreground text-5xl md:text-6xl lg:text-7xl">ROI-Focused Results.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Our pricing is based on a simple principle: you should know what you&apos;re paying for. 
              We provide clear starting points and work with you to define a fixed scope and price before any work begins.
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
                <span className="text-sm">Find your starting point</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PRICING TIERS SECTION */}
      <PricingTiersSection
        selectedGoal={selectedGoal}
        setSelectedGoal={setSelectedGoal}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        goals={goals}
        pricingTiers={pricingTiers}
      />

      {/* COST CALCULATOR SECTION */}
      <CostCalculator
        manualHours={manualHours}
        setManualHours={setManualHours}
        hourlyRate={hourlyRate}
        setHourlyRate={setHourlyRate}
        employeeCount={employeeCount}
        setEmployeeCount={setEmployeeCount}
        currency={currency}
        setCurrency={setCurrency}
        roiData={roiData}
      />

      {/* PRICING TRANSPARENCY SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100%</span> Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              No hidden fees, no surprises. Here&apos;s exactly what you get with our transparent approach.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* What's Included */}
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-accent" />
                What&apos;s Always Included
              </h3>
              
              <div className="space-y-4">
                {[
                  'Fixed scope, fixed price, fixed timeline',
                  'No hourly billing surprises',
                  'Complete project documentation',
                  'Source code ownership',
                  'Post-launch support period',
                  'Training and handover',
                  'Regular progress updates',
                  'Quality assurance testing'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What's Never Included */}
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <X className="w-6 h-6 text-destructive" />
                What&apos;s Never Included
              </h3>
              
              <div className="space-y-4">
                {[
                  'Hidden fees or charges',
                  'Scope creep without approval',
                  'Hourly rate surprises',
                  'Vendor lock-in requirements',
                  'Ongoing licensing fees',
                  'Mysterious "consulting" charges',
                  'Platform dependency fees',
                  'Surprise maintenance costs'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground line-through opacity-60">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Process Guarantee */}
          <motion.div
            className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Pricing Promise</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We discuss your project in detail, define clear scope and deliverables, 
                and provide a fixed quote before any work begins. No surprises, no hidden costs, 
                just transparent value-based pricing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Get <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and provide you with a clear, fixed-price quote. 
              No obligations, no hidden agendas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <Button className="relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white border-0 rounded-2xl shadow-2xl flex items-center gap-3">
                    Get Your Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/portfolio">
                <Button 
                  variant="secondary"
                  className="px-8 py-4 text-lg font-semibold border-2 border-border bg-card/50 text-foreground hover:border-primary hover:bg-primary/10 rounded-2xl flex items-center gap-3"
                >
                  View Our Work
                  <Sparkles className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SPACER */}
      <div className="h-20" />
    </main>
  );
}