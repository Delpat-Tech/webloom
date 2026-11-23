// Every inner page is a short document: a hero and a handful of blocks.
// One renderer (src/pages.ts) draws all of them, so pages stay consistent and brief.

export type Motif = 'tangle' | 'thread' | 'warp' | 'weave' | 'swatches' | 'mark';

export type Block =
  /** one big line, like the statements on the home story. "|" splits off the tinted half. */
  | { type: 'statement'; text: string; sub?: string }
  /** a heading and one to three short paragraphs */
  | { type: 'prose'; heading?: string; body: string[] }
  /** a set of short items, each a title and one or two sentences */
  | { type: 'list'; heading?: string; items: { title: string; body: string }[] }
  /** ordered steps; "when" is an optional short tag such as "Day 1" or "Week 2" */
  | { type: 'steps'; heading?: string; items: { when?: string; title: string; body: string }[] }
  /** a few hard numbers. Only use numbers the source content states and can back up. */
  | { type: 'stats'; items: { value: string; label: string }[] }
  /** a real quote with a real attribution */
  | { type: 'quote'; text: string; by: string }
  /** onward links. href is a path inside this site (see ROUTES in src/router.ts) or a full URL. */
  | { type: 'links'; heading?: string; items: { label: string; href: string; note?: string }[] };

export interface PageDoc {
  /** path without the leading slash, e.g. "about" or "what-we-do/mvp-engine" */
  slug: string;
  /** browser tab title */
  title: string;
  /** two or three words above the headline */
  kicker: string;
  /** the headline; "|" splits off the tinted half */
  headline: string;
  /** one or two sentences under the headline */
  lead: string;
  /** which thread scene sits behind the hero */
  motif: Motif;
  blocks: Block[];
  /** closing call to action; defaults to booking a call */
  cta?: { line: string; label: string; href: string };
}
