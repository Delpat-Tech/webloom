"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface PrincipleCard {
  title: string;
  text: string;
  id: string;
}

const ExecutionEngine = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const principles: PrincipleCard[] = [
    {
      id: "speed-mvps",
      title: "Move at the Speed of Insight.",
      text: "For a founder, the most valuable asset is time. We build MVPs not just to launch a product, but to accelerate your learning. The faster you can validate an idea with real users, the more likely you are to succeed."
    },
    {
      id: "process-systems",
      title: "Systems Over Chaos.",
      text: "Great execution isn't about working harder; it's about working smarter. We build robust internal systems and automations that eliminate chaos, reduce errors, and free your team to focus on high-impact work."
    },
    {
      id: "partnership",
      title: "Your Success is the Only Metric.",
      text: "We are not a vendor; we are your execution partner. Every decision we make is filtered through a single question: \"Does this serve our client's ultimate success?\" This is client-alignment."
    },
    {
      id: "technology",
      title: "Reliable Tech Over Trendy Tech.",
      text: "We deliberately choose proven, \"boring\" technology. Why? Because it's scalable, secure, and allows us to build faster and more reliably. Your business runs on results, not on hype."
    },
    {
      id: "mission",
      title: "We Bridge the Execution Gap.",
      text: "The world has enough ideas. What it lacks is disciplined execution. Delpat was founded on one conviction: to be the bridge that turns brilliant, ambitious ideas into real-world impact."
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-3xl"
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-accent/5 via-primary/5 to-secondary/5 rounded-full blur-3xl"
          animate={shouldReduceMotion ? undefined : {
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0]
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            variants={titleVariants}
          >
            <span className="text-foreground">From the Execution Engine:</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Core Principles
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={titleVariants}
          >
            The core beliefs that guide every project, every line of code, and every client partnership.
          </motion.p>
        </motion.div>

        {/* 3-2 Grid Layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-8 md:space-y-12"
        >
          {/* First row - 3 cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {principles.slice(0, 3).map((principle, index) => (
              <motion.div
                key={principle.id}
                variants={cardVariants}
                className="w-full"
              >
                <motion.div
                  className="group relative h-full min-h-[280px] bg-gradient-to-br from-card/95 via-card/90 to-card/85 border border-border/20 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                  whileHover={shouldReduceMotion ? undefined : {
                    scale: 1.03,
                    y: -8,
                    rotateX: 5,
                    rotateY: index % 2 === 0 ? 2 : -2
                  }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  {/* Refined glow */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-secondary/25 via-accent/25 to-primary/25 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Subtle pattern */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Corner accent */}
                  <div className="absolute top-6 right-6 w-8 h-8 border-2 border-accent/30 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                  
                  <div className="relative z-20 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        className="w-12 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mb-6"
                        whileHover={{ scaleX: 1.2 }}
                      />
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground/85 leading-relaxed text-base md:text-lg font-light">
                      {principle.text}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row - 2 cards centered */}
          <motion.div
            variants={containerVariants}
            className="flex justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
              {principles.slice(3, 5).map((principle, index) => (
                <motion.div
                  key={principle.id}
                  variants={cardVariants}
                  className="w-full"
                >
                  <motion.div
                    className="group relative h-full min-h-[280px] bg-gradient-to-br from-card/95 via-card/90 to-card/85 border border-border/20 rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                    whileHover={shouldReduceMotion ? undefined : {
                      scale: 1.03,
                      y: -8,
                      rotateX: 5,
                      rotateY: index % 2 === 0 ? 2 : -2
                    }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  >
                    {/* Refined glow */}
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-secondary/25 via-accent/25 to-primary/25 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Corner accent */}
                    <div className="absolute top-6 right-6 w-8 h-8 border-2 border-accent/30 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                    
                    <div className="relative z-20 h-full flex flex-col justify-between">
                      <div>
                        <motion.div
                          className="w-12 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mb-6"
                          whileHover={{ scaleX: 1.2 }}
                        />
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                          {principle.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground/85 leading-relaxed text-base md:text-lg font-light">
                        {principle.text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutionEngine;

