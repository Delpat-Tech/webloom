const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

/** Desktop only: a dot with a trailing ring that opens up, with a one-word label, over anything clickable. */
export function startCursor() {
  if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const wrap = el('div', 'cur');
  wrap.innerHTML =
    '<svg class="cur-ring" viewBox="-24 -24 48 48" width="48" height="48"><circle r="17"/></svg><i class="cur-dot"></i><span class="cur-label"></span>';
  document.body.append(wrap);
  const ring = wrap.querySelector<SVGElement>('.cur-ring')!;
  const dot = wrap.querySelector<HTMLElement>('.cur-dot')!;
  const label = wrap.querySelector<HTMLElement>('.cur-label')!;
  root.classList.add('has-cur');
  let x = -100, y = -100, rx = -100, ry = -100, grow = 1, growTo = 1, raf = 0, seen = false;
  const frame = () => {
    raf = 0;
    const vx = x - rx, vy = y - ry;
    rx += vx * 0.2;
    ry += vy * 0.2;
    grow += (growTo - grow) * 0.2;
    const speed = Math.min(Math.hypot(vx, vy) / 90, 0.45);
    const ang = Math.atan2(vy, vx);
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${ang}rad) scale(${(1 + speed) * grow}, ${(1 - speed * 0.6) * grow}) rotate(${-ang}rad)`;
    label.style.transform = `translate3d(${rx + 26 * grow}px, ${ry}px, 0)`;
    if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1 || Math.abs(growTo - grow) > 0.01) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        wrap.classList.add('on');
      }
      kick();
    },
    { passive: true }
  );
  addEventListener(
    'pointerover',
    (e) => {
      const t = (e.target as Element | null)?.closest?.('a, button, [data-cursor]') as HTMLElement | null;
      growTo = t ? 1.7 : 1;
      wrap.classList.toggle('over', Boolean(t));
      const text = t?.dataset.cursor || '';
      label.textContent = text;
      label.style.opacity = text ? '1' : '0';
      kick();
    },
    { passive: true }
  );
  root.addEventListener('pointerleave', () => wrap.classList.remove('on'));
  root.addEventListener('pointerenter', () => seen && wrap.classList.add('on'));
}

