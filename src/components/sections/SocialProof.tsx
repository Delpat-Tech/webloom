"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import SimpleCard from "@/components/ui/SimpleCard";

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
      className="relative text-foreground font-sans py-20 mb-24"
    >
      {/* Header Section */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-4"
        >
          <motion.p
            className="text-xs uppercase tracking-wider font-medium mb-4 text-muted-foreground"
            variants={titleVariants}
          >
            Social Proof
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            variants={titleVariants}
          >
            <span className="text-foreground">From the Feed:</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Trusted by 50+ founders
            </span>
            <br />
            <span className="text-foreground">
              and ops leaders who needed to ship fast
            </span>
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-muted-foreground"
            variants={titleVariants}
          >
            A curated snapshot of social media posts and articles showcasing our
            work, mindset, and community love.{" "}
            <span className="font-semibold text-foreground">
              Real posts. Real proof.
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* ScrollStack Cards */}

      {/* ScrollStack Cards */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex justify-center">
          <ScrollStack>
            {[
              { title: "Card 1", body: "This is the first card in the stack" },
              { title: "Card 2", body: "This is the second card in the stack" },
              { title: "Card 3", body: "This is the third card in the stack" },
              { title: "Card 4", body: "This is the fourth card in the stack" },
              { title: "Card 5", body: "This is the fifth card in the stack" },
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
                <SimpleCard className="flex flex-col gap-2 h-full">
                  <h2 className="text-xl font-heading font-bold text-primary mb-2">
                    {card.title}
                  </h2>
                  <p className="text-base text-foreground">{card.body}</p>
                </SimpleCard>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
