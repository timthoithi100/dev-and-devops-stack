## Advanced Recap — HTML & CSS

**1. CSS Architecture — BEM & Utility-First**
- **BEM**: `.block`, `.block__element`, `.block--modifier` — flat specificity (every class is `0,0,1,0`), self-describing, no nesting-based conflicts. Verbose HTML, hand-written CSS that grows with every component.
- **Utility-first** (Tailwind's philosophy): many single-purpose classes composed in HTML. CSS output stays flat regardless of component count; consistency enforced by a fixed design scale rather than developer discipline.
- Utility classes deliberately stay at identical, flat specificity — each targets an independent property, so there's no relationship to express via nesting, and equal specificity guarantees the *last class wins* mental model holds, with source order (not specificity) as the sole tiebreaker.

**2. Tailwind CSS**
- `tailwind.config.js` defines your design scale (spacing, colors); `content` array tells Tailwind which files to scan for class names actually used
- `theme.extend` adds to defaults; `theme` alone replaces them
- Responsive/state variants (`md:`, `hover:`, `dark:`) are prefixes applied directly to utilities — `md:` follows the same mobile-first `min-width` logic from Intermediate
- **JIT mode**: scans source files as literal text and generates only the exact CSS requested — enabling arbitrary value syntax (`w-[327px]`)
- JIT can't see dynamically-constructed class names (`` `text-${size}` ``) since it's a text scanner, not a JS interpreter — full class name strings must exist literally in the source

**3. Web Accessibility (WCAG, ARIA, Keyboard Nav)**

- **POUR**: Perceivable, Operable, Understandable, Robust — WCAG's four principles; **AA** is the practical standard
- Color contrast minimums: 4.5:1 normal text, 3:1 large text/UI components — ties back to HSL's lightness value being the easiest way to hit a target ratio
- **First rule of ARIA**: don't use it if native HTML already does the job — `<button>` gives keyboard support, focus, and screen-reader semantics for free
- ARIA roles/properties/states (`role`, `aria-label`, `aria-expanded`) fill gaps for custom widgets with no native equivalent — states must be kept in sync via JS
- Keyboard nav: `tabindex="0"` (join natural tab order), `tabindex="-1"` (programmatic focus only), positive tabindex is an anti-pattern; never remove focus outlines without a replacement; skip links bypass repeated nav
- Your custom-dropdown exercise: the real accessibility checklist is keyboard operability (focus, Enter/Space, arrow keys, Escape, focus trapping) + ARIA (roles, `aria-expanded`, `aria-selected`, `aria-activedescendant`) — all free with a native `<select>`

**4. Performance — Render-Blocking, Critical CSS, Lazy Loading, Core Web Vitals**
- Render-blocking: CSS blocks paint, unblocked scripts block parsing — mitigated with `defer` (preserves order, waits for parse) and `async` (runs whenever ready, no order guarantee)
- Critical CSS: inline just enough CSS for above-the-fold content in `<head>`, load the rest asynchronously via `preload` + `onload` swap
- Lazy loading: native `loading="lazy"` on `<img>`/`<iframe>`, zero JS, defers off-screen resource fetches
- **Core Web Vitals**: LCP (largest element paint time, ≤2.5s), INP (interaction responsiveness, ≤200ms), CLS (visual stability, ≤0.1)
- CLS ties to the box model: missing `width`/`height` on images causes zero-height placeholders that jump once content loads
- LCP ties to render-blocking/critical CSS: anything delaying paint directly delays LCP
- You correctly identified a no-dimension hero image behind a render-blocking, non-critical stylesheet harms **CLS and LCP**, not INP (which is about input responsiveness, unrelated to load-time layout/paint)