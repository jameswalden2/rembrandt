<script lang="ts">
	import { type DominantColour } from '$lib/imageProcessing/dominantColours';
	import ColourSwatch from './ColourSwatch.svelte';

	let {
		colour,
		totalCount,
		onpick
	}: { colour?: DominantColour; totalCount?: number; onpick?: (colour: DominantColour) => void } =
		$props();

	const pct = $derived(colour && totalCount ? Math.round((colour.count / totalCount) * 100) : null);
</script>

<button
	class="group flex flex-col items-center gap-1 {onpick
		? 'focus-visible:ring-studio-accent cursor-pointer focus:outline-none focus-visible:ring-2'
		: 'cursor-default'}"
	onclick={() => colour && onpick?.(colour)}
	disabled={!onpick}
	title={colour ? `Pick ${colour.hex}` : undefined}
>
	<ColourSwatch {colour} />
	{#if pct !== null}
		<span class="font-mono text-xs text-studio-text-muted opacity-70">{pct}%</span>
	{/if}
</button>
