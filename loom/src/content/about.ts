import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'about',
  title: 'About Delpat',
  kicker: 'About us',
  headline: 'Ideas are everywhere.|Execution is rare.',
  lead: 'Delpat is two founders who build software for other founders. We know the gap between an idea and a working product because we have crossed it ourselves.',
  motif: 'thread',
  blocks: [
    {
      type: 'prose',
      heading: 'Why we started',
      body: [
        'Delpat was founded on one conviction: a disciplined, open process can carry an idea all the way to something real.',
        'We take your vision seriously, treat your time and money with respect, and deliver results that matter.',
      ],
    },
    {
      type: 'list',
      heading: 'The two of us',
      items: [
        {
          title: 'Om Chandel',
          body: 'Founder and systems architect. Builds systems that scale and do not break.',
        },
        {
          title: 'Akash Patel',
          body: 'Founder and product lead. Turns a product vision into a working MVP, fast.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'What we hold to',
      items: [
        {
          title: 'Your success is the test',
          body: 'Every line of code and every design choice has to answer one question. Does this help the client succeed?',
        },
        {
          title: 'Exact scope, free hands',
          body: 'We pin down what gets built with precision. Then the team is free in how to build it.',
        },
        {
          title: 'Respect for time',
          body: 'Your time is finite. We protect it by being ruthless about priorities.',
        },
        {
          title: 'Long relationships',
          body: 'We choose long partnerships over short gains.',
        },
        {
          title: 'No black boxes',
          body: 'You see what we are building, why, and how far along it is.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'How we work day to day',
      items: [
        {
          title: 'Deep work',
          body: 'Four-hour focused blocks for the hard problems.',
        },
        {
          title: 'Written first',
          body: 'Thoughtful written updates instead of reactive meetings.',
        },
        {
          title: 'One owner per task',
          body: 'Every task has a clear owner.',
        },
        {
          title: 'Decisions on record',
          body: 'We document decisions, not just code.',
        },
      ],
    },
    {
      type: 'links',
      heading: 'Keep going',
      items: [
        { label: 'Our work', href: '/work', note: 'Case studies, with the numbers' },
        { label: 'How we work', href: '/how-we-work', note: 'The process, step by step' },
        { label: 'Why Delpat', href: '/why-delpat', note: 'What you get, and what you never get' },
      ],
    },
  ],
};
