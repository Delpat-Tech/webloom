import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'who-we-help',
  title: 'Who we help',
  kicker: 'Who we help',
  headline: 'Built for people|who build.',
  lead: 'Your role may differ, but the goal is the same: deliver results, fast. Three kinds of people come to us.',
  motif: 'warp',
  blocks: [
    {
      type: 'list',
      heading: 'The founder without a technical team',
      items: [
        {
          title: 'Where you are',
          body: 'You have a validated idea, designs and a small budget. You need a working web app to put in front of first users and investors.',
        },
        {
          title: 'The risk',
          body: 'Freelance platforms are a gamble you cannot afford.',
        },
        {
          title: 'What we do',
          body: 'A fixed scope and a reliable path to launch. You stay with your customers instead of managing developers.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'The ops leader stuck in spreadsheets',
      items: [
        {
          title: 'Where you are',
          body: 'Your team spends hours a day copying data between tools by hand. Errors are common and they cost you.',
        },
        {
          title: 'The risk',
          body: 'You have tried freelancers and the results were unreliable.',
        },
        {
          title: 'What we do',
          body: 'Custom tools and dashboards built around how your team already works.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'The technical partner',
      items: [
        {
          title: 'Where you are',
          body: 'Your own engineers are at capacity, or you run an agency and need white-label delivery. You have a spec and need it built with precision.',
        },
        {
          title: 'The risk',
          body: 'Your reputation is on the line. Sloppy code or a missed deadline lands on you.',
        },
        {
          title: 'What we do',
          body: 'We work as an extension of your team and deliver client-ready work. Your core team stays on its own roadmap.',
        },
      ],
    },
    {
      type: 'links',
      heading: 'Find your way in',
      items: [
        { label: 'Products', href: '/what-we-do/mvp-engine', note: 'For founders launching an MVP' },
        { label: 'Systems', href: '/what-we-do/internal-os', note: 'For teams replacing spreadsheets' },
        { label: 'Partner with us', href: '/partner', note: 'For agencies and technical teams' },
        { label: 'Our work', href: '/work', note: 'Case studies, with the numbers' },
      ],
    },
  ],
};
