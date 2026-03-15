# Rembrandt - Claude Code Guide

## App Purpose

Rembrandt is a static web app for artists and painters. It transforms reference images into painting-friendly formats using real-time visual filters. Artists upload a photo and apply filters to simplify it for sketching, value studies, and colour mixing practice.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5 (static adapter — no server)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 (utility-first, configured via `@tailwindcss/vite`)
- **Build**: Vite 7
- **Testing**: Vitest + Playwright (browser tests for `.svelte.test.ts`, Node for `.test.ts`)

## Project Structure

```
src/
  routes/
    +page.svelte          # App entry point
    +layout.svelte        # Root layout (favicon, global styles)
    layout.css            # Tailwind imports
  lib/
    canvasUtils.ts        # Shared RGB/HSL/hex helpers + canvas utilities
    index.ts              # Barrel exports
    components/
      ImageEditor.svelte  # Main component — canvas, filter orchestration, all settings panels
      colours/
        ColourAside.svelte          # Collapsible right sidebar for colour analysis
        ColourSwatch.svelte         # Single colour chip with hex label
        DominantColourPalette.svelte  # Extracted palette display
        DominantColourSwatch.svelte   # Palette swatch with percentage
        Harmony.svelte              # Complementary / analogous harmony display
        LightAndShade.svelte        # Light & shade tonal analysis panel
      controls/
        GridControls.svelte         # Grid overlay settings (rows, cols, colour, thickness)
        RangeControl.svelte         # Labelled range slider
      buttons/
        ButtonGroup.svelte          # Segmented button group
        IconButton.svelte           # Icon-only button
      icons/
        IconCompare.svelte
        IconCrop.svelte
        IconDownload.svelte
        IconEyedropper.svelte
        IconFullscreen.svelte
        IconImage.svelte
        IconMinimize.svelte
        IconPaintbrush.svelte
        IconUpload.svelte
    imageProcessing/
      grayscale.ts        # Three grayscale algorithms (standard, artist, limited shades)
      grid.ts             # Grid overlay renderer
      crop.ts             # Crop calculation helpers
      notan.ts            # Binary light/dark mass simplification
      temperatureMap.ts   # Warm/cool hue analysis overlay
      sobel.ts            # Sobel edge detection (with pre-blur + invert options)
      gaussianBlur.ts     # Gaussian blur filter
      kMeans.ts           # K-means clustering (shared by reduceColours + dominantColours)
      reduceColours.ts    # K-means colour quantization (2–32 colours)
      dominantColours.ts  # Dominant colour extraction for palette display
```

## Key Conventions

### Svelte 5 Runes

Use Svelte 5 syntax throughout — `$state`, `$derived`, `$effect`. Do not use legacy `let`/reactive `$:` syntax.

### Image Processing

All filters run on an HTML Canvas using `getImageData()` / `putImageData()`. Processing functions live in `src/lib/imageProcessing/` as pure TypeScript modules — keep them pure (no DOM/Svelte dependencies). The canvas rendering and filter dispatch live in `ImageEditor.svelte`.

### Formatting

- Tabs for indentation (not spaces)
- Single quotes
- 100 character line width
- Prettier + ESLint enforce this — run `npm run format` and `npm run lint` before committing

### Styling

Use Tailwind utility classes. Avoid writing custom CSS unless Tailwind can't achieve it. The typography plugin is available.

## Commands

```bash
npm run dev        # Dev server (localhost:5173)
npm run build      # Production static build
npm run check      # Type check
npm run lint       # Prettier + ESLint check
npm run format     # Auto-format
npm run test       # Run all tests (headless)
npm run test:unit  # Watch mode
```

## Current Features

| Feature                                                   | Status                                         |
| --------------------------------------------------------- | ---------------------------------------------- |
| Image upload (drag-drop + file picker)                    | Done                                           |
| Crop with aspect ratio presets                            | Done                                           |
| Grid overlay (customisable rows, cols, colour, thickness) | Done                                           |
| Grayscale (standard, artist, limited shades)              | Done                                           |
| Colour reduction (K-means, 2–32 colours)                  | Done                                           |
| Notan (binary light/dark mass simplification)             | Done                                           |
| Temperature map (warm/cool hue analysis overlay)          | Done                                           |
| Sobel edge detection (pre-blur + invert options)          | Done                                           |
| Gaussian blur                                             | Done                                           |
| Colour picking (click canvas to sample)                   | Done                                           |
| Dominant colour extraction + palette display              | Done                                           |
| Colour harmony (complementary / analogous)                | Done                                           |
| Light & shade tonal analysis                              | Done                                           |
| Flip horizontal                                           | Done                                           |
| Compare view (hold button to see original)                | Done                                           |
| Fullscreen view                                           | Done                                           |
| PNG download                                              | Done                                           |
| Low-poly triangulation                                    | Planned (dependency `delaunator` is installed) |

## Architecture Notes

- The app is **fully static** — no backend, no API calls. Everything runs in the browser.
- `ImageEditor.svelte` is the core component (~840 lines). It owns the canvas, crop state, active filter, and all settings panels. Be careful when editing it — it has many interdependent reactive effects.
- `ColourAside.svelte` is a collapsible right sidebar that houses colour analysis tools: dominant palette, colour harmony, and light & shade panels.
- `canvasUtils.ts` provides shared RGB/HSL/hex conversion helpers and canvas utilities used across components and imageProcessing modules.
- `kMeans.ts` is a standalone K-means clustering module reused by both `reduceColours.ts` (colour quantization filter) and `dominantColours.ts` (palette extraction).
- Crop mode uses mouse events on the canvas with DPI-aware coordinate scaling.
- K-means colour reduction samples every 4th pixel for performance, then maps all pixels to the nearest centroid.
- The `delaunator` package is installed for a planned low-poly filter but is not yet wired up.

## What "Good" Looks Like

- Image processing functions should be pure and testable in isolation
- UI state and canvas rendering belong in `ImageEditor.svelte`
- New filters follow the same pattern: add a type to the view mode union, add a settings panel, add a processing function in `imageProcessing/`, call it in the canvas render effect
- Keep the UI minimal and focused on artist workflows
