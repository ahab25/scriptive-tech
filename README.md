# SCRIPTIVE

> A premium, award-ready 3D website for SCRIPTIVE — built with Next.js 15, React Three Fiber, Framer Motion, and a custom GLSL shader system.

---

## Quick start

```bash
# 1. Install
pnpm install      # or: npm install / yarn

# 2. Dev server
pnpm dev          # → http://localhost:3000

# 3. Production build
pnpm build && pnpm start

# 4. Type-check + lint
pnpm type-check
pnpm lint
```

Node **20+** is required.

---

## Architecture

```
scriptive/
├─ app/
│  ├─ layout.tsx          # root layout: fonts, metadata, providers, preloader
│  ├─ page.tsx            # single landing page composition
│  ├─ globals.css         # tokens, typography, cursor, glass, grain
│  ├─ loading.tsx         # route-level loading UI
│  ├─ not-found.tsx       # 404
│  ├─ global-error.tsx    # root error boundary
│  ├─ sitemap.ts          # dynamic sitemap
│  ├─ robots.ts           # crawler rules
│  └─ manifest.ts         # PWA manifest
│
├─ components/
│  ├─ providers/
│  │  └─ SmoothScrollProvider.tsx   # Lenis inertia scroll
│  ├─ three/                        # all 3D code
│  │  ├─ Scene.tsx                  # tuned R3F Canvas wrapper
│  │  ├─ PrismMaterial.tsx          # custom shader (noise + fresnel)
│  │  ├─ PrismObject.tsx            # hero flagship mesh
│  │  ├─ HeroParticles.tsx          # ambient particle field
│  │  ├─ CameraRig.tsx              # scroll-driven camera
│  │  ├─ HeroPostFX.tsx             # bloom + CA + vignette
│  │  ├─ HeroScene.tsx              # composes the hero 3D scene
│  │  └─ ContactBackdrop.tsx        # decorative shapes for contact
│  ├─ sections/                     # one file per page section
│  └─ ui/                           # reusable interface pieces
│
├─ hooks/                   # useMagnetic, useMousePosition, useReducedMotion
├─ lib/                     # constants, data, utils
├─ public/                  # favicon, noise, og image, textures
├─ types/                   # shared TS types (room to grow)
├─ next.config.ts           # security headers, image domains, transpile
├─ tailwind.config.ts       # obsidian / neon palette, display fonts
├─ tsconfig.json            # strict mode + path aliases (@/)
└─ postcss.config.mjs
```

### Design system

| Token          | Value                 | Purpose                     |
| -------------- | --------------------- | --------------------------- |
| `obsidian-950` | `#0a0a0f`             | Page background             |
| `obsidian-1000`| `#000004`             | Deepest surface             |
| `neon-cyan`    | `#00e5ff`             | Primary accent, brand       |
| `neon-violet`  | `#8b5cf6`             | Secondary accent            |
| `neon-magenta` | `#ff2d95`             | Tertiary / highlight        |
| `neon-lime`    | `#b6ff4f`             | Utility accent              |
| `font-display` | Clash Display         | Headlines, display copy     |
| `font-sans`    | Satoshi               | Body copy                   |
| `font-mono`    | JetBrains Mono        | Labels, captions, counters  |

