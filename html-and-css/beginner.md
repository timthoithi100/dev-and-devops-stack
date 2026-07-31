## Beginner Recap — HTML & CSS

**1. How Browsers Work (Rendering Pipeline)**
- Request → Response: DNS lookup → TCP/TLS handshake → HTTP request/response
- Parsing: HTML → **DOM**, CSS → **CSSOM**
- DOM + CSSOM → **Render tree** (invisible elements excluded)
- **Layout/reflow** (calculate size/position) → **Paint** (draw pixels) → **Composite** (assemble layers)
- Key rules: CSS blocks *painting* (not parsing); unblocked `<script>` tags block *parsing* wherever they sit in the document; layout-affecting changes trigger reflow+repaint+composite (expensive), paint-only changes (color) trigger just repaint+composite (cheap)

**2. HTML Document Structure**
- `<!DOCTYPE html>` prevents quirks mode
- `<head>` = metadata (nothing visible), `<body>` = visible content
- `<meta charset="UTF-8">` and `<meta name="viewport">` are near-mandatory
- Stylesheets belong early in `<head>` — CSSOM ready ASAP means no unstyled flash

**3. Semantic Elements**
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, heading hierarchy (`<h1>`–`<h6>`), `<a>`, `<img alt="">`, `<form>`
- The `<article>` vs `<section>` test: **could this be lifted out of context and still make sense on its own?** Yes → `<article>` (a comment, a product card). No, only meaningful attached to the page → `<section>` (a "related products" widget)
- Nesting depth is irrelevant to this test — `<article>`s and `<section>`s can nest either way

**4. The Box Model**
- Layers, inside out: **content → padding → border → margin**
- Default (`content-box`): `width`/`height` set *only* the content box — padding/border add on top, inflating actual rendered size
- `box-sizing: border-box` makes `width`/`height` include padding+border, so specified size = actual size

**5. Selectors, Specificity, Cascade**
- Selector strength ladder: universal → type → class/attribute/pseudo-class → ID → inline style → `!important`
- Specificity is a 4-column score `(inline, IDs, classes/attrs/pseudo-classes, elements)` — compared **column by column, most significant first**, never added as a flat number
- Equal specificity → source order wins (later rule wins)
- Inheritance: typography properties (color, font-family, line-height) inherit to children by default; box/layout properties (border, padding, margin) don't

**6. Colors, Fonts, Units**
- Color formats: keyword, hex, RGB(A), HSL(A) — HSL is easiest to reason about for adjusting brightness/saturation
- Font stacks need fallbacks ending in a generic family (`sans-serif`, etc.)
- Units: `px` (fixed), `%` (relative to parent), `em` (relative to *own parent's* font-size — **compounds when nested**), `rem` (relative to root `<html>` — flat, doesn't compound), `vw`/`vh` (viewport percentage)
