import type { Block, PageDoc } from '../content/types';
import { el, esc, linkAttrs, tint } from '../dom';

/** Draws any inner page from its PageDoc: a hero over the thread, then its blocks. */

const DEFAULT_CTA = { line: 'Bring us your|loose end.', label: 'Book a discovery call', href: '/contact' };

function block(b: Block): string {
  switch (b.type) {
    case 'statement':
      return `<section class="blk statement rv"><h2 class="big">${tint(b.text)}</h2>${b.sub ? `<p class="lead">${esc(b.sub)}</p>` : ''}</section>`;
    case 'prose':
      return `<section class="blk prose rv">${b.heading ? `<h2 class="h">${esc(b.heading)}</h2>` : ''}<div class="body">${b.body
        .map((p) => `<p>${esc(p)}</p>`)
        .join('')}</div></section>`;
    case 'list':
      return `<section class="blk rv">${b.heading ? `<h2 class="h">${esc(b.heading)}</h2>` : ''}<ul class="rows">${b.items
        .map((it, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(it.title)}</h3><p>${esc(it.body)}</p></div></li>`)
        .join('')}</ul></section>`;
    case 'steps':
      return `<section class="blk rv">${b.heading ? `<h2 class="h">${esc(b.heading)}</h2>` : ''}<ol class="steps">${b.items
        .map((it) => `<li>${it.when ? `<span class="when">${esc(it.when)}</span>` : ''}<h3>${esc(it.title)}</h3><p>${esc(it.body)}</p></li>`)
        .join('')}</ol></section>`;
    case 'stats':
      return `<section class="blk rv"><dl class="stats">${b.items
        .map((it) => `<div><dt>${esc(it.value)}</dt><dd>${esc(it.label)}</dd></div>`)
        .join('')}</dl></section>`;
    case 'quote':
      return `<section class="blk rv"><figure class="quote"><blockquote>${esc(b.text)}</blockquote><figcaption>${esc(b.by)}</figcaption></figure></section>`;
    case 'links':
      return `<section class="blk rv">${b.heading ? `<h2 class="h">${esc(b.heading)}</h2>` : ''}<ul class="links">${b.items
        .map(
          (it) =>
            `<li><a ${linkAttrs(it.href)} data-cursor="Open"><span>${esc(it.label)}</span>${it.note ? `<small>${esc(it.note)}</small>` : ''}<i>→</i></a></li>`
        )
        .join('')}</ul></section>`;
  }
}

export function hero(kicker: string, headline: string, lead: string): string {
  return `<header class="hero"><p class="kicker">${esc(kicker)}</p><h1 class="big">${tint(headline)}</h1>${
    lead ? `<p class="lead">${esc(lead)}</p>` : ''
  }</header>`;
}

export function closing(cta = DEFAULT_CTA): string {
  return `<section class="blk closing rv"><h2 class="big">${tint(cta.line)}</h2><a class="cta" ${linkAttrs(cta.href)} data-cursor="Go">${esc(
    cta.label
  )} <span>→</span></a></section>`;
}

export function docView(into: HTMLElement, doc: PageDoc) {
  const page = el('article', doc.slug.startsWith('legal/') ? 'page legal' : 'page');
  page.innerHTML = hero(doc.kicker, doc.headline, doc.lead) + doc.blocks.map(block).join('') + closing(doc.cta);
  into.append(page);
}
