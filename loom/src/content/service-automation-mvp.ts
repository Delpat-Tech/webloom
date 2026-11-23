import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'what-we-do/automation-mvp',
  title: 'Automation MVP | Delpat',
  kicker: 'Automation MVP',
  headline: 'Automate the work|that slows you down.',
  lead: 'Workflows for repetitive processes and data handling, with AI where it helps. Less manual effort, fewer manual fixes.',
  motif: 'warp',
  blocks: [
    {
      type: 'statement',
      text: 'People where it matters.|Automation where it does not.',
      sub: 'We start with the automations that save the most.',
    },
    {
      type: 'steps',
      heading: 'How it goes',
      items: [
        { title: 'Workflow mapping', body: 'We find the automations with the highest payoff and do those first.' },
        { title: 'Integrations', body: 'CRMs, documents, email and internal tools get connected end to end.' },
        { title: 'Data pipelines', body: 'Clean inputs and reliable outputs.' },
        { title: 'AI assist', body: 'AI does the routine part. A person stays in the loop where it matters.' },
        { title: 'Monitoring', body: 'Visibility, alerts and safeguards keep the workflows stable.' },
      ],
    },
    {
      type: 'list',
      heading: 'What we automate',
      items: [
        { title: 'Data', body: 'Scraping, processing, data sync and reporting.' },
        { title: 'Email', body: 'Outreach and lead nurturing.' },
        { title: 'Hiring', body: 'Job reposting and resume tools.' },
        { title: 'Tool to tool', body: 'n8n workflows and API integrations between the tools you already use.' },
      ],
    },
    {
      type: 'quote',
      text: "Work completed exactly as requested and ahead of schedule. I'll be working with him again.",
      by: 'Eric Stockmeyer, LiveOak.ai',
    },
    {
      type: 'links',
      heading: 'Case studies',
      items: [
        { label: 'LiveOak.ai', href: '/work/grant-report-generator-v1', note: 'A full automation in under 48 hours' },
        { label: 'CustomAssess', href: '/work/custom-assess', note: 'Quote to payment, 90% faster' },
        { label: 'Aditya Media', href: '/work/email-automation', note: 'Email deliverability from 60% to 90%' },
      ],
    },
  ],
};
