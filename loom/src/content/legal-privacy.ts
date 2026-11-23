import type { PageDoc } from './types';

export const page: PageDoc = {
  slug: 'legal/privacy',
  title: 'Privacy Policy | Delpat',
  kicker: 'Legal',
  headline: 'Privacy|Policy',
  lead: 'Last updated: October 2026',
  motif: 'tangle',
  blocks: [
    {
      type: 'prose',
      body: [
        "At Delpat, your privacy isn't just a policy, it's a promise. We're here to help you execute, not to sell your data or waste your trust. This page explains exactly what we collect, why we need it, and how we protect it.",
        'No Data Sales',
        'Industry Security',
        'Full Transparency',
      ],
    },
    {
      type: 'prose',
      heading: 'Who We Are',
      body: [
        "This website is operated by Delpat LLP, a limited liability partnership registered in India. Contact: info@delpat.in. Each Delpat software product has its own privacy policy, published on that product's website.",
      ],
    },
    {
      type: 'prose',
      heading: 'What Information We Collect',
      body: [
        'Contact Information:',
        'Name and email address',
        'Company and job title',
        'Project details and requirements',
        'Communication preferences',
        'Only collected when you reach out or work with us',
        'Usage Analytics:',
        'Pages visited and time spent',
        'Device type and browser info',
        'Geographic location (city level)',
        'Referral sources',
        'Anonymized data to improve our website',
      ],
    },
    {
      type: 'prose',
      heading: 'How We Use Your Information',
      body: [
        'Service Delivery: Responding to inquiries, delivering projects, and providing ongoing support for our services.',
        'Website Improvement: Understanding how visitors use our site to optimize performance and create better user experiences.',
        'Important Communications: Sending project updates, service announcements, and policy changes. No spam, ever, we promise.',
      ],
    },
    {
      type: 'prose',
      heading: 'Cookies & Website Tracking',
      body: [
        'We use cookies and similar technologies to enhance your browsing experience and understand how our website performs.',
        'Essential Cookies: Required for basic website functionality, security, and user preferences.',
        'Analytics Cookies: Help us understand visitor behavior to improve our website and services.',
        'Your Choice: You can disable cookies in your browser settings at any time.',
      ],
    },
    {
      type: 'prose',
      heading: 'Data Security',
      body: [
        'Industry-standard encryption',
        'Secure data transmission (HTTPS)',
        'Regular security audits',
        'Limited access controls',
        'While no system is 100% secure, we continuously invest in protecting your information and take your trust seriously.',
      ],
    },
    {
      type: 'prose',
      heading: 'Third-Party Services',
      body: [
        'We work with trusted partners to provide better services:',
        'Analytics Providers: Help us understand website usage patterns',
        'Email Services: Secure communication and updates',
        'Hosting Providers: Reliable and secure website infrastructure',
        'All partners must meet our privacy and security standards.',
      ],
    },
    {
      type: 'prose',
      heading: 'Your Privacy Rights',
      body: [
        "You have complete control over your personal information. Here's what you can do:",
        'Access: See what data we have about you',
        'Update: Correct or modify your information',
        'Delete: Remove your data from our systems',
        "Want to exercise any of these rights? Just send us an email, we'll respond within 48 hours.",
        'info@delpat.in',
      ],
    },
    {
      type: 'prose',
      heading: 'Policy Updates',
      body: [
        "As we evolve our services, this privacy policy may need updates. We believe in transparency, so we'll always notify you of significant changes.",
        'Our Promise: Major changes will be communicated via email with at least 30 days notice.',
      ],
    },
    {
      type: 'prose',
      heading: 'Questions About Your Privacy?',
      body: [
        "We're real people who care about your privacy. If you have any questions or concerns, don't hesitate to reach out, we're here to help.",
        'info@delpat.in',
      ],
    },
    {
      type: 'links',
      items: [
        { label: 'info@delpat.in', href: 'mailto:info@delpat.in' },
        { label: 'Terms & Conditions', href: '/legal/terms' },
      ],
    },
  ],
};
