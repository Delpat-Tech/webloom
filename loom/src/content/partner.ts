import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'partner',
  title: 'Partner with us | Delpat',
  kicker: 'For agencies',
  headline: 'You design.|We build.',
  lead: 'For agencies and studios that design but do not build. We do the development under your brand.',
  motif: 'thread',
  blocks: [
    {
      type: 'statement',
      text: 'Your brand.|Our build.',
      sub: 'White-label development. Your clients never know we exist.',
    },
    {
      type: 'list',
      heading: 'Why agencies work with us',
      items: [
        { title: 'White-label', body: 'We build under your brand and stay invisible to your clients.' },
        { title: 'Reliable delivery', body: 'Fixed timelines and progress you can see. No surprises.' },
        { title: 'Clean code', body: 'Code that is easy for your clients to maintain and grow.' },
        { title: 'Room to grow', body: 'Start with one project. Move to an ongoing partnership if it works.' },
      ],
    },
    {
      type: 'steps',
      heading: 'How a partnership starts',
      items: [
        {
          when: '30 mins',
          title: 'Discovery call',
          body: 'We learn about your agency, your clients and what you want from a partner.',
        },
        {
          when: '2 to 4 weeks',
          title: 'Pilot project',
          body: 'One small project, to test how we work together.',
        },
        {
          when: '1 week',
          title: 'Partnership agreement',
          body: 'We put terms, pricing and communication in writing.',
        },
        {
          when: 'Long-term',
          title: 'Ongoing collaboration',
          body: 'Regular projects and priority support.',
        },
      ],
    },
    {
      type: 'links',
      heading: 'See how we build',
      items: [
        { label: 'How we work', href: '/how-we-work', note: 'The process, step by step' },
        { label: 'What we do', href: '/what-we-do', note: 'The three services' },
        { label: 'Work', href: '/work', note: 'Case studies, with the numbers' },
      ],
    },
  ],
  cta: {
    line: 'Tell us about|your agency.',
    label: 'Start a partnership',
    href: '/contact',
  },
};
