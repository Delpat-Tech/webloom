'use client';

import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FounderQuote from "@/components/sections/FounderQuote";
import GeoMap from "@/components/sections/GeoMap";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

const logoUrls = [
  "/images/logo.svg",
  "/vercel.svg",
  "/next.svg",
  "/window.svg",
  "/file.svg",
];

const clientLocations = [
  { label: "Pune, India", x: 60, y: 70 },
  { label: "London, UK", x: 35, y: 30 },
  { label: "San Francisco, USA", x: 10, y: 50 },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-background">
      <Hero
        title="The Operating System for Startup Execution"
        subtitle="We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, customized tools when no-code fails, devs are out of reach, or time is running out."
        socialProof="Trusted by 100+ founders and ops leaders who needed to ship fast"
        primaryCTA={{ label: "Get Your Free Execution Roadmap", href: "/collaborate" }}
        secondaryCTA={{ label: "See How We Solve Your Problem", href: "/proof" }}
      />
      <SocialProof logos={logoUrls} caption="Trusted by 100+ founders and ops leaders who needed to ship fast" />
      <ServicesGrid
        headline="Execution, Distilled into a Service"
        description="We solve the most common roadblocks that stall growth. Find your solution."
      />
      <FounderQuote
        headline="From Our Founder"
        quote="The world has enough ideas. We're here to execute them. When no-code fails, devs are out of reach, or time is running out — that's where we shine."
        cta={{ label: "Read Our Ethos", href: "/about" }}
      />
      <GeoMap
        headline="Trusted from Pune to Global"
        description="A visual showcase of our global client base and successful projects"
        cta={{ label: "Explore Our Projects", href: "/proof" }}
        pins={clientLocations}
      />
      <Testimonials />
      <CTASection
        text="Ready to bridge your execution gap? Get your free roadmap today."
        cta={{ label: "Get Your Free Execution Roadmap", href: "/collaborate" }}
      />
    </main>
  );
} 