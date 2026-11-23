import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'why-delpat',
  title: 'Why Delpat',
  kicker: 'Why Delpat',
  headline: 'Why founders choose|Delpat over agencies',
  lead: 'We are not another development agency. We work on your product the way a co-founder would, not a contractor.',
  motif: 'mark',
  blocks: [
    {
      type: 'statement',
      text: 'You pay for outcomes,|not hours.',
      sub: 'Scope, price and timeline are fixed before any code.',
    },
    {
      type: 'list',
      heading: 'What makes us different',
      items: [
        {
          title: 'Fixed timelines',
          body: 'No endless sprints or moving goalposts. We commit to a delivery date and report progress every week.',
        },
        {
          title: 'A price you know upfront',
          body: 'Our proposals are fixed price, so you know the full cost before we start. No hidden fees.',
        },
        {
          title: 'A partner, not a contractor',
          body: 'We focus on what moves your business forward. We reply quickly and we never go quiet.',
        },
        {
          title: 'Built to grow',
          body: 'We lay solid foundations from day one, so you do not pay for technical debt later.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'Always included',
      items: [
        {
          title: 'The source code',
          body: 'You own it, along with complete project documentation.',
        },
        {
          title: 'Regular updates',
          body: 'You always know where the project stands.',
        },
        {
          title: 'Testing',
          body: 'Quality assurance testing is part of every project.',
        },
        {
          title: 'Handover and support',
          body: 'Training, a proper handover, and a support period after launch.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'Never included',
      items: [
        {
          title: 'Hidden fees',
          body: 'No surprise hourly bills, consulting charges or maintenance costs.',
        },
        {
          title: 'Scope creep',
          body: 'Nothing is added to the scope without your approval.',
        },
        {
          title: 'Lock-in',
          body: 'No vendor lock-in, no ongoing licensing fees, no platform dependency fees.',
        },
      ],
    },
    {
      type: 'links',
      heading: 'See for yourself',
      items: [
        { label: 'How we work', href: '/how-we-work', note: 'The process, step by step' },
        { label: 'Our work', href: '/work', note: 'Case studies, with the numbers' },
        { label: 'What we do', href: '/what-we-do', note: 'Products, systems, automation' },
      ],
    },
  ],
};
