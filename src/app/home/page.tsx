'use client';

import React from "react";
import Button from "@/components/ui/Button";
import TiltedCard from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import SocialProofSection from "@/components/sections/SocialProof";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PersonaSection from "@/components/sections/PersonaSection";
import Hero from "@/components/sections/Hero";
import FounderQuote from "@/components/sections/FounderQuote";
import GeoMap from "@/components/sections/GeoMap";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  // Placeholder data for props
  const logoUrls = [
    "/images/clients/sample1.svg",
    "/images/clients/sample2.svg",
    "/images/clients/sample3.svg",
  ];
  const clientLocations = [
    { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    { lat: 51.5074, lng: -0.1278, label: "London" },
    { lat: 28.6139, lng: 77.209, label: "Delhi" },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-16 p-4 sm:p-12 bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section (with Heading, TiltedCard, Button) */}
      <section className="w-full flex flex-col items-center gap-8 py-16 bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-lg mb-8">
        <Heading level={1} color="primary" variant="gradient" className="mb-4 text-4xl sm:text-5xl font-extrabold text-center tracking-tight">
          The Operating System for Startup Execution
        </Heading>
        <TiltedCard
          imageSrc="/images/clients/hero.jpg"
          altText="Startup Execution Illustration"
          captionText="We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, customized tools when no-code fails, devs are out of reach, or time is running out."
          containerHeight="320px"
          containerWidth="320px"
          imageHeight="320px"
          imageWidth="320px"
          showMobileWarning={false}
          showTooltip={true}
        />
        <Button variant="primary" className="mt-6 px-8 py-4 text-lg font-bold shadow-md hover:scale-105 transition-transform" onClick={() => {/* TODO: Add CTA action */}}>
          Get Your Free Execution Roadmap
        </Button>
      </section>
      {/* Hero Section (new, with provided content) */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4 bg-white rounded-xl shadow-md text-center mb-8">
        <Hero
          title="The Operating System for Startup Execution"
          subtitle="We bridge the execution gap for ambitious founders and teams — turning ideas into powerful, customized tools when no-code fails, devs are out of reach, or time is running out."
          primaryCTA="Get Your Free Execution Roadmap"
          secondaryCTA="See How We Solve Your Problem"
        />
      </section>
      {/* Social Proof Section */}
      <section className="w-full max-w-4xl mx-auto py-8 px-4 bg-blue-50 rounded-xl shadow text-center mb-8">
        <SocialProofSection
          logos={logoUrls}
          caption="Trusted by 100+ founders and ops leaders who needed to ship fast"
        />
      </section>
      {/* Areas of Expertise */}
      <section className="w-full mt-0 px-4 py-12 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">
          Execution, Distilled into a Service
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
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
        <span className="text-sm text-gray-500">Direct navigation to relevant service sections</span>
      </section>
      {/* Services Grid */}
      <section className="w-full max-w-5xl mx-auto py-12 px-4 bg-white rounded-xl shadow-md mb-8">
        <ServicesGrid/>
      </section>
      {/* Persona Section (restored) */}
      <section className="w-full max-w-5xl mx-auto py-12 px-4 bg-blue-50 rounded-xl shadow mb-8">
        <PersonaSection />
      </section>
      {/* Founder Quote (with provided content) */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4 bg-white rounded-xl shadow-md text-center mb-8">
        <FounderQuote
          headline="From Our Founder"
          quote="The world has enough ideas. We're here to execute them. When no-code fails, devs are out of reach, or time is running out — that's where we shine."
          cta="Read Our Ethos"
        />
      </section>
      {/* Geo Map (with provided content) */}
      <section className="w-full max-w-4xl mx-auto py-12 px-4 bg-blue-50 rounded-xl shadow text-center mb-8">
        <GeoMap
          headline="Trusted from Pune to Global"
          description="A visual showcase of our global client base and successful projects"
          pins={clientLocations}
          cta="Explore Our Projects"
        />
      </section>
      {/* Testimonials */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg mb-8">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center tracking-tight">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-blue-100 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v6m0-6h2" /></svg>
            <blockquote className="italic text-lg text-gray-700 mb-4">“Delpat delivered our MVP in record time!”</blockquote>
            <div className="text-blue-700 font-semibold">— Client A</div>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v6m0-6h2" /></svg>
            <blockquote className="italic text-lg text-gray-700 mb-4">“Seamless process and great communication.”</blockquote>
            <div className="text-blue-700 font-semibold">— Client B</div>
          </div>
          <div className="bg-white border border-blue-100 rounded-xl shadow p-6 flex flex-col items-center text-center">
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2m0 0v6m0-6h2" /></svg>
            <blockquote className="italic text-lg text-gray-700 mb-4">“Highly recommend for startups!”</blockquote>
            <div className="text-blue-700 font-semibold">— Client C</div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full max-w-3xl mx-auto py-12 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg text-center mb-8">
        <CTASection ctaText="Ready to build? Book a Discovery Call!" buttonText="Book Now" />
      </section>
    </div>
  );
} 