import React from "react";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, primaryCTA, secondaryCTA }) => (
  <section className="text-center py-12">
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-lg mb-6">{subtitle}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="btn btn-primary">{primaryCTA}</button>
      <button className="btn btn-secondary">{secondaryCTA}</button>
    </div>
  </section>
);

export default Hero; 