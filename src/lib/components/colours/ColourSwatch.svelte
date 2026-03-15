<script lang="ts">
	import { type Colour } from '$lib/imageProcessing/dominantColours';

	let { colour, size = 'md' }: { colour?: Colour; size?: 'md' | 'lg' } = $props();

	const hex = $derived(colour?.hex ?? '#9ca3af');
	const swatchClass = $derived(size === 'lg' ? 'h-16 w-14' : 'h-12 w-10');
</script>

<div class="group flex flex-col items-center gap-1">
	<div
		class="{swatchClass} rounded border border-studio-border shadow-sm transition-all duration-200
		       group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
		style:background-color={hex}
		title={hex}
	></div>

	<span
		class="font-mono text-xs text-studio-text-muted transition-colors group-hover:text-studio-text-secondary"
	>
		{hex}
	</span>
</div>
