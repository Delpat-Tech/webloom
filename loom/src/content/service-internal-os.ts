import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'what-we-do/internal-os',
  title: 'Internal OS | Delpat',
  kicker: 'Internal OS',
  headline: 'Systems that run|your operations.',
  lead: 'Core systems, dashboards and integrations for your operations. The aim is to remove 20+ hours of manual work a week.',
  motif: 'warp',
  blocks: [
    {
      type: 'statement',
      text: 'One source of truth.|Not spreadsheets.',
      sub: 'We connect your tools so data moves between teams on its own.',
    },
    {
      type: 'steps',
      heading: 'How it goes',
      items: [
        { title: 'Systems audit', body: 'We map the bottlenecks. Then we define the smallest system that removes them.' },
        { title: 'Dashboards', body: 'Reporting you can rely on, in one place.' },
        { title: 'Integrations', body: 'Your tools get connected, so data flows across teams automatically.' },
        { title: 'Automation', body: 'Repetitive operations work moves into workflows.' },
        { title: 'Governance', body: 'Permissions and an audit trail are built in.' },
      ],
    },
    {
      type: 'list',
      heading: 'What we build',
      items: [
        { title: 'Custom CRMs', body: 'Internal tools shaped around how your team works.' },
        { title: 'Dashboards', body: 'KPI dashboards, reporting tools and knowledge bases.' },
        { title: 'Integrations', body: 'Notion, Airtable, Slack and n8n, connected.' },
        { title: 'Cloud and DevOps', body: 'AWS, Vercel and CI/CD pipelines.' },
        { title: 'Support', body: 'Retainers and monthly support after the build.' },
      ],
    },
    {
      type: 'quote',
      text: 'Users are loving the platform. The new features reflect their habits and usability, making it easy to learn the interface.',
      by: 'Omega Forex Team',
    },
    {
      type: 'links',
      heading: 'See it in use',
      items: [
        { label: 'Omega Forex CRM', href: '/work/omega-forex-crm', note: '30+ hours of manual work saved a week' },
        { label: 'Real Estate CRM', href: '/real-estate-crm', note: 'Our own product' },
        { label: 'All work', href: '/work', note: 'Every case study' },
      ],
    },
  ],
};
