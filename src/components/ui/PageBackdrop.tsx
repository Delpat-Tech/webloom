/**
 * Shared, static page backdrop for the v3 layouts: a faint dot grid and two
 * soft brand glows. No scroll or cursor tracking, so it costs nothing at runtime.
 */
export default function PageBackdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(127,127,127,0.12)_1px,transparent_0)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
    </div>
  );
}
