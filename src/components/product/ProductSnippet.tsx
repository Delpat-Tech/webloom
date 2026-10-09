'use client';

import { useSnaps, useWidth } from './snaps';

/**
 * One region of a product screen, live: the snapshot shown in a frame at the
 * size it was captured, scaled to the column and cropped to the part the page
 * is talking about. Text stays sharp at any size and hover styles work; nothing
 * in it runs the app.
 */
export default function ProductSnippet({ base, name, className = '' }: { base: string; name: string; className?: string }) {
  const snaps = useSnaps(base);
  const [ref, width] = useWidth<HTMLDivElement>();
  const s = snaps?.snippets[name];
  const crop = s?.crop;
  const scale = crop && width ? width / crop.w : 0;
  return (
    <div ref={ref} role="img" aria-label={s?.alt || ''}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: crop ? `${crop.w} / ${crop.h}` : '16 / 9' }}>
      {s && scale > 0 && (
        <iframe src={`${base}/${s.file}`} title={s.alt} loading="lazy" scrolling="no" tabIndex={-1} aria-hidden
          className="absolute left-0 top-0 border-0 bg-white"
          style={{
            width: snaps!.viewport.width, height: snaps!.viewport.height,
            transformOrigin: '0 0', transform: `scale(${scale}) translate(${-crop!.x}px, ${-crop!.y}px)`,
          }} />
      )}
    </div>
  );
}
