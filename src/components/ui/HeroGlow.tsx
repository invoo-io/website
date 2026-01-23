/**
 * HeroGlow - Reusable background glow effects for hero sections
 *
 * Creates ambient lighting with blue and purple gradient orbs,
 * plus a bottom fade overlay for smooth transitions.
 * Use inside a section with `relative` and `overflow-hidden` classes.
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
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-accent-blue-main opacity-[0.15] blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 translate-x-1/3 w-[500px] h-[500px] bg-accent-purple-main opacity-[0.12] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-purple-main opacity-[0.08] blur-[100px] pointer-events-none" />
      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-primary to-transparent pointer-events-none" />
    </>
  );
}
