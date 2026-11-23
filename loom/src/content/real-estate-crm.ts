import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'real-estate-crm',
  title: 'Real Estate CRM | Delpat',
  kicker: 'Our own product',
  headline: 'Every enquiry, call and listing,|in one place.',
  lead: 'Portal enquiries arrive on their own and go to an agent. Agents see who to call next, and you see what was done and what was missed.',
  motif: 'swatches',
  blocks: [
    {
      type: 'list',
      heading: 'Who it is for',
      items: [
        {
          title: 'Brokers and agencies',
          body: 'Resale and rentals, residential and commercial. Portal leads, owner calling, listings and rent agreements.',
        },
        {
          title: 'Channel partners',
          body: 'Many projects and towers at once, with leads and inventory grouped by project.',
        },
        {
          title: "Developers' sales teams",
          body: 'Portal and website enquiries shared across the team. Follow-ups and visits are visible per person.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'What it does',
      items: [
        {
          title: 'Leads and follow-ups',
          body: 'Enquiries become leads and go to your agents in turn. Lists show who is not contacted, going cold or overdue.',
        },
        {
          title: 'Calling owners',
          body: 'A calling list of property owners, grouped by project and tower. Callbacks come back on the agent\'s list when they are due.',
        },
        {
          title: 'Listings',
          body: 'Flats, offices, shops and warehouses, for sale or rent. Send one on WhatsApp in one tap.',
        },
        {
          title: 'For the owner',
          body: 'Each agent\'s calls, pickups and status changes, for today, 7 or 30 days. Missed follow-ups are counted per agent.',
        },
        {
          title: 'On the phone',
          body: 'Installs on Android and iPhone from the browser, with no app store. One tap to call, then record what happened.',
        },
        {
          title: 'Also included',
          body: 'Site visits logged with a selfie and location, rent and sale deals, and Excel import. WhatsApp messages in English and Marathi.',
        },
      ],
    },
    {
      type: 'list',
      heading: 'Where your leads come from',
      items: [
        {
          title: '99acres, MagicBricks, Housing.com',
          body: 'Enquiries arrive as leads, assigned to an agent.',
        },
        {
          title: 'Your website',
          body: 'Any form that can send to a web address (a webhook).',
        },
        {
          title: 'Excel and CSV',
          body: 'Bring in the leads, owners and listings you already have.',
        },
        {
          title: 'WhatsApp and calls',
          body: "Open on the agent's own phone, with the message ready.",
        },
      ],
    },
    {
      type: 'prose',
      heading: "Your firm's name on every screen",
      body: [
        'Your name, logo and colour in the app and on your own sign-in page. The app installs on phones with your logo as its icon.',
        'Each firm\'s data is kept separate. Delpat appears only as a small "Powered by".',
      ],
    },
    {
      type: 'links',
      heading: 'How to get it',
      items: [
        { label: 'Book a demo', href: '/contact', note: 'We walk you through it and answer how it would fit your team.' },
        { label: 'Login to CRM', href: 'https://realestate.delpat.in', note: 'For firms already using it.' },
        { label: 'CRM Privacy Policy', href: 'https://realestate.delpat.in/privacy' },
        { label: 'CRM Terms', href: 'https://realestate.delpat.in/terms' },
        { label: 'Data Deletion', href: 'https://realestate.delpat.in/data-deletion' },
      ],
    },
  ],
  cta: { line: 'See it with|your own leads.', label: 'Book a demo', href: '/contact' },
};
