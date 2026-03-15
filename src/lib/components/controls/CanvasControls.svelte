<script lang="ts">
	import GridControls from './GridControls.svelte';
	import ToggleControl from './ToggleControl.svelte';

	type GridOptions = { rows: number; cols: number; color: string; thickness: number };
	type CompositionOptions = { color: string; thickness: number };

	let {
		showGrid = $bindable(),
		flipHorizontal = $bindable(),
		grid = $bindable(),
		showRuleOfThirds = $bindable(),
		showGoldenRatio = $bindable(),
		showGoldenSpiral = $bindable(),
		showDiagonalLines = $bindable(),
		composition = $bindable()
	}: {
		showGrid: boolean;
		flipHorizontal: boolean;
		grid: GridOptions;
		showRuleOfThirds: boolean;
		showGoldenRatio: boolean;
		showGoldenSpiral: boolean;
		showDiagonalLines: boolean;
		composition: CompositionOptions;
	} = $props();

	const anyComposition = $derived(
		showRuleOfThirds || showGoldenRatio || showGoldenSpiral || showDiagonalLines
	);
</script>

<div class="border-b border-studio-border p-4">
	<p class="mb-3 text-[10px] font-medium tracking-widest text-studio-text-muted uppercase">
		Canvas
	</p>
	<div class="flex flex-col gap-2">
		<ToggleControl bind:checked={showGrid} label="Grid Overlay" />
		{#if showGrid}
			<div class="mt-1">
				<GridControls
					bind:gridRows={grid.rows}
					bind:gridCols={grid.cols}
					bind:gridColor={grid.color}
					bind:gridThickness={grid.thickness}
					sidebar={true}
				/>
			</div>
		{/if}
		<div class="border-t border-studio-border/50"></div>
		<ToggleControl bind:checked={flipHorizontal} label="Flip Horizontal" />
	</div>
</div>

<div class="border-b border-studio-border p-4">
	<p class="mb-3 text-[10px] font-medium tracking-widest text-studio-text-muted uppercase">
		Composition
	</p>
	<div class="flex flex-col gap-2">
		<ToggleControl bind:checked={showRuleOfThirds} label="Rule of Thirds" />
		<ToggleControl bind:checked={showGoldenRatio} label="Golden Ratio" />
		<ToggleControl bind:checked={showGoldenSpiral} label="Golden Spiral" />
		<ToggleControl bind:checked={showDiagonalLines} label="Diagonal Lines" />
		{#if anyComposition}
			<div class="mt-1 flex flex-col gap-3">
				<label class="flex flex-col gap-1.5">
					<span class="text-xs font-medium text-studio-text-muted">Line Colour</span>
					<input
						type="color"
						bind:value={composition.color}
						class="h-8 w-full cursor-pointer rounded border border-studio-border bg-studio-elevated"
					/>
				</label>
				<label class="flex flex-col gap-1.5">
					<span class="text-xs font-medium text-studio-text-muted"
						>Thickness ({composition.thickness}px)</span
					>
					<input
						type="range"
						min="1"
						max="10"
						bind:value={composition.thickness}
						class="w-full accent-studio-amber"
					/>
				</label>
			</div>
		{/if}
	</div>
</div>
