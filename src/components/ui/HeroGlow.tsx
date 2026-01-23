/**
 * HeroGlow - Reusable background glow effects for hero sections
 *
 * Creates ambient lighting with blue and purple gradient orbs,
 * plus a bottom fade overlay for smooth transitions.
 * Use inside a section with `relative` and `overflow-hidden` classes.
 *
 * Performance: Uses CSS radial gradients instead of blur filters
 * to avoid expensive GPU compositing on mobile devices.
 *
 * @example
 * ```tsx
 * <section className="relative overflow-hidden">
 *   <HeroGlow />
 *   <div className="relative z-10">Content here</div>
 * </section>
 * ```
 */
export function HeroGlow() {
  return (
    <>
      {/* Background glow effects using radial gradients (no blur filter) */}
      <div
        className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,125,254,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-0 translate-x-1/3 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(121,51,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(121,51,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none" aria-hidden="true" />
    </>
  );
}