**Type system notes:** Clash + Satoshi are served via [Fontshare](https://fontshare.com) (see the `@import` in `app/globals.css`). JetBrains Mono uses `next/font/google` so it self-hosts at build time. If you want to self-host Clash/Satoshi as well, download the WOFF2 files and drop them in `app/fonts/`, then use `next/font/local`.

### Cursor & interaction model

- Every site surface declares its intent through `data-cursor`:
  - `data-cursor="hover"` → ring expands, fills with cyan (for links/buttons)
  - `data-cursor="text"` → ring narrows into a text caret
  - no attribute → default orbital cursor
- The cursor is disabled automatically on coarse pointers (`(hover: none)`).
- `<input>` and `<textarea>` show the native cursor via the `.native-cursor` utility.

### Motion

- **Framer Motion** handles all DOM animations (stagger, reveal, page transitions).
- **GSAP** is listed as a dependency but not currently required — it's there for future scroll-driven timelines you may want to add.
- **Lenis** powers inertia-based scrolling.
- Everything respects `prefers-reduced-motion` — Lenis disables itself, CSS animations collapse to 0.01ms.

---

## The 3D system

The hero scene is **one deliberate object**, not a grab-bag of shapes — that's what separates award-level sites from portfolio-template sites.

- **`PrismMaterial`** — a custom `ShaderMaterial` that displaces a mesh with 3D simplex noise and shades it with a fresnel-blended cyan→violet gradient. This is what creates the "liquid glass" feel. It reads pointer position as a uniform and leans the surface toward the cursor.
- **`PrismObject`** — a torus-knot wearing `PrismMaterial`. Scroll shrinks and lifts it; pointer tilts it; a base rotation keeps the silhouette alive.
- **`HeroParticles`** — 1,400 additive-blended points drifting vertically through a spherical volume. Cheap, atmospheric.
- **`CameraRig`** — reads a scroll-progress ref and smoothly dollies the camera back + tilts it up as you leave the hero.
- **`HeroPostFX`** — bloom, a hair of chromatic aberration, vignette. Tuned conservatively; aggressive post cheapens the look.

### Performance budget

- `dpr={[1, 2]}` capped — retina scales up but won't blow past 2×.
- All heavy components are `dynamic()`-loaded with `ssr: false`, keeping the server bundle lean.
- Tailwind's JIT + Next.js's `optimizePackageImports` tree-shake `@react-three/drei` and `framer-motion`.
- `frustumCulled={false}` is used only on the particle field where it actually matters.

Target: **60 fps** on an M1 MacBook Air; **30–45 fps** on mid-range mobile.

---

## Accessibility

- Semantic landmarks (`<main>`, `<header>`, `<footer>`, `<section>`).
- Skip-to-content link at the top of `layout.tsx`.
- `prefers-reduced-motion` honored everywhere.
- All interactive elements have `.focus-ring` with a visible cyan outline.
- Form labels are real `<label>`s; the floating-label trick is pure CSS, no ARIA tricks.
- Color contrast: all body text is ≥ AA on the obsidian background. Double-check custom neon-on-dark combinations if you edit the palette.

---

## SEO

- Full `metadata` + `viewport` exports in `layout.tsx`.
- Open Graph & Twitter cards (edit `/public/og.svg`, then export a 1200×630 PNG named `og.png`).
- JSON-LD `Organization` schema is inlined in `layout.tsx`.
- `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts` are Next.js file-based routes — they generate on build.
- Update `SITE.url` in `lib/constants.ts` before deploying.

---

## Contact form

The `Contact` section currently `console.log`s the payload. To wire it up:

1. Pick a provider: **Resend** (recommended), **Formspree**, **SendGrid**, or a custom Route Handler.
2. Create `app/api/contact/route.ts` with a `POST` handler.
3. Replace the `console.log` in `components/sections/Contact.tsx` with a `fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })`.
4. Add `RESEND_API_KEY` and `CONTACT_EMAIL_TO` to your Vercel env.

---

## Deployment

**Vercel** is the intended target:

```bash
pnpm i -g vercel
vercel
```

First-time setup will ask for the project name and link. After that, `git push` to your main branch deploys.

Environment variables to set on Vercel:

- `NEXT_PUBLIC_SITE_URL` — your production origin
- Optional: `RESEND_API_KEY`, `CONTACT_EMAIL_TO`

---

## Sound design (optional polish)

Subtle sound — when done right — is the single biggest driver of perceived quality on Awwwards-style sites. A starter plan:

| Event                      | Sound                                     | Duration  | Volume |
| -------------------------- | ----------------------------------------- | --------- | ------ |
| Preloader → main reveal    | Soft "whoosh" with low-pass filter sweep  | 600 ms    | -18 dB |
| Section enter (IntersectionObserver) | Synthetic granular tick | 120 ms    | -28 dB |
| Hero cursor over prism     | Looped sub-bass hum, pitch follows pointer| continuous | -32 dB |
| Button hover               | Short UI "tac" (higher pitch on primary)  | 60 ms     | -24 dB |
| Form submit success        | Rising arpeggio, 3 notes                  | 500 ms    | -20 dB |
| Navigation open (mobile)   | Panel "slide" with noise burst            | 350 ms    | -22 dB |

**Implementation sketch:**

```ts
// lib/sound.ts
class SoundKit {
  private ctx: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private enabled = false;

  async enable() {
    this.ctx = new AudioContext();
    this.enabled = true;
    // Preload: await Promise.all([this.load("hover", "/audio/hover.mp3"), ...])
  }

  play(name: string, volume = 1) {
    if (!this.enabled || !this.ctx) return;
    const buffer = this.buffers.get(name);
    if (!buffer) return;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    gain.gain.value = volume;
    src.buffer = buffer;
    src.connect(gain).connect(this.ctx.destination);
    src.start();
  }
}
```

Important:

- **Sound must be user-initiated.** Browsers block auto-play. Expose a toggle in the footer ("Sound: ON / OFF") so visitors opt in.
- Persist the preference in `localStorage`.
- Respect `prefers-reduced-motion` as a proxy for reduced-audio preference too.
- Recommended asset libraries: [zapsplat.com](https://zapsplat.com), [freesound.org](https://freesound.org), or a custom Ableton pack.

---

## Known follow-ups before launch

- [ ] Replace placeholder gradients in `Portfolio` with real project imagery via `next/image`.
- [ ] Export `og.png` from `og.svg` (or design a richer variant in Figma).
- [ ] Wire up the contact form to a real provider.
- [ ] Add a `studio` / case-study route — the current site is single-page.
- [ ] Add `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` to `/public`.
- [ ] Record a Lighthouse baseline and hold the performance budget with every PR.
- [ ] Consider adding View Transitions for smoother in-page anchor jumps.

---

## License

Proprietary — © SCRIPTIVE. All rights reserved.
