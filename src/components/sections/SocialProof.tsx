"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

const SocialProofSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

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
      className="relative text-foreground font-sans pt-20 pb-0 mb-0"
    >
      {/* Header Section - match Execution Engine style */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-4"
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
      </div>

      {/* ScrollStack Cards */}

      {/* ScrollStack Cards */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex justify-center">
          <ScrollStack>
            {[
              {
                title: "Move at the Speed of Insight.",
                body:
                  "For a founder, the most valuable asset is time. We build MVPs not just to launch a product, but to accelerate your learning. The faster you can validate an idea with real users, the more likely you are to succeed.",
              },
              {
                title: "Systems Over Chaos.",
                body:
                  "Great execution isn't about working harder; it's about working smarter. We build robust internal systems and automations that eliminate chaos, reduce errors, and free your team to focus on high-impact work.",
              },
              {
                title: "Your Success is the Only Metric.",
                body:
                  "We are not a vendor; we are your execution partner. Every decision we make is filtered through a single question: 'Does this serve our client's ultimate success?' This is client-alignment.",
              },
              {
                title: "Reliable Tech Over Trendy Tech.",
                body:
                  "We deliberately choose proven, 'boring' technology. Why? Because it's scalable, secure, and allows us to build faster and more reliably. Your business runs on results, not on hype.",
              },
              {
                title: "We Bridge the Execution Gap.",
                body:
                  "The world has enough ideas. What it lacks is disciplined execution. Delpat was founded on one conviction: to be the bridge that turns brilliant, ambitious ideas into real-world impact.",
              },
            ].map((card, index) => (
              <ScrollStackItem
                key={index}
                itemClassName="bg-card border border-border rounded-xl shadow p-6"
                index={index}
                isTop={index === 0}
                isInView={false}
                isHovered={false}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
                onClick={() => {}}
              >
                <motion.div
                  className="group relative h-full min-h-[240px] bg-gradient-to-br from-card/95 via-card/90 to-card/85 border border-border/20 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4, filter: 'hue-rotate(12deg) saturate(1.05)' }}
                >
                  {/* Refined glow */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-secondary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  {/* Subtle pattern */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-secondary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner accent */}
                  <div className="absolute top-5 right-5 w-7 h-7 border-2 border-accent/30 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        className="w-10 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mb-4"
                        whileHover={{ scaleX: 1.1 }}
                      />
                      <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight transition-colors duration-300 group-hover:text-primary">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground/90 leading-relaxed text-sm md:text-base transition-colors duration-300 group-hover:text-foreground">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
