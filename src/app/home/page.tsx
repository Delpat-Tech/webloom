'use client';

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SocialProofSection from "@/components/sections/SocialProof";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FounderQuote from "@/components/sections/FounderQuote";
import GeoMap from "@/components/sections/GeoMap";
import RippleGrid from "./RippleGrid";

export default function Home() {
  // Placeholder data for props
  const clientLocations = [
    { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    { lat: 51.5074, lng: -0.1278, label: "London" },
    { lat: 28.6139, lng: 77.209, label: "Delhi" },
  ];

  // Theme detection for grid color
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTheme = () => {
        setIsDark(document.documentElement.classList.contains("dark"));
      };
      checkTheme();
      window.addEventListener("storage", checkTheme);
      // Listen for class changes (e.g., via toggle)
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => {
        window.removeEventListener("storage", checkTheme);
        observer.disconnect();
      };
    }
  }, []);

  // Use project's primary color for grid
  const gridColor = isDark ? "#73c0ed" : "#125e8a";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-16 p-4 sm:p-12 bg-background">
      {/* Hero Section replaced with RippleGrid */}
      <section className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden bg-[var(--card)] dark:bg-[var(--background)]">
        <RippleGrid
          enableRainbow={false}
          gridColor={gridColor}
          rippleIntensity={0.01}
          gridSize={12}
          gridThickness={10.0}
          fadeDistance={3.5} // stronger fade
          vignetteStrength={4.5} // strong vignette for center-only effect
          glowIntensity={0.01}
          opacity={0.7}
          gridRotation={0}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-6xl sm:text-8xl font-heading font-extrabold section-title text-center drop-shadow mb-6">
            The Operating System for Startup Execution
          </h1>
          <p className="text-lg sm:text-2xl font-body text-[var(--foreground)] text-center max-w-2xl mb-8 drop-shadow">
            We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, customized tools when no-code fails, devs are out of reach, or time is running out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="px-8 py-4 text-lg font-bold shadow-lg bg-blue-600 text-white hover:bg-blue-700">
              Get Your Free Execution Roadmap
            </Button>
            <Button variant="secondary" className="px-8 py-4 text-lg font-bold shadow-lg border border-border bg-background text-[var(--foreground)] hover:bg-muted">
              See How We Solve Your Problem
            </Button>
          </div>
        </div>
      </section>
    
      {/* Social Proof Section */}
      <section className="w-full max-w-6xl mx-auto py-8 px-4 bg-[var(--card)] dark:bg-[var(--background)] rounded-xl shadow text-center mb-8 border border-border">
        <SocialProofSection />
      </section>
      {/* Areas of Expertise */}
      <section className="w-full max-w-6xl mt-0 px-4 py-12 bg-gradient-to-br from-background to-card rounded-xl shadow-md text-center mb-8 border border-border">
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold section-title text-center mb-4 tracking-tight">
          Execution, Distilled into a Service
        </h2>
        <p className="text-lg sm:text-xl font-body text-[var(--foreground)] mb-8 max-w-2xl mx-auto">
          We solve the most common roadblocks that stall growth. Find your solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            variant="secondary"
            className="transition-transform hover:-translate-y-1 hover:shadow-lg border border-border"
          >
            MVP Engine
          </Button>
          <Button
            variant="secondary"
            className="transition-transform hover:-translate-y-1 hover:shadow-lg border border-border"
          >
            Internal OS
          </Button>
          <Button
            variant="secondary"
            className="transition-transform hover:-translate-y-1 hover:shadow-lg border border-border"
          >
            Automation MVP
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">Direct navigation to relevant service sections</span>
      </section>
      {/* Services Grid */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 bg-[var(--card)] dark:bg-[var(--background)] rounded-xl shadow-md mb-8 border border-border">
        <ServicesGrid/>
      </section>
     
      {/* Founder Quote (with provided content) */}
      <section className="w-full py-12 px-4 bg-[var(--card)] dark:bg-[var(--background)] shadow-md text-center mb-8 border border-border">
        <FounderQuote
          headline="From Our Founder"
          quote="The world has enough ideas. We're here to execute them. When no-code fails, devs are out of reach, or time is running out — that's where we shine."
          cta="Read Our Ethos"
        />
      </section>
      {/* Geo Map (with provided content) */}
      <section className="w-full max-w-6xl mx-auto py-12 px-4 bg-[var(--card)] dark:bg-[var(--background)] rounded-xl shadow text-center mb-8 border border-border">
        <GeoMap
          headline="Trusted from Pune to Global"
          description="A visual showcase of our global client base and successful projects"
          pins={clientLocations}
          cta=""
        />
        <div className="mt-6 flex justify-center">
          <Button variant="primary" className="px-8 py-4 text-lg font-bold shadow-lg bg-blue-600 text-white hover:bg-blue-700">
            Explore Our Projects
          </Button>
        </div>
      </section>
        
    
      {/* Testimonials */}
      <section className="w-full max-w-6xl mx-auto py-16 px-4 bg-gradient-to-br from-background to-card rounded-2xl shadow-lg mb-8 border border-border">
        <h2 className="text-3xl font-heading font-extrabold section-title mb-8 text-center tracking-tight">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[var(--card)] dark:bg-[var(--background)] border border-border rounded-xl shadow p-6 flex flex-col items-center text-center">
            <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v6m0-6h2" /></svg>
            <blockquote className="italic text-lg text-[var(--foreground)] mb-4">“Delpat delivered our MVP in record time!”</blockquote>
            <div className="text-primary font-semibold">— Client A</div>
          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--background)] border border-border rounded-xl shadow p-6 flex flex-col items-center text-center">
            <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v6m0-6h2" /></svg>
            <blockquote className="italic text-lg text-[var(--foreground)] mb-4">“Seamless process and great communication.”</blockquote>
            <div className="text-primary font-semibold">— Client B</div>
          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--background)] border border-border rounded-xl shadow p-6 flex flex-col items-center text-center">
            <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v6m0-6h2" /></svg>
            <blockquote className="italic text-lg text-[var(--foreground)] mb-4">“Highly recommend for startups!”</blockquote>
            <div className="text-primary font-semibold">— Client C</div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full py-12 px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl shadow-lg text-center mb-8 border border-border">
        <div className="flex flex-col items-center gap-6">
          <div className="text-3xl font-heading font-extrabold section-title mb-4 text-center text-white">Ready to build? Book a Discovery Call!</div>
          <Button variant="primary" className="px-8 py-4 text-lg font-bold shadow-lg bg-blue-600 text-white hover:bg-blue-700">
            Book Now
          </Button>
        </div>
      </section>
    </div>
  );
} 