import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Zap,
  Shield,
  Users,
  Clock,
  Star,
  ArrowUp,
} from "react-feather";
import Button from "../ui/Button";
import SimpleCard from "../ui/SimpleCard";

const personas = [
  {
    name: "Ankit",
    subtitle: "The Pragmatic Founder",
    title: "For the Founder with a Vision, Not a Technical Team",
    icon: <Star className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
   painPoints: [
      "You have a validated idea, Figma designs, and a small budget.",
      "You need a working web app in 6 weeks to show to your first 100 users and 3 angel investors.",
      "Freelance platforms are a gamble you can't afford."
    ],
    solutions: [
      "We provide a fixed-scope, reliable path to launch.",
      "You can focus on your customers instead of managing developers."
    ],
    ctaLabel: "Explore MVP Engine",
    ctaLink: "/services/mvp-engine",
    stats: [
      {
        icon: <Clock className="w-4 h-4" />,
        label: "6 weeks",
        desc: "to launch",
      },
      {
        icon: <Users className="w-4 h-4" />,
        label: "100+",
        desc: "users ready",
      },
      {
        icon: <ArrowUp className="w-4 h-4" />,
        label: "3",
        desc: "angel investors",
      },
    ],
  },
  {
    name: "Priya",
    subtitle: "The Systems Builder",
    title: "For the Ops Leader Battling Spreadsheet Chaos",
    icon: <Shield className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
     painPoints: [
      "Your 5-person support team spends 3 hours a day manually copying data between tools.",
      "Errors are common and cost you ~$5k/month in churn and wasted time.",
      "You've tried freelancers with unreliable results."
    ],
    solutions: [
      "We build custom tools and dashboards tailored to your workflows.",
      "We bring order and efficiency to your operations."
    ],
    ctaLabel: "Explore Internal OS",
    ctaLink: "/services/internal-os",
    stats: [
      {
        icon: <Clock className="w-4 h-4" />,
        label: "3 hrs/day",
        desc: "wasted time",
      },
      {
        icon: <ArrowUp className="w-4 h-4" />,
        label: "$5k/month",
        desc: "in losses",
      },
      {
        icon: <Users className="w-4 h-4" />,
        label: "5 person",
        desc: "team affected",
      },
    ],
  },
  {
    name: "Karan",
    subtitle: "The Technical Partner",
    title: "For the Business Needing a Polished Tool",
    icon: <Star className="w-8 h-8" />,
    gradient: "from-secondary to-accent",
      painPoints: [
      "Lorem ipsum.",
      "lorem ipsum."
    ],
    solutions: [
      "No content available for this persona.",
      "No content - lorem ipsum."
    ],
    ctaLabel: "Request a Custom Scope",
    ctaLink: "/contact",
    stats: [
      { icon: <Star className="w-4 h-4" />, label: "Premium", desc: "quality" },
      {
        icon: <Shield className="w-4 h-4" />,
        label: "Flawless",
        desc: "performance",
      },
      {
        icon: <Users className="w-4 h-4" />,
        label: "Client-ready",
        desc: "delivery",
      },
    ],
  },
];

const PersonaSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [particlePositions, setParticlePositions] = useState<{
    [key: number]: { x: number; y: number }[]; 
  }>({});

  useEffect(() => {
    if (hoveredCard !== null && !particlePositions[hoveredCard]) {
      const positions = Array.from({ length: 6 }, () => ({
        x: Math.random() * 250,
        y: Math.random() * 180,
      }));
      setParticlePositions((prev) => ({ ...prev, [hoveredCard]: positions }));
    }
  }, [hoveredCard, particlePositions]);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden w-full">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Find Your Perfect Match
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed px-4">
            Discover how we transform challenges into opportunities for
            different types of innovators
          </p>
        </motion.div>

        {/* Persona Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-5xl mx-auto">
          {personas.map((persona, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`group relative w-full max-w-none ${idx === 2 ? 'lg:col-span-2 lg:max-w-[calc(48%)] mx-auto' : ''}`}
            >
              <SimpleCard className="relative bg-card/80 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.01] overflow-hidden flex flex-col h-full min-h-[600px] sm:min-h-[650px] lg:min-h-[700px]">
                {/* Hover Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                  initial={false}
                  animate={
                    hoveredCard === idx ? { opacity: 0.05 } : { opacity: 0 }
                  }
                />

                {/* Animated Particles */}
                <AnimatePresence>
                  {hoveredCard === idx && particlePositions[idx] && (
                    <>
                      {particlePositions[idx].map((pos, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: pos.x, y: pos.y }}
                          animate={{
                            opacity: [0, 0.4, 0],
                            scale: [0, 1, 0],
                            x: pos.x,
                            y: pos.y,
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{
                            duration: 2.5,
                            delay: i * 0.15,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                          }}
                          className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${persona.gradient} pointer-events-none z-0`}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Header Section */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <motion.div
                    className={`flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${persona.gradient} text-white shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8">{persona.icon}</div>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {persona.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider font-body mt-1 block">
                      {persona.subtitle}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
                  {persona.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center p-2 sm:p-3 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50 hover:bg-muted/50 transition-colors duration-300"
                    >
                      <div className="flex justify-center mb-1 sm:mb-2 text-muted-foreground">
                        <div className="w-3 h-3 sm:w-4 sm:h-4">{stat.icon}</div>
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg font-bold text-foreground font-heading leading-tight">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground font-body leading-tight">
                        {stat.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Title Lead-In */}
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="text-xl sm:text-lg lg:text-xl font-semibold text-foreground font-heading mb-2 sm:mb-3"
                >
                  {persona.title}
                </motion.h4>

                {/* Challenge & Solution Section */}
                <div className="relative z-10 space-y-4 sm:space-y-6 mb-6 sm:mb-8 flex-1">
                  {/* Current Challenge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative p-3 sm:p-4 lg:p-6 rounded-xl bg-destructive/5 border border-destructive/20 backdrop-blur-sm hover:bg-destructive/10 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-destructive/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-destructive font-bold text-sm sm:text-base">
                          ✗
                        </span>
                      </div>
                      <h4 className="font-semibold text-destructive font-heading text-sm sm:text-base">
                        Pain Points
                      </h4>
                    </div>
                     <ul className="list-disc list-outside text-xs sm:text-sm lg:text-base text-foreground/90 leading-relaxed font-body sm:pl-11">
                      {persona.painPoints.map((point, i) => (
                        <li className="p" key={i}>{point}</li>
                          ))}
                     </ul>
                     
                  </motion.div>

                  {/* Arrow Transition */}
                  <motion.div
                    className="flex justify-center py-2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={`p-1.5 sm:p-2 rounded-full bg-gradient-to-r ${persona.gradient} shadow-lg`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white rotate-90" />
                    </div>
                  </motion.div>

                  {/* Our Solution */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="relative p-3 sm:p-4 lg:p-6 rounded-xl bg-accent/5 border border-accent/20 backdrop-blur-sm hover:bg-accent/10 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-bold text-sm sm:text-base">
                          ✓
                        </span>
                      </div>
                      <h4 className="font-semibold text-accent font-heading text-sm sm:text-base">
                        Our Solution
                      </h4>
                    </div>
                  <ul className="list-disc list-inside text-sm text-foreground/90 space-y-1">
          {persona.solutions.map((solution, i) => (
            <li key={i}>{solution}</li>
          ))}
        </ul>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div
                  className="relative z-10 text-center mt-auto pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group inline-block"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                    <Button
                      href={persona.ctaLink}
                      variant="gradient-duotone"
                      className="relative w-full sm:w-auto px-6 sm:px-8 py-3 text-sm sm:text-base font-medium transition-transform duration-200 flex items-center justify-center gap-2"
                    >
                      {persona.ctaLabel}
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </motion.div>
                </motion.div>
              </SimpleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonaSection;
