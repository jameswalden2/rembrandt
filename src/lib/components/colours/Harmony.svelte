<script lang="ts">
	import { rotateHue } from '$lib/canvasUtils';
	import ColourSwatch from './ColourSwatch.svelte';

	let harmonyMode: 'complementary' | 'analogous' = $state('complementary');

	let {
		pickedColour = $bindable()
	}: {
		pickedColour: { hex: string; r: number; g: number; b: number } | null;
	} = $props();

	const complementColour = $derived(
		pickedColour ? rotateHue(pickedColour.r, pickedColour.g, pickedColour.b, 180) : undefined
	);

	const analogousMinus = $derived(
		pickedColour ? rotateHue(pickedColour.r, pickedColour.g, pickedColour.b, -30) : undefined
	);

	const analogousPlus = $derived(
		pickedColour ? rotateHue(pickedColour.r, pickedColour.g, pickedColour.b, 30) : undefined
	);
</script>

<div class="flex flex-col gap-2 p-3">
	<span class="text-[10px] font-medium tracking-widest text-studio-text-muted uppercase"
		>Harmony</span
	>
	<div class="flex rounded border border-studio-border text-xs font-medium">
		<button
			class="flex-1 rounded-l px-2 py-1 transition-colors {harmonyMode === 'complementary'
				? 'bg-studio-accent text-white'
				: 'text-studio-text-muted hover:text-studio-text-secondary'}"
			onclick={() => (harmonyMode = 'complementary')}
		>
			Complement
		</button>
		<button
			class="flex-1 rounded-r px-2 py-1 transition-colors {harmonyMode === 'analogous'
				? 'bg-studio-accent text-white'
				: 'text-studio-text-muted hover:text-studio-text-secondary'}"
			onclick={() => (harmonyMode = 'analogous')}
		>
			Analogous
		</button>
	</div>
	<div class="flex items-center gap-2">
		{#if harmonyMode === 'complementary'}
			<ColourSwatch colour={pickedColour ?? undefined} size="lg" />
			<ColourSwatch colour={complementColour} size="lg" />
		{:else}
			<ColourSwatch colour={analogousMinus} size="lg" />
			<ColourSwatch colour={pickedColour ?? undefined} size="lg" />
			<ColourSwatch colour={analogousPlus} size="lg" />
		{/if}
	</div>
</div>
