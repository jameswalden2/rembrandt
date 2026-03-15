<script lang="ts">
	import GridControls from './GridControls.svelte';
	import ToggleControl from './ToggleControl.svelte';

	type GridOptions = { rows: number; cols: number; color: string; thickness: number };

	let {
		showGrid = $bindable(),
		flipHorizontal = $bindable(),
		grid = $bindable()
	}: {
		showGrid: boolean;
		flipHorizontal: boolean;
		grid: GridOptions;
	} = $props();
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
