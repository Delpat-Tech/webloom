'use client';
import { useEffect, useRef, useState } from 'react';

interface LiveCounterProps {
  value: number | null;
  /** Shown while value is null (OS unreachable / still loading). */
  fallback: string;
  suffix?: string;
  prefix?: string;
  /** Animation duration in ms. Default 1500. */
  duration?: number;
  className?: string;
}

/**
 * Scroll-triggered animated counter backed by a live OS metric.
 * Falls back silently to `fallback` when `value` is null.
 * Animation fires once when the element scrolls into view (threshold 30%).
 */
export default function LiveCounter({
  value,
  fallback,
  suffix = '',
  prefix = '',
  duration = 1500,
  className,
}: LiveCounterProps) {
  const ref      = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  const [displayed, setDisplayed] = useState<string | null>(null);

  useEffect(() => {
    if (value === null || animated.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animated.current = true;

      const startTs = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        setDisplayed(`${prefix}${Math.round(eased * value)}${suffix}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {displayed ?? (value === null ? fallback : `${prefix}0${suffix}`)}
    </span>
  );
}
