import '@fontsource-variable/manrope';
import './style.css';
import type { Motif, PageDoc } from './content/types';
import { startCursor } from './cursor';
import { el, esc } from './dom';
import { startThread, type Thread } from './thread';
import { articleView, articlesView, findArticle } from './views/articles';
import { contactView } from './views/contact';
import { docView } from './views/doc';
import { homeView } from './views/home';
import { findProject, projectView, workView } from './views/work';

/**
 * A small single-page app. The thread canvas is created once and stays alive, so going
 * from one page to another morphs the thread instead of reloading it.
 */

// every content file in src/content exports `page`
const docs = new Map<string, PageDoc>();
for (const mod of Object.values(import.meta.glob<{ page?: PageDoc }>('./content/*.ts', { eager: true }))) {
  if (mod.page) docs.set(mod.page.slug, mod.page);
}

const SCENE: Record<Motif, number> = { tangle: 0, thread: 1, warp: 2, weave: 3, swatches: 4, mark: 5 };

const root = document.documentElement;
const view = document.getElementById('view')!;
const canvas = document.getElementById('gl') as HTMLCanvasElement;
const menu = document.getElementById('menu')!;
const menuBtn = document.getElementById('menu-btn')!;

let thread: Thread | null = null;
try {
  thread = startThread(canvas);
  startCursor();
} catch (err) {
  // no WebGL: every page still works as plain text on the dark background
  console.warn('WebGL unavailable, showing plain pages', err);
  root.classList.add('no-gl');
}

// ---------------------------------------------------------------- menu

const NAV: { label: string; href: string }[] = [
  { label: 'Work', href: '/work' },
  { label: 'What we do', href: '/what-we-do' },
  { label: 'How we work', href: '/how-we-work' },
  { label: 'Who we help', href: '/who-we-help' },
  { label: 'Why Delpat', href: '/why-delpat' },
  { label: 'About', href: '/about' },
  { label: 'Real Estate CRM', href: '/real-estate-crm' },
  { label: 'Partner with us', href: '/partner' },
  { label: 'Playbook', href: '/playbook' },
  { label: 'Notes', href: '/notes' },
  { label: 'Contact', href: '/contact' },
];
menu.innerHTML =
  `<nav aria-label="All pages"><ul>${NAV.map((n, i) => `<li style="--i:${i}"><a href="${n.href}" data-cursor="Open">${esc(n.label)}</a></li>`).join(
    ''
  )}</ul></nav><p class="menu-foot"><a href="/legal/terms">Terms</a><a href="/legal/privacy">Privacy</a><a href="mailto:info@delpat.in">info@delpat.in</a></p>`;

const setMenu = (open: boolean) => {
  root.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
};
menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

// ---------------------------------------------------------------- pages

/** Fades blocks in as they scroll into view. */
let io: IntersectionObserver | null = null;
function reveal() {
  io?.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io!.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );
  view.querySelectorAll('.rv').forEach((n) => io!.observe(n));
}

function notFound() {
  const page = el('article', 'page');
  page.innerHTML = `<header class="hero"><p class="kicker">Lost thread</p><h1 class="big">This page <em>came loose.</em></h1><p class="lead">It may have moved. The work and the way in are still here.</p></header>
    <section class="blk"><ul class="links"><li><a href="/" data-cursor="Open"><span>Back to the start</span><i>→</i></a></li><li><a href="/work" data-cursor="Open"><span>See the work</span><i>→</i></a></li></ul></section>`;
  view.append(page);
}

function render(path: string) {
  const slug = path.replace(/^\/+|\/+$/g, '');
  view.innerHTML = '';
  setMenu(false);
  root.classList.remove('end');
  let title = 'Delpat';
  let scene = 0;
  let isStory = false;

  if (slug === '') {
    isStory = true;
    const hud = homeView(view);
    title = 'Delpat. Every idea starts as a tangle.';
    thread?.story(hud);
  } else if (slug === 'work') {
    workView(view);
    title = 'Work | Delpat';
    scene = SCENE.swatches;
  } else if (slug.startsWith('work/')) {
    const p = findProject(slug.slice(5));
    if (p) {
      projectView(view, p);
      title = `${p.cardTitle} | Delpat`;
      scene = SCENE.weave;
    } else notFound();
  } else if (slug === 'notes') {
    articlesView(view);
    title = 'Notes | Delpat';
    scene = SCENE.tangle;
  } else if (slug.startsWith('notes/')) {
    const a = findArticle(slug.slice(6));
    if (a) {
      articleView(view, a);
      title = `${a.title} | Delpat`;
      scene = SCENE.thread;
    } else notFound();
  } else if (slug === 'contact') {
    contactView(view);
    title = 'Contact | Delpat';
    scene = SCENE.mark;
  } else if (docs.has(slug)) {
    const doc = docs.get(slug)!;
    docView(view, doc);
    title = /delpat/i.test(doc.title) ? doc.title : `${doc.title} | Delpat`;
    scene = SCENE[doc.motif] ?? 0;
  } else notFound();

  if (!isStory) {
    thread?.page(scene);
    root.classList.remove('story');
    reveal();
  }
  document.title = title;
  scrollTo(0, 0);
  document.querySelectorAll<HTMLAnchorElement>('.bar-nav a, #menu a').forEach((a) => {
    a.classList.toggle('on', a.pathname !== '/' && path.startsWith(a.pathname));
  });
}

// internal links stay in the app
addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element | null)?.closest?.('a') as HTMLAnchorElement | null;
  if (!a || a.target === '_blank' || a.origin !== location.origin || a.hasAttribute('download')) return;
  e.preventDefault();
  if (a.pathname !== location.pathname) {
    history.pushState(null, '', a.pathname);
    render(a.pathname);
  } else setMenu(false);
});
addEventListener('popstate', () => render(location.pathname));

render(location.pathname);
