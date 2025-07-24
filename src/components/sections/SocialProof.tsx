import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

// Main Social Proof Component
const SocialProofSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative text-foreground font-sans"
    >
      {/* Removed hardcoded background and pattern to inherit parent background */}

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
            className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary"
            variants={titleVariants}
          >
            From the Feed:{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trusted by 100+ founders
            </span>
            <br />
            <span className="text-foreground">and ops leaders who needed to ship fast</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg max-w-2xl mx-auto text-muted-foreground"
            variants={titleVariants}
          >
            A curated snapshot of social media posts and articles showcasing our work, mindset, and community love.{' '}
            <span className="font-semibold text-foreground">Real posts. Real proof.</span>
          </motion.p>
        </motion.div>
      </div>

      {/* ScrollStack Cards */}
      <div className="relative z-10 h-screen">
        <ScrollStack>
          <ScrollStackItem>
            <div className="bg-card border border-border rounded-xl shadow p-8 flex flex-col gap-2">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">Card 1</h2>
              <p className="text-base text-foreground">This is the first card in the stack</p>
            </div>
          </ScrollStackItem>
          <ScrollStackItem>
            <div className="bg-card border border-border rounded-xl shadow p-8 flex flex-col gap-2">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">Card 2</h2>
              <p className="text-base text-foreground">This is the second card in the stack</p>
            </div>
          </ScrollStackItem>
          <ScrollStackItem>
            <div className="bg-card border border-border rounded-xl shadow p-8 flex flex-col gap-2">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">Card 3</h2>
              <p className="text-base text-foreground">This is the third card in the stack</p>
            </div>
          </ScrollStackItem>
          <ScrollStackItem>
            <div className="bg-card border border-border rounded-xl shadow p-8 flex flex-col gap-2">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">Card 4</h2>
              <p className="text-base text-foreground">This is the fourth card in the stack</p>
            </div>
          </ScrollStackItem>
          <ScrollStackItem>
            <div className="bg-card border border-border rounded-xl shadow p-8 flex flex-col gap-2">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">Card 5</h2>
              <p className="text-base text-foreground">This is the fifth card in the stack</p>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
};

export default SocialProofSection;