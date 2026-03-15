# Roadmap

Here are feature ideas grouped by how much they'd help oil painters specifically:

## Features

### High-value view modes

[✅] Notan — pure black/white threshold (no grays). Painters use this constantly to simplify composition into dark/light shapes before anything else. Simple threshold on luminance.

[✅] Posterize — keeps colour but reduces tones to flat bands (distinct from grayscale shades). Shows the "big shapes" in colour, great for blocking in.

[✅] Edge detection — Sobel filter overlay showing where hard vs soft edges are. Oil painters need to know which edges to sharpen vs lose.

[✅] Blur/simplify — Gaussian blur slider. Forces painters to see big masses and ignore detail. Very common physical technique (squinting) that digital blur replicates.

[✅] Warm/cool temperature map — highlight warm pixels amber, cool pixels blue. Oil painting is fundamentally about warm/cool temperature contrast, not just value.

### Composition tools

Composition overlays — rule of thirds, golden ratio grid, golden spiral, diagonal lines. More useful than a plain grid for composition analysis. Could be a separate overlay category alongside the existing grid.

[✅] Flip horizontal — button in the toolbar. Painters flip canvases constantly to spot compositional problems they've gone blind to.

### Colour tools

[✅] Colour harmony panel — when a colour is picked, show its complementary, split-complementary, analogous colours. Helps with colour mixing decisions.

Custom palette matching — user inputs their actual paint colours (hex or by clicking swatches), and the image is recoloured using only those colours. Very useful for planning a limited palette painting.

Value scale comparison — a draggable grey value scale overlay the painter can hold against areas of the image to judge tonal value accurately.

## Design

Areas for Improvement

[✅] Sidebar Information Architecture

The sidebar presents 9 view modes as a plain vertical list, then appends filter controls beneath it. As the mode list grows:

- Users can't distinguish modes without clicking each one — there are no visual previews or descriptions
- Controls for the active mode appear far below the mode buttons, breaking spatial adjacency
- Sections like "Grid Overlay," "Flip Horizontal," "Palette," and "Picked Colour" are all peers with no visual hierarchy

  Suggestion: Group modes by purpose (Value Study / Colour Analysis / Edge Detection). Show a one-line description under each mode name. Move mode-specific controls to appear inline, directly below the active mode
  button.

[✅] Empty State Canvas

The drop zone text ("Drop your reference image here") is functional but passive. For an art tool, there's an opportunity to make this moment more memorable — perhaps with a faint grid pattern or subtle illustration.

[✅] Toolbar Grouping

The top toolbar (Crop | Reset | Replace | Download | Fullscreen) mixes editing actions with file actions with view actions. Grouping them with a visual divider between "edit" and "file/view" would reduce
cognitive load.

1. Crop UX Gaps

- The crop overlay can only be repositioned by dragging — no resize handles. Artists will want to adjust the crop size, not just move it.
- "Apply Crop" and "Revert to Original" appearing at the bottom (crop panel) while the crop trigger is at the top (toolbar) creates spatial disconnection.

[✅] Colour Picker Prominence

PickedColourPanel is buried at the bottom of the sidebar with no visual call-to-action. Colour identification ("what exact colour is that shadow?") is one of the most valuable things this tool can offer an
artist — it deserves more presence.

[✅] No Before/After Comparison

There's no way to quickly compare the filtered view with the original. A split-view or toggle would dramatically improve the painting workflow (artists constantly reference back to the original).

[✅] Mode Names Could Be Clearer

- "Artist Grayscale" vs "Grayscale" — the difference (luminosity weighting) isn't obvious from the label
- "Grayscale Shades" and "Reduce Colours" do similar things in different channels — users may not understand the distinction
