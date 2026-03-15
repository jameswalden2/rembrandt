<script lang="ts">
	import { type DominantColour } from '$lib/imageProcessing/dominantColours';
	import { rgbToHsl } from '$lib/canvasUtils';
	import IconEyedropper from '../icons/IconEyedropper.svelte';

	import Harmony from './Harmony.svelte';
	import LightAndShade from './LightAndShade.svelte';
	import DominantColourPalette from './DominantColourPalette.svelte';

	let {
		pickedColour = $bindable(),
		dominantColours
	}: {
		pickedColour: { hex: string; r: number; g: number; b: number } | null;
		dominantColours: DominantColour[];
	} = $props();

	const hsl = $derived(
		pickedColour ? rgbToHsl(pickedColour.r, pickedColour.g, pickedColour.b) : null
	);

	let isOpen = $state(true);
	const totalCount = $derived(dominantColours.reduce((s, c) => s + c.count, 0));
</script>

<aside
	class="relative flex shrink-0 flex-col overflow-y-auto border-l border-studio-border
	       bg-studio-panel transition-all duration-200"
	style="width: {isOpen ? '16rem' : '2.5rem'};"
>
	{#if isOpen}
		<!-- Header -->
		<div class="flex shrink-0 items-center justify-between border-b border-studio-border px-3 py-2">
			<span class="text-xs font-medium tracking-widest text-studio-text-muted uppercase">
				Picked Colour
			</span>
			<div class="flex items-center gap-1">
				{#if pickedColour}
					<button
						onclick={() => (pickedColour = null)}
						class="flex h-5 w-5 cursor-pointer items-center justify-center rounded text-studio-text-muted transition-colors hover:text-studio-text-primary"
						title="Clear colour"
					>
						×
					</button>
				{/if}
				<button
					onclick={() => (isOpen = false)}
					class="flex h-5 w-5 cursor-pointer items-center justify-center rounded text-studio-text-muted transition-colors hover:text-studio-text-primary"
					title="Collapse panel"
				>
					›
				</button>
			</div>
		</div>

		{#if !pickedColour}
			<!-- Empty state -->
			<div class="flex flex-col items-center gap-3 p-6 py-12 text-center">
				<div>
					<IconEyedropper class="h-12 w-12 text-studio-amber/40" />
				</div>
				<p class="font-heading text-xl text-studio-text-secondary">Pick a colour</p>
				<p class="text-xs text-studio-text-muted">Click anywhere on the image</p>
			</div>
		{:else}
			<!-- Large swatch block -->
			<div
				class="mx-3 mt-3 h-24 shrink-0 rounded-md ring-1 ring-studio-border"
				style:background-color={pickedColour.hex}
			></div>

			<!-- Colour values -->
			<div class="flex flex-col gap-2 p-3">
				<div class="flex items-center justify-between font-mono text-xs">
					<span class="text-studio-text-muted">HEX</span>
					<span class="text-studio-text-primary">{pickedColour.hex}</span>
				</div>
				<div class="flex items-center justify-between font-mono text-xs">
					<span class="text-studio-text-muted">RGB</span>
					<span class="text-studio-text-primary"
						>{pickedColour.r}&nbsp;&nbsp;{pickedColour.g}&nbsp;&nbsp;{pickedColour.b}</span
					>
				</div>
				{#if hsl}
					<div class="flex items-center justify-between font-mono text-xs">
						<span class="text-studio-text-muted">HSL</span>
						<span class="text-studio-text-primary"
							>{Math.round(hsl.h)}°&nbsp;&nbsp;{Math.round(hsl.s * 100)}%&nbsp;&nbsp;{Math.round(
								hsl.l * 100
							)}%</span
						>
					</div>
				{/if}
			</div>

			<!-- Gradient bar -->
			<div class="mx-3 shrink-0">
				<div
					class="h-5 w-full rounded border border-studio-border"
					style="background: linear-gradient(to right, #ffffff, {pickedColour.hex}, #000000);"
				></div>
			</div>

			<!-- Harmony section -->
			<Harmony {pickedColour} />

			<!-- Light and Shade section -->
			<LightAndShade {pickedColour} />
		{/if}

		<!-- Dominant colours palette -->
		{#if dominantColours.length > 0}
			<div class="border-t border-studio-border">
				<DominantColourPalette
					colours={dominantColours}
					{totalCount}
					onpick={(c) => (pickedColour = { hex: c.hex, r: c.r, g: c.g, b: c.b })}
				/>
			</div>
		{/if}
	{:else}
		<!-- Collapsed state — eyedropper icon, click to expand -->
		<button
			onclick={() => (isOpen = true)}
			class="flex h-full w-full flex-col items-center justify-center gap-1 text-studio-text-muted transition-colors hover:cursor-pointer hover:text-studio-text-secondary"
			title="Expand colour picker"
		>
			<IconEyedropper class="h-5 w-5" />
		</button>
	{/if}
</aside>
