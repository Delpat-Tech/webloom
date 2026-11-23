import { el } from '../dom';
import { hero } from './doc';

// The same booking link and address the current site uses.
const BOOKING = 'https://calendar.app.google/EcquL1pfD3PBvicq8';
const EMAIL = 'info@delpat.in';

const GOALS = [
  'I need to build a product to test my idea',
  'I want to automate manual work',
  'I need an internal tool to run operations',
  "I'm not sure yet",
];

/**
 * Contact. This project has no server of its own, so there is no form to submit:
 * the two real ways in are booking a call and writing an email. Picking a goal just
 * starts the email for you.
 */
export function contactView(into: HTMLElement) {
  const page = el('article', 'page');
  const mail = (goal?: string) =>
    `mailto:${EMAIL}?subject=${encodeURIComponent('A loose end for Delpat')}${goal ? `&body=${encodeURIComponent(`${goal}.\n\n`)}` : ''}`;
  page.innerHTML =
    hero('Contact', 'Bring us your|loose end.', 'A person replies within a day. The first call is free and there is nothing to prepare.') +
    `<section class="blk rv"><ul class="links big-links">
      <li><a href="${BOOKING}" target="_blank" rel="noopener" data-cursor="Book"><span>Book a discovery call</span><small>Pick a time that suits you</small><i>→</i></a></li>
      <li><a href="${mail()}" data-cursor="Write"><span>${EMAIL}</span><small>Write to us directly</small><i>→</i></a></li>
    </ul></section>
    <section class="blk rv"><h2 class="h">Or start with what you need</h2><ul class="links">${GOALS.map(
      (g) => `<li><a href="${mail(g)}" data-cursor="Write"><span>${g}</span><i>→</i></a></li>`
    ).join('')}</ul></section>
    <section class="blk rv"><h2 class="h">What happens next</h2><ol class="steps">
      <li><span class="when">Day 1</span><h3>A person replies</h3><p>Not a bot, and not a sales sequence.</p></li>
      <li><span class="when">First</span><h3>A discovery call</h3><p>We map the problem and what done looks like.</p></li>
      <li><span class="when">Then</span><h3>A fixed price and scope</h3><p>Agreed before any code is written.</p></li>
    </ol></section>`;
  into.append(page);
}
