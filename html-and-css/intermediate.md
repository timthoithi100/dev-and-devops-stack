## Intermediate Recap — HTML & CSS

**1. Flexbox**
- One-dimensional layout — one axis at a time
- `flex-direction` sets main axis; **main and cross axes swap when you switch `row` ↔ `column`**
- `justify-content` always controls the **main axis**, `align-items` always controls the **cross axis** — regardless of direction
- `flex-wrap`, `gap` for spacing without margin hacks
- Per-item: `flex-grow`/`flex-shrink`/`flex-basis` (shorthand `flex: grow shrink basis`) — grow values distribute leftover space proportionally among siblings

**2. CSS Grid**
- Two-dimensional layout — rows and columns simultaneously
- `grid-template-columns`/`rows`, `fr` unit = fraction of remaining free space after fixed-width tracks are subtracted
- `repeat(auto-fit, minmax(250px, 1fr))` — fully responsive grid with zero media queries; you correctly calculated 3 columns × ~266px each in an 800px container
- `auto-fit` collapses empty tracks to 0; `auto-fill` reserves them
- Named `grid-template-areas` — a visual map of the layout using named regions

**3. Responsive Design**
- **Mobile-first**: base styles for smallest screen, layer on complexity via `min-width` media queries going up — fewer overrides overall, because cascade only ever *adds* rules rather than tearing desktop styles back down (tied directly back to source-order/cascade from Beginner)
- Desktop-first (`max-width`, tearing down) tends to produce more CSS
- Common breakpoints: <576px (phone), 576–768px (large phone/small tablet), 768–1024px (tablet), 1024px+ (desktop)
- **Key distinction**: media queries measure **CSS pixels** (viewport width), not physical resolution — physical pixels ÷ **DPR** (device pixel ratio) = CSS pixels
- **PPI** (hardware pixel density) → OS picks a **DPR** (scaling factor) → browser reports CSS pixels → media queries only ever see the post-DPR result
- This is why `srcset`/`2x`/`3x` image variants exist, and why the viewport meta tag is essential for correct mobile rendering

**4. Transitions & Keyframe Animations**
- `transition` = smooth change between two states, needs a trigger (`:hover`, class toggle); shorthand `property duration timing-function delay`
- Only interpolable properties can transition (not `display: none` ↔ `block`)
- `@keyframes` = multi-step, self-running, loopable — no trigger needed
- Your analogy: `@keyframes` ≈ a function definition, `animation: name ...` ≈ calling it with config (duration/timing/iteration-count) as parameters — solid for definition+reuse, looser on true argument/return semantics
- `linear` timing avoids stutter at loop seams (e.g. spinners) since it holds constant velocity throughout
- CSS animates *how*; JS decides *when/whether* (e.g. stopping a spinner on load complete) — division of labor

**5. CSS Custom Properties (Variables)**
- `:root { --name: value; }`, read via `var(--name, fallback)`
- Unlike Sass variables (compiled away, static), custom properties are **live in the browser**, inherit, and follow the cascade
- Scoped overrides: redeclaring a variable inside a class (e.g. `.dark-theme`) cascades the new value to everything inheriting it — the mechanism behind most dark-mode toggles
- Can be read/set at runtime via JS (`style.setProperty`)

**6. HTML Forms**
- Input types (`email`, `number`, `tel`, `date`, `checkbox`/`radio`, `range`, `file`, etc.) give free mobile keyboard behavior + native validation
- Validation attributes: `required`, `min`/`max`, `minlength`/`maxlength`, `pattern` — native but never a substitute for server-side validation
- `<label for="id">` connects label to input — enables click-to-activate and screen-reader context; wrapping the input in the label works too
- Accessibility: `aria-describedby`, `aria-invalid`, `fieldset`/`legend` for grouping
- Small native checkbox/radio hit targets are an inherited OS-widget artifact, not a deliberate touch-safety design; labels fix this by expanding the effective clickable area