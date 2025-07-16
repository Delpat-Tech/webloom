'use client';

import Button from "@/components/ui/Button";
import TiltedCard from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import SocialProofSection from "@/components/sections/SocialProof";
import ServicesGrid from "@/components/sections/ServicesGrid";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 p-8 sm:p-20 bg-background">
      <Heading level={1} color="primary" variant="gradient" className="mb-4">
        Welcome to Delpat Sample Homepage
      </Heading>
      <TiltedCard
        imageSrc="/public/images/clients/sample.jpg"
        altText="Sample Card Image"
        captionText="This is a sample TiltedCard component."
        containerHeight="320px"
        containerWidth="320px"
        imageHeight="320px"
        imageWidth="320px"
        showMobileWarning={false}
        showTooltip={true}
      />
      <Button variant="primary" onClick={() => alert('Button clicked!')}>
        Sample Button
      </Button>
      {/* Social Proof Section for testing */}
      <div className="w-full mt-12">
        <SocialProofSection />
      </div>
       {/* Social Proof Section for testing */}
       <div className="w-full mt-12">
        <ServicesGrid/>
      </div>
    </div>
  );
} 