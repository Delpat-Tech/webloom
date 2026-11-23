import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'how-we-work',
  title: 'How we work | Delpat',
  kicker: 'How we work',
  headline: 'Seven steps.|No surprises.',
  lead: 'A clear process from first contact to handover. You know what is happening at every stage.',
  motif: 'weave',
  blocks: [
    {
      type: 'steps',
      heading: 'Before the build',
      items: [
        {
          when: 'Within 24 hours',
          title: 'Initial contact',
          body: 'Reach out on any channel and a person replies within a day. No bots. You leave with a discovery call booked.',
        },
        {
          when: '1 to 2 days',
          title: 'Discovery and scoping',
          body: 'We dig into what you need and why. It all goes into one shared document: scope, architecture, milestones.',
        },
        {
          when: '1 to 2 days',
          title: 'Proposal and agreement',
          body: 'A fixed-price proposal with timeline, deliverables and terms. No hidden fees. You sign when it makes sense.',
        },
        {
          when: '1 day',
          title: 'Kickoff and planning',
          body: 'You meet the team and we set up the channels. You get a project dashboard and a milestone calendar.',
        },
      ],
    },
    {
      type: 'steps',
      heading: 'The build',
      items: [
        {
          when: '4 to 6 weeks',
          title: 'Development sprint',
          body: 'We build. You get a working demo every week and can track progress live.',
        },
        {
          when: '3 to 5 days',
          title: 'Review and QA',
          body: 'Full testing, live review sessions and final fixes. You see exactly what you are getting before launch.',
        },
        {
          when: '1 week',
          title: 'Launch and handover',
          body: 'Production deployment, documentation and team training. Then 30 days of support.',
        },
      ],
    },
    {
      type: 'statement',
      text: 'No black boxes.|You see everything.',
    },
    {
      type: 'list',
      heading: 'How you stay in the loop',
      items: [
        { title: 'A live dashboard', body: 'Progress, timeline and the status of each deliverable.' },
        { title: 'Daily updates', body: 'A short progress note every day, so you never wonder what is happening.' },
        { title: 'Direct access', body: 'Talk to the people building it, on Slack, email or a scheduled call.' },
      ],
    },
    {
      type: 'list',
      heading: 'What we hold to',
      items: [
        { title: 'Fixed price', body: 'Agreed before any code. No hidden fees.' },
        { title: 'No scope creep', body: 'The scope is written down first. No surprises later.' },
        { title: 'We never ghost', body: 'A person replies within 24 hours.' },
        { title: 'The code is yours', body: 'You own the source code, with the documentation to run it.' },
      ],
    },
    {
      type: 'links',
      heading: 'Next',
      items: [
        { label: 'What we do', href: '/what-we-do', note: 'The three services' },
        { label: 'Work', href: '/work', note: 'Case studies, with the numbers' },
      ],
    },
  ],
};
