import { Suspense } from 'react';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';

export default function MVPEngineLandingPage() {
  return (
    <Suspense fallback={null}>
      <ServiceLandingPage
        serviceId="mvp-engine"
        title="MVP Engine"
        subtitle="Rapid prototyping, product-market fit, and go-to-market for early-stage startups and teams."
        description="Go from idea to live product in an average of 6 weeks. Fixed timeline, zero surprises."
        ctaLabel="Book MVP Sprint Call"
        ctaTitle="Launch Your MVP With Clarity"
        ctaSubtitle="From scope to shipping, we help you launch faster with a product foundation built for real user traction."
      />
    </Suspense>
  );
}
