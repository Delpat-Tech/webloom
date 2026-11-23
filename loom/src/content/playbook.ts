import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'playbook',
  title: 'Playbook | Delpat',
  kicker: 'The playbook',
  headline: 'What we learn|while we build.',
  lead: 'Essays, teardowns and frameworks from our delivery work. Written to help you get from an idea to something real.',
  motif: 'tangle',
  blocks: [
    {
      type: 'statement',
      text: 'Notes from|the build.',
      sub: 'Everything here comes from projects we have delivered.',
    },
    {
      type: 'list',
      heading: 'What is in it',
      items: [
        { title: 'Essays', body: 'How we think about scoping, building and shipping.' },
        { title: 'Teardowns', body: 'Breakdowns of how a piece of work was done.' },
        { title: 'Frameworks', body: 'Steps you can use on your own project.' },
      ],
    },
    {
      type: 'prose',
      heading: 'More on the way',
      body: ['We are still writing. New pieces appear here as we publish them.'],
    },
    {
      type: 'links',
      heading: 'In the meantime',
      items: [
        { label: 'Work', href: '/work', note: 'Case studies, with the numbers' },
        { label: 'How we work', href: '/how-we-work', note: 'The process, step by step' },
        { label: 'What we do', href: '/what-we-do', note: 'The three services' },
      ],
    },
  ],
  cta: {
    line: 'Still have|questions?',
    label: 'Book a discovery call',
    href: '/contact',
  },
};
