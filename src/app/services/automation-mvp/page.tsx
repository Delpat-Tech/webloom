import { Suspense } from 'react';
import ServiceLandingPage from '@/components/sections/ServiceLandingPage';

export default function AutomationMVPLandingPage() {
  return (
    <Suspense fallback={null}>
      <ServiceLandingPage
        serviceId="automation-mvp"
        title="Automation MVP"
        subtitle="Automating repetitive processes, intelligent workflows, and data handling."
        description="Save time and resources with AI-powered workflows that run continuously with lower manual effort."
        ctaLabel="Book Automation Discovery"
        ctaTitle="Automate the Work That Slows You Down"
        ctaSubtitle="We build practical AI-driven workflows and integrations that cut manual effort and keep your operations moving."
      />
    </Suspense>
  );
}
