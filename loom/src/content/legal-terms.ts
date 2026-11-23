import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'legal/terms',
  title: 'Terms & Conditions | Delpat',
  kicker: 'Legal',
  headline: 'Terms &|Conditions',
  lead: 'Last updated: October 2026',
  motif: 'tangle',
  blocks: [
    {
      type: 'prose',
      body: [
        "Welcome to Delpat. These terms outline how you can use our services. We've written them in plain English to keep things transparent and straightforward.",
        'This website is operated by Delpat LLP, a limited liability partnership registered in India. Contact: info@delpat.in.',
      ],
    },
    {
      type: 'prose',
      heading: 'How to Use Our Platform',
      body: [
        "What's Encouraged:",
        'Explore our services and solutions',
        'Share constructive feedback',
        'Connect with us for genuine business inquiries',
        "What's Not Allowed:",
        'Attempting to breach security or disrupt our services',
        'Using our content or branding without explicit permission',
        'Engaging in any illegal or harmful activities',
      ],
    },
    {
      type: 'prose',
      heading: 'Content & Intellectual Property',
      body: [
        'All materials on this website, including text, graphics, logos, designs, and code, are owned by Delpat or our licensed partners. This represents years of creative work and innovation.',
        'Need to use our content?',
        "We're happy to discuss licensing opportunities. Just reach out to us first.",
      ],
    },
    {
      type: 'prose',
      heading: 'Your Content & Privacy',
      body: [
        'When you share feedback, testimonials, or project information with us, you grant us permission to use this content to improve our services and showcase our work.',
        'Our Privacy Promise:',
        "We'll always ask before sharing anything publicly",
        'Your personal information stays protected',
        'We only use your content to better serve you and future clients',
      ],
    },
    {
      type: 'prose',
      heading: 'Important Disclaimers',
      body: [
        "Service Accuracy: We strive for accuracy and keep our content up-to-date, but we can't guarantee perfection. Technology and business environments change rapidly.",
        'Limitation of Liability: While we work hard to provide reliable services, Delpat cannot be held responsible for any indirect losses or damages resulting from your use of our website or services.',
      ],
    },
    {
      type: 'prose',
      heading: 'External Links & Third Parties',
      body: [
        "Our website may contain links to external sites and resources that we find valuable. However, we don't control these third-party sites and aren't responsible for their content, privacy practices, or terms of service.",
        'Always review the terms and privacy policies of external sites before sharing personal information.',
      ],
    },
    {
      type: 'prose',
      heading: 'Terms Updates',
      body: [
        "As we grow and improve our services, these terms may need updates. We'll always notify users of significant changes, and continued use of our services indicates acceptance of updated terms.",
        "We'll email users about major changes",
      ],
    },
    {
      type: 'prose',
      heading: 'Questions About These Terms?',
      body: [
        "We believe in clear communication. If anything isn't clear or you need clarification, we're here to help.",
        'info@delpat.in',
      ],
    },
    {
      type: 'links',
      items: [
        { label: 'info@delpat.in', href: 'mailto:info@delpat.in' },
        { label: 'Privacy Policy', href: '/legal/privacy' },
      ],
    },
  ],
};
