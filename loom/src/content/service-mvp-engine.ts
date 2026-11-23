import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'what-we-do/mvp-engine',
  title: 'MVP Engine | Delpat',
  kicker: 'MVP Engine',
  headline: 'From idea|to live product.',
  lead: 'For early-stage startups and teams. Idea to live product in an average of 6 weeks, on a fixed timeline.',
  motif: 'warp',
  blocks: [
    {
      type: 'statement',
      text: 'Scope first.|Code second.',
      sub: 'Scope, timeline and success metrics are defined before we write code.',
    },
    {
      type: 'steps',
      heading: 'How it goes',
      items: [
        { title: 'Scope sprint', body: 'We define the scope, the timeline and what success looks like.' },
        { title: 'Prototype and UX', body: 'Clickable flows you can try. They cut rework and speed up decisions.' },
        { title: 'Build and ship', body: 'We build the product and ship it, with clean code that is ready to hand over.' },
        { title: 'Launch loops', body: 'Short feedback cycles after release, so the product improves fast.' },
        { title: 'Support and handover', body: 'Post-launch support and documentation. The source code is yours.' },
      ],
    },
    {
      type: 'list',
      heading: 'What we build',
      items: [
        { title: 'SaaS MVPs', body: 'First versions of a product, and demo apps.' },
        { title: 'Web and mobile apps', body: 'Trading apps, EdTech platforms, client-facing dashboards and app prototypes.' },
        { title: 'AI features', body: 'Resume rankers and bots.' },
        { title: 'APIs and integrations', body: 'Payment, CRM and analytics APIs.' },
        { title: 'Websites and stores', body: 'Marketing sites, event platforms and e-commerce.' },
      ],
    },
    {
      type: 'quote',
      text: 'Very dedicated, great communication.',
      by: 'Jason, Founder of Redflag.io',
    },
    {
      type: 'links',
      heading: 'Case studies',
      items: [
        { label: 'Redflag.io', href: '/work/red-flag-app', note: 'Idea to live app with payments in 4 weeks' },
        { label: 'MuscleMentor', href: '/work/muscle-mentor-stripe', note: 'Live payments in 10 business days' },
        { label: 'LiveOak.ai', href: '/work/liveoak-grant-generator', note: 'An A/B testing platform for AI agents' },
      ],
    },
  ],
};
