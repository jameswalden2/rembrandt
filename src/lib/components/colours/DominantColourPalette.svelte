<script lang="ts">
	import { type DominantColour } from '$lib/imageProcessing/dominantColours';
	import DominantColourSwatch from './DominantColourSwatch.svelte';

	let {
		colours,
		totalCount,
		onpick
	}: {
		colours: DominantColour[];
		totalCount: number;
		onpick?: (colour: DominantColour) => void;
	} = $props();
</script>

<!-- Palette header -->
<div class="flex shrink-0 items-center border-b border-studio-border px-3 py-2">
	<span class="text-[10px] font-medium tracking-widest text-studio-text-muted uppercase">
		Palette
	</span>
</div>
<div class="flex flex-wrap gap-2 p-3">
	{#each colours as colour, i (i)}
		<DominantColourSwatch {colour} {totalCount} {onpick} />
	{/each}
</div>
