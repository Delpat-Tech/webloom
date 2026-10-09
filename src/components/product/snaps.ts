'use client';

import { useEffect, useState } from 'react';

// Live snapshots of a product's screens, made by the tutorial recorder's
// `snap` command (delpat-skills/tutorial-videos): one HTML file per screen,
// the app's own markup and styles with no scripts, and snaps.json describing
// them. Shown through ProductSnippet and Walkthrough.

export interface Box { x: number; y: number; w: number; h: number }
export interface Snaps {
  viewport: { width: number; height: number };
  snippets: Record<string, { file: string; crop: Box; alt: string }>;
  walkthrough: {
    title: string;
    frames: { file: string; box: Box | null; say: string; kind: string; chapter: string | null }[];
    end?: string;
    outro?: string;
  };
}

const cache = new Map<string, Promise<Snaps>>();

/** snaps.json from a folder under /public, fetched once per page. */
export function useSnaps(base: string): Snaps | null {
  const [snaps, setSnaps] = useState<Snaps | null>(null);
  useEffect(() => {
    if (!cache.has(base)) cache.set(base, fetch(`${base}/snaps.json`).then(r => r.json()));
    let live = true;
    cache.get(base)!.then(s => { if (live) setSnaps(s); }).catch(() => {});
    return () => { live = false; };
  }, [base]);
  return snaps;
}

/** The width of an element, kept current as it resizes. */
export function useWidth<T extends HTMLElement>() {
  const [el, setEl] = useState<T | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, width] as const;
}
