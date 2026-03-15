<script lang="ts">
	let {
		gridRows = $bindable(),
		gridCols = $bindable(),
		gridColor = $bindable(),
		gridThickness = $bindable(),
		sidebar = false
	}: {
		gridRows: number;
		gridCols: number;
		gridColor: string;
		gridThickness: number;
		sidebar?: boolean;
	} = $props();
</script>

{#if sidebar}
	<div class="flex flex-col gap-3">
		<label class="flex flex-col gap-1.5">
			<span class="text-xs font-medium text-studio-text-muted">Rows ({gridRows})</span>
			<input
				type="range"
				min="3"
				max="11"
				bind:value={gridRows}
				class="w-full accent-studio-amber"
			/>
		</label>
		<label class="flex flex-col gap-1.5">
			<span class="text-xs font-medium text-studio-text-muted">Columns ({gridCols})</span>
			<input
				type="range"
				min="3"
				max="11"
				bind:value={gridCols}
				class="w-full accent-studio-amber"
			/>
		</label>
		<label class="flex flex-col gap-1.5">
			<span class="text-xs font-medium text-studio-text-muted">Line Colour</span>
			<input
				type="color"
				bind:value={gridColor}
				class="h-8 w-full cursor-pointer rounded border border-studio-border bg-studio-elevated"
			/>
		</label>
		<label class="flex flex-col gap-1.5">
			<span class="text-xs font-medium text-studio-text-muted">Thickness ({gridThickness}px)</span>
			<input
				type="range"
				min="1"
				max="10"
				bind:value={gridThickness}
				class="w-full accent-studio-amber"
			/>
		</label>
	</div>
{:else}
	<div class="rounded-xl border border-studio-border bg-studio-panel p-4">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
			<label class="flex flex-col gap-1.5">
				<span class="text-xs font-medium text-studio-text-muted"
					>Rows <span class="opacity-70">({gridRows})</span></span
				>
				<input type="range" min="3" max="11" bind:value={gridRows} class="accent-studio-amber" />
			</label>
			<label class="flex flex-col gap-1.5">
				<span class="text-xs font-medium text-studio-text-muted"
					>Columns <span class="opacity-70">({gridCols})</span></span
				>
				<input type="range" min="3" max="11" bind:value={gridCols} class="accent-studio-amber" />
			</label>
			<label class="flex flex-col gap-1.5">
				<span class="text-xs font-medium text-studio-text-muted">Line Colour</span>
				<input
					type="color"
					bind:value={gridColor}
					class="h-8 w-full cursor-pointer rounded border border-studio-border bg-studio-elevated"
				/>
			</label>
			<label class="flex flex-col gap-1.5">
				<span class="text-xs font-medium text-studio-text-muted"
					>Thickness <span class="opacity-70">({gridThickness}px)</span></span
				>
				<input
					type="range"
					min="1"
					max="10"
					bind:value={gridThickness}
					class="accent-studio-amber"
				/>
			</label>
		</div>
	</div>
{/if}
