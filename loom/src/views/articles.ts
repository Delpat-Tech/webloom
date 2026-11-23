import { ARTICLES, type Article } from '../data/articles';
import { el, esc } from '../dom';
import { closing, hero } from './doc';

/** Articles, newest first. */
const LIST = Object.values(ARTICLES)
  .filter((a) => a.status === 'published')
  .sort((a, b) => b.published_at.localeCompare(a.published_at));

const date = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

/** **bold**, *italic* and `code` inside a line of text. Everything is escaped first. */
function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>');
}

/**
 * The small slice of Markdown these articles use: headings, paragraphs, quotes,
 * bullet and numbered lists, rules and fenced blocks. Nothing else is interpreted.
 */
function markdown(src: string, skipTitle: string): string {
  const lines = src.split('\n');
  const out: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith('```')) {
      flush();
      const code: string[] = [];
      while (++i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i]);
      out.push(`<pre>${esc(code.join('\n'))}</pre>`);
    } else if (!t) flush();
    else if (/^-{3,}$/.test(t)) {
      flush();
      out.push('<hr />');
    } else if (/^#{1,6}\s/.test(t)) {
      flush();
      const level = t.match(/^#+/)![0].length;
      const text = t.replace(/^#+\s*/, '');
      // the page hero already shows the title
      if (level === 1 && text.replace(/\.$/, '') === skipTitle.replace(/\.$/, '')) continue;
      out.push(level <= 2 ? `<h2>${inline(text)}</h2>` : `<h3>${inline(text)}</h3>`);
    } else if (t.startsWith('>')) {
      flush();
      const q: string[] = [t.replace(/^>\s?/, '')];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) q.push(lines[++i].trim().replace(/^>\s?/, ''));
      out.push(`<blockquote>${inline(q.join(' '))}</blockquote>`);
    } else if (/^([-*]|\d+\.)\s/.test(t)) {
      flush();
      const ordered = /^\d+\./.test(t);
      const items: string[] = [t.replace(/^([-*]|\d+\.)\s+/, '')];
      while (i + 1 < lines.length && /^([-*]|\d+\.)\s/.test(lines[i + 1].trim())) items.push(lines[++i].trim().replace(/^([-*]|\d+\.)\s+/, ''));
      out.push(`<${ordered ? 'ol' : 'ul'}>${items.map((it) => `<li>${inline(it)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`);
    } else para.push(t);
  }
  flush();
  return out.join('\n');
}

export function articlesView(into: HTMLElement) {
  const page = el('article', 'page');
  page.innerHTML =
    hero('Notes', 'What we think|while we build.', `${LIST.length} short pieces on how we work and why.`) +
    `<section class="blk rv"><ul class="links">${LIST.map(
      (a) =>
        `<li><a href="/notes/${esc(a.slug)}" data-cursor="Read"><span>${esc(a.title)}</span><small>${esc(date(a.published_at))} · ${
          a.reading_time_minutes
        } min read</small><i>→</i></a></li>`
    ).join('')}</ul></section>` +
    closing();
  into.append(page);
}

export function findArticle(slug: string): Article | undefined {
  return LIST.find((a) => a.slug === slug);
}

export function articleView(into: HTMLElement, a: Article) {
  const next = LIST[(LIST.indexOf(a) + 1) % LIST.length];
  const page = el('article', 'page');
  const [head, ...rest] = a.title.replace(/\.$/, '').split(' ');
  // tint the back half of the title, like every other headline
  const words = [head, ...rest];
  const cut = Math.ceil(words.length / 2);
  page.innerHTML =
    `<header class="hero case"><p class="kicker"><a href="/notes" data-cursor="Back">Notes</a> / ${esc(date(a.published_at))} · ${
      a.reading_time_minutes
    } min read</p><h1 class="big">${esc(words.slice(0, cut).join(' '))} <em class="inl">${esc(words.slice(cut).join(' '))}.</em></h1>
      <p class="lead wide">${esc(a.excerpt)}</p></header>
    <section class="blk article rv">${markdown(a.body, a.title)}<p class="byline">${esc(a.by.name)}, ${esc(a.by.role)}</p></section>` +
    (next && next !== a
      ? `<section class="blk rv"><h2 class="h">Next</h2><ul class="links"><li><a href="/notes/${esc(next.slug)}" data-cursor="Read"><span>${esc(
          next.title
        )}</span><i>→</i></a></li></ul></section>`
      : '') +
    closing();
  into.append(page);
}
