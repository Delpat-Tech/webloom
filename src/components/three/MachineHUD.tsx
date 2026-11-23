'use client';

import { useEffect, useState } from 'react';
import { machine, STAGE_LABELS } from './machineStore';

/** Fixed stage indicator on the right edge. Clicking a stage scrolls to it. */
export default function MachineHUD() {
  const [active, setActive] = useState(machine.stage);
  const [hidden, setHidden] = useState(false);

  useEffect(() => machine.subscribeStage(() => setActive(machine.stage)), []);

  // step aside when the footer scrolls in, so the HUD never sits on top of its text
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    document
      .querySelector<HTMLElement>(`[data-stage="${i}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-300 lg:block ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <ol className="relative flex flex-col gap-4">
        <span aria-hidden className="absolute right-[5px] top-1 bottom-1 w-px bg-border" />
        {STAGE_LABELS.map((label, i) => {
          const on = i === active;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={on ? 'step' : undefined}
                className="group relative flex items-center justify-end gap-3"
              >
                <span
                  className={`text-[11px] font-medium uppercase tracking-widest transition-all duration-300 ${
                    on
                      ? 'translate-x-0 text-foreground opacity-100'
                      : 'translate-x-1 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                >
                  <span className="mr-1.5 text-primary">0{i + 1}</span>
                  {label}
                </span>
                <span
                  className={`relative block rounded-full transition-all duration-300 ${
                    on
                      ? 'h-3 w-3 bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                      : 'mx-[2px] h-2 w-2 bg-muted-foreground/40 group-hover:bg-primary'
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
