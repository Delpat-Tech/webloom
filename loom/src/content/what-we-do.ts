import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'what-we-do',
  title: 'What we do | Delpat',
  kicker: 'What we do',
  headline: 'Three ways|we build.',
  lead: 'Products, internal systems and automation. Each has a clear scope, a clear timeline and a clear outcome.',
  motif: 'warp',
  blocks: [
    {
      type: 'list',
      heading: 'The three services',
      items: [
        {
          title: 'MVP Engine',
          body: 'A live product for early-stage startups and teams. SaaS MVPs, client-facing dashboards and mobile app prototypes.',
        },
        {
          title: 'Internal OS',
          body: 'The systems a business runs on. Custom CRMs, automated reporting and operational dashboards.',
        },
        {
          title: 'Automation MVP',
          body: 'Workflows that take over repetitive work. Data scraping and processing, lead nurturing and tool integrations.',
        },
      ],
    },
    {
      type: 'links',
      heading: 'Look closer',
      items: [
        { label: 'MVP Engine', href: '/what-we-do/mvp-engine', note: 'Idea to live product' },
        { label: 'Internal OS', href: '/what-we-do/internal-os', note: 'Systems and dashboards' },
        { label: 'Automation MVP', href: '/what-we-do/automation-mvp', note: 'Workflows and integrations' },
      ],
    },
    {
      type: 'list',
      heading: 'How we can work together',
      items: [
        {
          title: 'Project-based',
          body: 'Fixed scope, fixed timeline, fixed cost. Post-launch support is included.',
        },
        {
          title: 'Monthly retainer',
          body: 'Ongoing development and maintenance at a predictable monthly cost. Scope can change as you go.',
        },
        {
          title: 'Dedicated team',
          body: 'Developers who work only on your projects. For commitments of 3 months or more.',
        },
        {
          title: 'Hourly consulting',
          body: 'Advice and quick fixes as needed. No long-term commitment.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'Add-ons',
      items: [
        {
          title: 'AI integration',
          body: 'Custom chatbots, content generation and automation features added to your application.',
        },
        {
          title: 'UI/UX design',
          body: 'A design system, prototypes, user testing and responsive design.',
        },
        {
          title: 'Something custom',
          body: 'For projects that do not fit a standard service. We scope, design and build it from the ground up.',
        },
      ],
    },
    {
      type: 'links',
      heading: 'Next',
      items: [
        { label: 'How we work', href: '/how-we-work', note: 'The process, step by step' },
        { label: 'Work', href: '/work', note: 'Case studies, with the numbers' },
      ],
    },
  ],
};
