# Roadmap

This file tracks what's been built, what's in progress, and what's worth building next. Features are described in enough detail to understand the painter's use case, not just the implementation.

---

## ✅ Done

### View Modes

- **Grayscale** — three algorithms: standard luminance, artist-weighted (emphasises perceptual brightness), and limited shades (posterised tones for value studies)
- **Notan** — binary light/dark mass simplification using a luminance threshold; strips composition down to its essential shapes
- **Colour Reduction** — K-means quantisation (2–32 colours); shows the painting in its "big colour shapes"
- **Temperature Map** — warm/cool hue overlay; highlights warm pixels amber and cool pixels blue to support temperature contrast decisions
- **Sobel Edge Detection** — Sobel filter with optional pre-blur and inversion; shows hard vs. soft edges for painters deciding which to sharpen or lose
- **Gaussian Blur** — adjustable blur strength to replicate the "squinting" technique and force attention on large masses

### Canvas Tools

- **Crop** — freehand crop with aspect ratio presets (square, 4:3, 16:9, 2:3, custom); drag to reposition the crop region
- **Grid Overlay** — customisable rows, columns, colour, and thickness; overlaid on any view mode
- **Composition Overlays** — rule of thirds, golden ratio grid, golden spiral, and diagonal line overlays for composition analysis
- **Flip Horizontal** — mirrors the image instantly; painters use this constantly to spot problems they've gone blind to
- **Compare View** — hold a button to toggle back to the original image for quick before/after reference
- **Fullscreen View** — expands the canvas to fill the screen for detailed inspection
- **PNG Download** — exports the current filtered canvas as a PNG
- **Colour Picker** — click anywhere on the canvas to sample a pixel's colour; displays the hex value

### Colour Analysis

- **Dominant Colour Palette** — extracts the most prominent colours from the image using K-means clustering and displays them as swatches with percentage coverage
- **Colour Harmony** — given a picked colour, shows complementary and analogous harmonies to support colour mixing decisions
- **Light & Shade Tonal Analysis** — analyses the tonal distribution of the image and presents a breakdown of light, mid, and shadow zones

### Workflow

- **Drag-and-drop upload** — drop a reference image directly onto the canvas or use the file picker
- **Collapsible colour sidebar** — right-hand panel housing all colour analysis tools, collapsible to maximise canvas space

---

## 🔧 In Progress / Planned

### Low-Poly Triangulation

> The `delaunator` package is installed but not yet wired up. The filter would triangulate the image using Delaunay triangulation and fill each triangle with the average colour of its region. Useful for seeing the image as abstract colour planes, the way a painter thinks about blocking in.

### Crop Resize Handles

> The crop overlay currently supports drag-to-reposition only. Adding corner and edge handles would let painters adjust the crop region size without having to reset and start over.

### Custom Palette Matching

> The user inputs their actual paint colours (hex or by clicking swatches), and the image is recoloured using only those pigments. Very useful for planning a limited-palette painting before touching a brush.

### Value Scale Comparison

> A draggable grey value scale overlay the painter can hold against areas of the image to judge tonal value accurately — the digital version of holding a Munsell value scale up to the subject.

### Saturation Map

> An overlay that highlights highly saturated areas in one colour and desaturated areas in another. Helps painters identify where chromatic intensity is concentrated.

### Split-View Compare

> A persistent side-by-side or split-screen view showing the original and the filtered image simultaneously, rather than the current hold-to-compare approach.

### Colour Shift Simulation

> Simulate how colours appear under different light temperatures (warm afternoon light vs. cool overcast light). Helps painters plan how their palette choices will read under the intended lighting conditions.

---

## 💡 New Ideas

### Value & Tone

**Value Histogram** — a real-time histogram showing the distribution of luminance values across the image. Painters can instantly see if their reference is high-key, low-key, or balanced — and whether they have enough tonal separation between major masses.

**Three-Value Reduction** — reduces the image to exactly three tones (light, mid, dark) with user-adjustable threshold sliders. More nuanced than Notan (which is binary) but more ruthless than the existing limited-shades grayscale. Forces clarity about where each passage belongs in the value structure.

**Rembrandt Lighting Analyser** — detects the primary light source direction and highlights the classic Rembrandt lighting triangle — the small light patch on the shadow side of the face or subject. Useful for portrait painters working from reference who want to identify and exaggerate the lighting pattern.

### Colour

**Munsell Chroma Isolation** — isolates pixels above a user-set chroma threshold and renders everything below it as neutral grey. Helps painters identify where true colour (vs. neutral) exists in the reference, which is less obvious than it sounds in real-world scenes.

**Colour Temperature Intensity Map** — an extension of the existing temperature overlay that maps the _degree_ of warmth or coolness rather than just categorising warm/cool. Shows a gradient from deep cool to deep warm, helping painters make subtler temperature decisions in transitional passages.

**Ambient Occlusion Approximation** — approximates soft contact shadows and concave shading using local contrast — the areas where light fails to reach because of nearby geometry. Rendered as a greyscale overlay. Useful for understanding shadow placement in complex still life or figure references.

### Composition & Drawing Aids

**Centre of Mass Indicator** — calculates and displays the visual centre of mass of the image — the weighted centroid of luminance or colour. Painters often intuitively feel when a composition is unbalanced; this makes the imbalance legible and measurable.

**Thumbnail Generator** — outputs a strip of very small (thumbnail-scale) versions of the image under different filters — notan, temperature map, grayscale, colour reduction — simultaneously. Painters traditionally do thumbnail sketches to evaluate composition; this is the digital equivalent for reference analysis.

**Dynamic Symmetry / Rabatment Overlay** — adds overlays based on dynamic symmetry (diagonal reciprocals, armature of the rectangle) and the rabatment of the rectangle — compositional tools used by classical and contemporary realist painters that go beyond the rule of thirds.

---

## 🎛 Design / UX

### Resolved

- **Sidebar information architecture** — view modes are grouped, mode-specific controls appear inline beneath the active mode
- **Toolbar grouping** — editing actions, file actions, and view actions are visually separated
- **Empty state canvas** — the drop zone is distinct and visually clear
- **Colour picker prominence** — the colour picker is accessible via the toolbar and the picked colour is displayed prominently
- **Before/after comparison** — the hold-to-compare button addresses the original absence of any comparison mechanism
- **Mode name clarity** — mode labels now communicate their purpose more directly

### Open

**Crop spatial disconnect** — "Apply Crop" and "Revert to Original" appear in the bottom crop panel while the crop trigger is in the top toolbar. This spatial separation causes confusion. The crop confirmation actions should appear near the crop overlay itself, or at minimum near the toolbar trigger.

**Mobile and touch support** — the app works on desktop but is not optimised for touch. Crop dragging, colour picking, and overlay interactions all depend on mouse events. Painters increasingly work on tablets; pointer event support and a touch-friendly layout would open the tool to that audience.

**Keyboard shortcuts** — no keyboard shortcuts exist. Common actions — toggle filter, flip, compare, download — would benefit from hotkeys for painters who want to stay in flow without reaching for the mouse.
