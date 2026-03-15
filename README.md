# Rembrandt

> _Reference photos are too detailed. Rembrandt strips them down to what your painting brain actually needs._

A browser-based tool for artists. Upload a photo and apply real-time visual filters to simplify it for value studies, colour mixing, and sketching — no installation, no backend, everything runs in the browser.

## 🎨 Features

### Tone & Value

**Grayscale** — standard luminance or artist-tuned channel weights.

**Value Steps** — quantised tonal zones (2–10 shades) that force clarity about where each passage belongs in the value structure.

**Notan** — binary light/dark mass simplification. Strips the composition down to its essential shapes.

**Gaussian blur** — removes fine detail to reveal large value masses; the digital equivalent of squinting.

### Colour

**Temperature map** — highlights warm pixels amber and cool pixels blue, supporting temperature contrast decisions at a glance.

**Colour reduction** — K-means quantization (2–32 colours) shows the image as "big colour shapes."

**Colour picker** — click anywhere on the canvas to sample a pixel's hex value.

**Dominant palette** — extracted colours with percentage coverage, so you know what you're actually painting.

**Colour harmony** — complementary and analogous relationships shown for any picked colour.

**Light & shade analysis** — tonal profiles (Morning / Golden Hour / Overcast) for understanding the light in the reference.

### Edge & Form

**Sobel edge detection** — adjustable threshold with optional pre-blur and invert. Shows hard vs. soft edges so you can decide which to sharpen or lose.

### 🛠 Tools

**Crop** — 10 aspect ratio presets with drag-to-reposition.

**Grid overlay** — configurable rows, columns, colour, and thickness, overlaid on any view mode.

**Composition overlays** — rule of thirds, golden ratio grid, golden spiral, and diagonal lines.

**Flip horizontal** — mirrors the image instantly; useful for spotting problems you've gone blind to.

**Compare view** — hold to reveal the original for quick before/after reference.

**Fullscreen** — distraction-free view for detailed inspection.

**PNG download** — export the filtered image.

## ⚙️ Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Framework | SvelteKit 2 + Svelte 5 (runes) |
| Adapter   | Static (no server)             |
| Language  | TypeScript (strict)            |
| Styling   | Tailwind CSS 4                 |
| Build     | Vite 7                         |
| Testing   | Vitest + Playwright            |

## 🏗 Architecture

All processing runs in the browser via HTML Canvas — no backend, no API calls.

- **`ImageEditor.svelte`** owns the canvas, active filter state, and all settings panels
- **`src/lib/imageProcessing/`** contains pure TypeScript modules for each filter (no DOM or Svelte dependencies)
- **`kMeans.ts`** is shared by colour reduction (quantization filter) and dominant colour extraction (palette display)
- **`canvasUtils.ts`** provides RGB↔HSL/Hex conversion helpers and DPI-aware canvas utilities
- Svelte 5 runes (`$state`, `$derived`, `$effect`) throughout — no legacy reactive syntax

## 🚀 Getting Started

```sh
npm install
npm run dev        # Dev server at localhost:5173
```

Other commands:

```sh
npm run build      # Production static build
npm run preview    # Preview production build
npm run check      # Type check
npm run lint       # Prettier + ESLint check
npm run format     # Auto-format
npm run test       # Run all tests
```

## Planned

- **Low-poly triangulation** — Delaunay-based geometric simplification (`delaunator` is installed, filter not yet wired up)
