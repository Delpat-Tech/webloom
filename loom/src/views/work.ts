import { portfolioItems, type PortfolioItem } from '../data/portfolio-data';
import { el, esc, linkAttrs } from '../dom';
import { closing, hero } from './doc';

/** Case studies, straight from the project data. Only work the client has agreed can be shown. */
const PUBLIC = portfolioItems.filter((p) => p.client.publiclyUsable);

const TRACKS: { key: PortfolioItem['meta']['serviceTrack'] | 'All'; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Product MVP', label: 'Products' },
  { key: 'Internal OS', label: 'Systems' },
  { key: 'Automation MVP', label: 'Automation' },
  { key: 'Custom', label: 'Rescue and custom' },
  { key: 'R&D', label: 'R&D' },
];

/** "Client: what happened" -> the two halves, so the list can show them on separate lines. */
function split(title: string): [string, string] {
  const i = title.indexOf(':');
  return i > 0 ? [title.slice(0, i).trim(), title.slice(i + 1).trim()] : [title, ''];
}

export function workView(into: HTMLElement) {
  const page = el('article', 'page');
  page.innerHTML =
    hero('Work', 'Numbers,|not promises.', `${PUBLIC.length} projects we can show, each with the result it produced.`) +
    `<nav class="filters rv" aria-label="Filter by kind of work">${TRACKS.map(
      (t, i) => `<button type="button" class="filter${i === 0 ? ' on' : ''}" data-track="${t.key}">${t.label}</button>`
    ).join('')}</nav>
    <ul class="work"></ul>` +
    closing();
  const list = page.querySelector<HTMLElement>('.work')!;
  const draw = (track: string) => {
    const items = PUBLIC.filter((p) => track === 'All' || p.meta.serviceTrack === track)
      // featured first, then by name
      .sort((a, b) => Number(b.meta.featured) - Number(a.meta.featured) || a.cardTitle.localeCompare(b.cardTitle));
    list.innerHTML = items
      .map((p) => {
        const [name, what] = split(p.cardTitle);
        const m = p.outcome.headlineMetric;
        return `<li><a href="/work/${esc(p.id)}" data-cursor="Read">
          <span class="metric"><b>${esc(m.value)}</b><small>${esc(m.label)}</small></span>
          <span class="what"><strong>${esc(name)}</strong>${what ? `<span>${esc(what)}</span>` : ''}</span>
          <i>→</i></a></li>`;
      })
      .join('');
  };
  draw('All');
  page.querySelector('.filters')!.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.filter');
    if (!b) return;
    page.querySelectorAll('.filter').forEach((f) => f.classList.toggle('on', f === b));
    draw(b.dataset.track || 'All');
  });
  into.append(page);
}

export function findProject(id: string): PortfolioItem | undefined {
  return PUBLIC.find((p) => p.id === id);
}

export function projectView(into: HTMLElement, p: PortfolioItem) {
  const [name, what] = split(p.cardTitle);
  const m = p.outcome.headlineMetric;
  const impact = [p.story.impact.time, p.story.impact.money, p.story.impact.risk].filter(Boolean) as string[];
  const stack = Object.values(p.techStack).flat().filter(Boolean) as string[];
  const page = el('article', 'page');
  const sec = (h: string, body: string) => `<section class="blk prose rv"><h2 class="h">${h}</h2><div class="body">${body}</div></section>`;
  const para = (t: string) => `<p>${esc(t)}</p>`;
  const bullets = (items: string[]) => `<ul class="ticks">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

  page.innerHTML =
    `<header class="hero case"><p class="kicker"><a href="/work" data-cursor="Back">Work</a> / ${esc(p.meta.serviceTrack)}</p>
      <h1 class="big">${esc(name)}${what ? `<em>${esc(what)}</em>` : ''}</h1></header>
    <section class="blk rv"><dl class="stats one"><div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div></dl></section>` +
    sec('The problem', para(p.story.problem) + (impact.length ? bullets(impact) : '') + (p.story.previousSolution ? para(p.story.previousSolution) : '')) +
    sec('What we were asked to do', para(p.execution.coreMandate)) +
    sec('The move that mattered', para(p.execution.smartMoment)) +
    sec('What we built', bullets(p.execution.features)) +
    sec('What changed', bullets([...(p.outcome.otherMetrics || []), ...p.outcome.qualitativeWins])) +
    (p.outcome.clientQuote
      ? `<section class="blk rv"><figure class="quote"><blockquote>${esc(p.outcome.clientQuote.text)}</blockquote><figcaption>${esc(
          p.outcome.clientQuote.attribution
        )}</figcaption></figure></section>`
      : '') +
    (stack.length ? `<section class="blk rv"><h2 class="h">Built with</h2><ul class="tags">${stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>` : '') +
    (p.meta.links.live
      ? `<section class="blk rv"><ul class="links"><li><a ${linkAttrs(p.meta.links.live)} data-cursor="Open"><span>See it live</span><i>→</i></a></li></ul></section>`
      : '') +
    closing();
  into.append(page);
}
