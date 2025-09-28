'use client';

import React from 'react';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';

/**
 * TriptychCTA
 * - Three subtle vertical panels in the background
 * - Three guide lines aligned to panel centers
 * - Centered headline with primary and secondary actions
 * - Fully theme-aware (light/dark) via CSS variables
 */
export default function TriptychCTA() {
  return (
    <section className="relative w-full px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="relative max-w-6xl mx-auto">
        {/* Ambient gradient halo aligned with site theme */}
        <div className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-gradient-to-r from-primary/15 via-accent/10 to-secondary/15 blur-3xl rounded-full" />

        <div className="relative rounded-3xl bg-card/90 dark:bg-card/70 backdrop-blur-xl border border-border shadow-2xl overflow-hidden">
          {/* Top gradient rule */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary" />

          <div className="px-6 md:px-12 py-12 md:py-16 text-center">
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              See How We Build for You
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Move from exploration to evidence. Review our results or map your path forward.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/proof" className="group inline-block">
                <Button
                  className="relative px-6 md:px-8 py-3 md:py-3.5 rounded-xl bg-primary text-primary-foreground hover:brightness-110
                             transition-transform duration-200 group-hover:scale-[1.03]"
                >
                  View Our Proof of Work
                </Button>
              </Link>

              <Link href="/what-we-do" className="group inline-block">
                <Button
                  className="px-6 md:px-8 py-3 md:py-3.5 rounded-xl border border-foreground/40 text-foreground bg-transparent
                             hover:border-foreground hover:text-foreground transition-colors duration-200"
                  variant="tertiary"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


