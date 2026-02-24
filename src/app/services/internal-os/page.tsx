import { Suspense } from 'react';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';

export default function InternalOSLandingPage() {
  return (
    <Suspense fallback={null}>
      <ServiceLandingPage
        serviceId="internal-os"
        title="Internal OS"
        subtitle="Core systems, dashboards, and digital infrastructure for operations and scalability."
        description="Eliminate 20+ hours of manual work per week. Connect your systems and automate operational chaos."
        ctaLabel="Book Systems Audit"
        ctaTitle="Build Systems That Scale Smoothly"
        ctaSubtitle="We design and ship internal tools, dashboards, and automations that remove operational chaos and unlock consistent growth."
      />
    </Suspense>
  );
}
