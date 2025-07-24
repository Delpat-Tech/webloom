import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap, Shield, Users, Clock, Star, ArrowUp } from "react-feather";
import Button from "../ui/Button";
import Link from "../ui/Link";
import SimpleCard from '../ui/SimpleCard';

const personas = [
  {
    name: "StartupForge Ravi",
    subtitle: "Founders",
    title: "For the Founder with a Vision",
    icon: <Star className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
    before: "You have a validated idea, Figma designs, and a small budget. You need a working web app in 6 weeks to show to your first 100 users and 3 angel investors. Freelance platforms are a gamble you can't afford.",
    after: "We provide a fixed-scope, reliable path to launch so you can focus on your customers.",
    ctaLabel: "Explore MVP Engine",
    ctaLink: "/services/mvp-engine",
    stats: [
      { icon: <Clock className="w-4 h-4" />, label: "6 weeks", desc: "to launch" },
      { icon: <Users className="w-4 h-4" />, label: "100+", desc: "users ready" },
      { icon: <ArrowUp className="w-4 h-4" />, label: "3", desc: "angel investors" }
    ]
  },
  {
    name: "OpsPilot Sarah",
    subtitle: "Operations Leaders",
    title: "For the Ops Leader Battling Chaos",
    icon: <Shield className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
    before: "Your 5-person support team spends 3 hours a day manually copying data between tools. Errors are common and cost you ~$5k/month in churn and wasted time. You've tried freelancers with unreliable results.",
    after: "We build the custom tools and dashboards that bring order and efficiency to your operations.",
    ctaLabel: "Explore Internal OS",
    ctaLink: "/services/internal-os",
    stats: [
      { icon: <Clock className="w-4 h-4" />, label: "3 hrs/day", desc: "wasted time" },
      { icon: <ArrowUp className="w-4 h-4" />, label: "$5k/month", desc: "in losses" },
      { icon: <Users className="w-4 h-4" />, label: "5 person", desc: "team affected" }
    ]
  },
  {
    name: "Professional Client-Facing",
    subtitle: "Business Leaders",
    title: "For the Business Needing a Polished Tool",
    icon: <Star className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
    before: "You need a professional, client-facing application or dashboard that works flawlessly and reflects your brand's quality.",
    after: "We build robust, impressive tools that you can proudly deliver to your own clients.",
    ctaLabel: "Request a Custom Scope",
    ctaLink: "/contact",
    stats: [
      { icon: <Star className="w-4 h-4" />, label: "Premium", desc: "quality" },
      { icon: <Shield className="w-4 h-4" />, label: "Flawless", desc: "performance" },
      { icon: <Users className="w-4 h-4" />, label: "Client-ready", desc: "delivery" }
    ]
  },
  {
    name: "Quick MVP Hungry",
    subtitle: "Ideators",
    title: "For the Ideator Who Needs to Validate, Now",
    icon: <Zap className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
    before: "You have a brilliant idea but need a live product to test it.",
    after: "We offer a rapid, streamlined process to build a functional prototype or 'Lite' MVP to prove your concept in the real world.",
    ctaLabel: "Build a Lite MVP",
    ctaLink: "/services/lite-mvp",
    stats: [
      { icon: <Zap className="w-4 h-4" />, label: "Rapid", desc: "development" },
      { icon: <Zap className="w-4 h-4" />, label: "Brilliant", desc: "idea ready" },
      { icon: <ArrowUp className="w-4 h-4" />, label: "Real-world", desc: "validation" }
    ]
  }
];

const PersonaSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [particlePositions, setParticlePositions] = useState<{ [key: number]: { x: number; y: number }[] }>({});

  // Generate random positions for particles when a card is hovered
  useEffect(() => {
    if (hoveredCard !== null && !particlePositions[hoveredCard]) {
      const positions = Array.from({ length: 6 }, () => ({
        x: Math.random() * 400,
        y: Math.random() * 300,
      }));
      setParticlePositions((prev) => ({ ...prev, [hoveredCard]: positions }));
    }
  }, [hoveredCard, particlePositions]);

  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background decoration removed to match ProcessOverview */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
            Find Your Perfect Match
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Discover how we transform challenges into opportunities for different types of innovators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {personas.map((persona, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <SimpleCard className={`relative bg-card p-8 rounded-xl shadow-lg border border-border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] overflow-hidden min-h-[540px] flex flex-col justify-between h-full`}>
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${persona.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}
                  initial={false}
                  animate={hoveredCard === idx ? { opacity: 0.1 } : { opacity: 0 }}
                />
                {/* Floating particles effect */}
                <AnimatePresence>
                  {hoveredCard === idx && particlePositions[idx] && (
                    <>
                      {particlePositions[idx].map((pos, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: pos.x, y: pos.y }}
                          animate={{ 
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                            x: pos.x,
                            y: pos.y
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${persona.gradient} pointer-events-none`}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
                {/* Header */}
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <motion.div
                    className={`p-3 rounded-lg bg-gradient-to-r ${persona.gradient} text-white shadow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {persona.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {persona.name}
                    </h3>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide font-body">
                      {persona.subtitle}
                    </span>
                  </div>
                </div>
                {/* Stats */}
                <div className="relative z-10 grid grid-cols-3 gap-4 mb-8">
                  {persona.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center p-3 rounded-md bg-muted/50 backdrop-blur-sm border border-border"
                    >
                      <div className="flex justify-center mb-2 text-muted-foreground">
                        {stat.icon}
                      </div>
                      <div className="text-lg font-bold text-foreground font-heading">{stat.label}</div>
                      <div className="text-xs text-muted-foreground font-body">{stat.desc}</div>
                    </motion.div>
                  ))}
                </div>
                {/* Before/After Transformation */}
                <div className="relative z-10 space-y-6 mb-8">
                  {/* Before */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative p-6 rounded-lg bg-destructive/10 border border-destructive/30 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <span className="text-destructive font-bold">✗</span>
                      </div>
                      <h4 className="font-semibold text-destructive font-heading">Current Challenge</h4>
                    </div>
                    <p className="text-foreground leading-relaxed text-sm md:text-base font-body">
                      {persona.before}
                    </p>
                  </motion.div>
                  {/* Arrow */}
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <div className={`p-2 rounded-full bg-gradient-to-r ${persona.gradient} shadow`}>
                      <ChevronRight className="w-6 h-6 text-white rotate-90" />
                    </div>
                  </motion.div>
                  {/* After */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative p-6 rounded-lg bg-accent/10 border border-accent/30 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-bold">✓</span>
                      </div>
                      <h4 className="font-semibold text-accent font-heading">Our Solution</h4>
                    </div>
                    <p className="text-foreground leading-relaxed text-sm md:text-base font-body">
                      {persona.after}
                    </p>
                  </motion.div>
                </div>
                {/* CTA Button */}
                <motion.div
                  className="relative z-10 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href={persona.ctaLink}>
                    <Button variant="gradient-duotone">
                      <span className="flex items-center gap-2">
                        {persona.ctaLabel}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </SimpleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonaSection;