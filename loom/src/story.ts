// Everything the home story says. One line per scene, plus the labels that sit on the thread.
// Facts come from the Delpat site's own content (process page and case studies).

export interface Scene {
  /** short name, shown in the corner counter */
  name: string;
  /** the statement; the part after "|" is tinted */
  line: string;
  /** one supporting line, optional */
  sub?: string;
}

export const SCENES: Scene[] = [
  { name: 'The tangle', line: 'Every idea starts|as a tangle.', sub: 'Delpat is two founders who build software for other founders.' },
  { name: 'One thread', line: 'We pull it into|one thread.', sub: 'One scope. One fixed price. Agreed before any code.' },
  { name: 'Three ways', line: 'Three ways|we build.' },
  { name: 'The weave', line: 'Row by row.|A demo every week.' },
  { name: 'Proof', line: 'Numbers,|not promises.' },
  { name: 'Your turn', line: 'Bring us your|loose end.' },
];

/** The three bands of the warp: one per service. */
export const BANDS = [
  { label: 'Products', href: '/what-we-do/mvp-engine' },
  { label: 'Systems', href: '/what-we-do/internal-os' },
  { label: 'Automation', href: '/what-we-do/automation-mvp' },
];

/** How a project goes. Tags that appear on the cloth as the weave reaches them. */
export const MILESTONES = [
  { when: 'Day 1', what: 'A person replies' },
  { when: 'First', what: 'A fixed price and scope' },
  { when: 'Every week', what: 'A working demo' },
  { when: 'Launch', what: 'The code is yours' },
  { when: 'After', what: '30 days of support' },
];

/** Exactly eight swatches: six client results, Delpat's own product, and the rest. */
export const PROOF = [
  { name: 'Redflag.io', result: 'Idea to live AI product in 4 weeks', href: '/work/red-flag-app' },
  { name: 'LiveOak.ai', result: 'A full automation in under 48 hours', href: '/work/grant-report-generator-v1' },
  { name: 'MuscleMentor', result: 'Taking payments in 10 business days', href: '/work/muscle-mentor-stripe' },
  { name: 'Omega Forex', result: '30+ hours of manual work saved a week', href: '/work/omega-forex-crm' },
  { name: 'CustomAssess', result: 'Quote to payment, 90% faster', href: '/work/custom-assess' },
  { name: 'Aditya Media', result: 'Email deliverability from 60% to 90%', href: '/work/email-automation' },
  { name: 'Real Estate CRM', result: 'Our own product', href: '/real-estate-crm' },
  { name: 'All the rest', result: 'Every case study, with the numbers', href: '/work' },
];

export const CONTACT = '/contact';
