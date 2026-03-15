# Rembrandt

A browser-based painting reference tool for artists. Upload a photo and apply real-time visual filters to simplify it for value studies, colour mixing, and sketching — no installation, no backend, everything runs in the browser.

## Why

Reference photos are detailed and complex. Painters need to simplify them — to see large tonal masses, identify warm/cool temperature shifts, reduce a scene to its essential colours. Rembrandt transforms any photo into the format your painting brain needs.

## Features

### Tone & Value

| Filter | Description |
|--------|-------------|
| Grayscale | Standard luminance or artist-tuned channel weights |
| Value Steps | Quantised tonal zones (2–10 shades) for simplified value studies |
| Notan | Binary light/dark mass simplification |
| Gaussian blur | Removes detail to reveal large value masses |

### Colour

| Feature | Description |
|---------|-------------|
| Temperature map | Warm/cool hue analysis overlay |
| Colour reduction | K-means quantization (2–32 colours) |
| Colour picker | Click the canvas to sample any colour |
| Dominant palette | Extracted colours with percentage coverage |
| Colour harmony | Complementary and analogous relationships |
| Light & shade analysis | Tonal profiles (Morning / Golden Hour / Overcast) |

### Edge & Form

| Filter | Description |
|--------|-------------|
| Sobel edge detection | Adjustable threshold, optional pre-blur and invert |

### Tools

| Tool | Description |
|------|-------------|
| Crop | 10 aspect ratio presets |
| Grid overlay | Configurable rows, columns, colour, and thickness |
| Flip horizontal | Mirror the reference |
| Compare view | Hold to reveal the original |
| Fullscreen | Distraction-free view |
| PNG download | Export the filtered image |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | SvelteKit 2 + Svelte 5 (runes) |
| Adapter | Static (no server) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Build | Vite 7 |
| Testing | Vitest + Playwright |

## Architecture

- **Fully static** — no backend, no API calls; all processing runs in the browser via HTML Canvas
- **`ImageEditor.svelte`** owns the canvas, active filter state, and all settings panels
- **`src/lib/imageProcessing/`** contains pure TypeScript modules for each filter (no DOM or Svelte dependencies)
- **`kMeans.ts`** is shared by colour reduction (quantization filter) and dominant colour extraction (palette display)
- **`canvasUtils.ts`** provides RGB↔HSL/Hex conversion helpers and DPI-aware canvas utilities
- Svelte 5 runes (`$state`, `$derived`, `$effect`) throughout — no legacy reactive syntax

## Getting Started

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
