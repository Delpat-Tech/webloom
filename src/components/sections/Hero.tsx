import React from "react";
import { HeroProps } from "@/types";

const Hero: React.FC<HeroProps> = ({ title, subtitle, primaryCTA, secondaryCTA }) => (
  <section className="text-center py-12">
    <h1 className="text-5xl sm:text-7xl font-heading font-extrabold section-title text-center mb-6">{title}</h1>
    <p className="text-xl sm:text-2xl font-body text-[var(--foreground)] text-center mb-8">{subtitle}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn btn-primary">{primaryCTA}</button>
      <button className="btn btn-secondary">{secondaryCTA}</button>
    </div>
  </section>
);

export default Hero; 