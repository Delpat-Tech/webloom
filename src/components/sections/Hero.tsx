import React from "react";
import { HeroProps } from "@/types";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}) => (
  <section className="text-center py-12">
    <Heading level={1} className="text-5xl sm:text-7xl font-heading font-extrabold section-title text-center mb-6 text-foreground">{title}</Heading>
    <p className="text-xl sm:text-2xl font-body text-foreground text-center mb-8">{subtitle}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button variant="primary" onClick={() => console.log("Clicked")}>
        {primaryCTA}
      </Button>
      <Button variant="secondary" onClick={() => console.log("Clicked")}>
        {secondaryCTA}
      </Button> </div>
  </section>
);

export default Hero;
