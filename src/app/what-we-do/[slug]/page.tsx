import ServiceLandingPage from '@/components/sections/ServiceLandingPage';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

type ServiceConfig = {
  serviceId: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
};

const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  'mvp-engine': {
    serviceId: 'mvp-engine',
    title: 'MVP Engine',
    subtitle:
      'Rapid prototyping, product-market fit, and go-to-market for early-stage startups and teams.',
    description:
      'Go from idea to live product in an average of 6 weeks. Fixed timeline, zero surprises.',
    ctaLabel: 'Book MVP Sprint Call',
    ctaTitle: 'Launch Your MVP With Clarity',
    ctaSubtitle:
      'From scope to shipping, we help you launch faster with a product foundation built for real user traction.',
  },
  'internal-os': {
    serviceId: 'internal-os',
    title: 'Internal OS',
    subtitle:
      'Core systems, dashboards, and digital infrastructure for operations and scalability.',
    description:
      'Eliminate 20+ hours of manual work per week. Connect your systems and automate operational chaos.',
    ctaLabel: 'Book Systems Audit',
    ctaTitle: 'Build Systems That Scale Smoothly',
    ctaSubtitle:
      'We design and ship internal tools, dashboards, and automations that remove operational chaos and unlock consistent growth.',
  },
  'automation-mvp': {
    serviceId: 'automation-mvp',
    title: 'Automation MVP',
    subtitle: 'Automating repetitive processes, intelligent workflows, and data handling.',
    description:
      'Save time and resources with AI-powered workflows that run continuously with lower manual effort.',
    ctaLabel: 'Book Automation Discovery',
    ctaTitle: 'Automate the Work That Slows You Down',
    ctaSubtitle:
      'We build practical AI-driven workflows and integrations that cut manual effort and keep your operations moving.',
  },
};

export function generateStaticParams() {
  return [
    { slug: 'mvp-engine' },
    { slug: 'internal-os' },
    { slug: 'automation-mvp' },
  ];
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === 'mvg-engine') {
    redirect('/what-we-do/mvp-engine');
  }

  const config = SERVICE_CONFIGS[slug];
  if (!config) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <ServiceLandingPage {...config} />
    </Suspense>
  );
}