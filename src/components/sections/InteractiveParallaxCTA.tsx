"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "@/components/ui/Link";
import Button from "@/components/ui/Button";

const InteractiveParallaxCTA = () => {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Create transforms for 3 blobs with different depths
  const blob1X = useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "20%"]);
  const blob1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "20%"]);
  const blob2X = useTransform(mouseXSpring, [-0.5, 0.5], ["15%", "-15%"]);
  const blob2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["15%", "-15%"]);
  const blob3X = useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]);
  const blob3Y = useTransform(mouseYSpring, [-0.5, 0.5], ["10%", "-10%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl overflow-hidden bg-card dark:bg-card"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-transparent),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,var(--primary-transparent),#0f172a)] opacity-70 dark:opacity-50" />
        
        {/* Aurora Blobs */}
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ x: blob1X, y: blob1Y }}
          className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-accent/20 dark:bg-accent/40 blur-3xl filter opacity-80"
        />
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ x: blob2X, y: blob2Y }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/20 dark:bg-accent/30 blur-3xl filter opacity-70"
        />
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ x: blob3X, y: blob3Y }}
          className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-primary/10 dark:bg-accent/20 blur-3xl filter opacity-60"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 min-h-[24rem]">
        <div className="w-full max-w-4xl rounded-2xl bg-card/80 dark:bg-card/50 p-8 text-center backdrop-blur-2xl border border-border/20 dark:border-border/10 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground dark:text-card-foreground mb-4">
            Ready to experience the difference?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with a simple conversation. No commitments, no pressure - just clarity on how we can help.
          </p>
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-block"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300" />
              <Button className="relative px-10 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:from-primary/90 hover:to-accent/90 text-primary-foreground border-0 rounded-xl shadow-md flex items-center gap-3">
                Book a Discovery Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveParallaxCTA;