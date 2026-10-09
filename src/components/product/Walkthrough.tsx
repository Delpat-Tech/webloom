'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useSnaps, useWidth } from './snaps';

/**
 * A flow to click through: each stage is the real screen before an action,
 * with the control that action uses pulsing. Clicking it (or Next) moves on to
 * what the app showed next. Recorded from the product; nothing here runs it.
 */
export default function Walkthrough({ base, className = '' }: { base: string; className?: string }) {
  const snaps = useSnaps(base);
  const [ref, width] = useWidth<HTMLDivElement>();
  const [i, setI] = useState(0);
  const frames = snaps?.walkthrough.frames || [];
  const total = frames.length;
  const done = total > 0 && i >= total;
  const vp = snaps?.viewport;
  const scale = vp && width ? width / vp.width : 0;
  const file = done ? snaps?.walkthrough.end : frames[i]?.file;

  // The next screen loads while this one is shown, so a click never waits.
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const next = done ? null : i + 1 < total ? frames[i + 1].file : snaps?.walkthrough.end;
  useEffect(() => { setI(0); }, [base]);

  const go = (to: number) => setI(Math.max(0, Math.min(total, to)));
  const f = done ? null : frames[i];
  const box = f?.box;

  return (
    <div className={className}>
      <div ref={ref} className="relative w-full overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
        style={{ aspectRatio: vp ? `${vp.width} / ${vp.height}` : '16 / 9' }}>
        {scale > 0 && vp && [file, next].filter(Boolean).map(src => (
          <iframe key={src} src={`${base}/${src}`} title={snaps?.walkthrough.title} scrolling="no" tabIndex={-1} aria-hidden
            onLoad={() => setLoaded(l => ({ ...l, [src!]: true }))}
            className="absolute left-0 top-0 border-0 bg-white transition-opacity duration-300"
            style={{ width: vp.width, height: vp.height, transformOrigin: '0 0', transform: `scale(${scale})`, opacity: src === file && loaded[src!] ? 1 : 0, pointerEvents: 'none' }} />
        ))}

        {/* The control to use next. */}
        {box && scale > 0 && loaded[file!] && (
          <button type="button" aria-label={f!.say || 'Next'} onClick={() => go(i + 1)}
            className="group absolute cursor-pointer rounded-lg focus:outline-none"
            style={{ left: (box.x - 6) * scale, top: (box.y - 6) * scale, width: (box.w + 12) * scale, height: (box.h + 12) * scale }}>
            <span className="absolute inset-0 rounded-lg border-2 border-accent shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
            <span className="absolute inset-0 animate-ping rounded-lg border-2 border-accent opacity-60" />
          </button>
        )}

        {done && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-background/70 p-6 text-center backdrop-blur-sm">
            {snaps?.walkthrough.outro && <p className="max-w-md text-xl font-semibold text-foreground md:text-2xl">{snaps.walkthrough.outro}</p>}
            <button type="button" onClick={() => go(0)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted">
              <RotateCcw className="h-4 w-4" /> Start again
            </button>
          </div>
        )}
      </div>

      {/* The caption and the way through it. */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 pl-4">
        <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-accent px-2 text-sm font-semibold text-white">
          {done ? '✓' : `${i + 1}/${total}`}
        </span>
        <p className="flex-1 text-sm text-foreground md:text-base">{done ? 'Done.' : f?.say}</p>
        <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Back"
          className="rounded-lg border border-border p-2 text-foreground disabled:opacity-30 hover:bg-muted"><ArrowLeft className="h-4 w-4" /></button>
        <button type="button" onClick={() => go(i + 1)} disabled={done} aria-label="Next"
          className="rounded-lg border border-border p-2 text-foreground disabled:opacity-30 hover:bg-muted"><ArrowRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
