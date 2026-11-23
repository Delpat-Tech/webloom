/** Tiny helpers shared by the views. */

export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', html = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

/** Escapes text that is about to be placed into HTML. */
export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** "Plain part|tinted part" -> safe HTML with the second half tinted. */
export function tint(line: string): string {
  const [a, b] = line.split('|');
  return b ? `${esc(a)} <em>${esc(b)}</em>` : esc(a);
}

/** Internal paths stay in the app; anything else opens as a normal link. */
export function linkAttrs(href: string): string {
  return /^(https?:|mailto:|tel:)/.test(href) ? `href="${esc(href)}" target="_blank" rel="noopener"` : `href="${esc(href)}"`;
}
