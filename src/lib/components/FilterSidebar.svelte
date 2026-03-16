<script lang="ts">
	import { resolve } from '$app/paths';
	import IconMenu from '$lib/components/icons/IconMenu.svelte';
	import IconEasel from '$lib/components/icons/IconEasel.svelte';
	import CanvasControls from './controls/CanvasControls.svelte';
	import RangeControl from './controls/RangeControl.svelte';
	import ToggleControl from './controls/ToggleControl.svelte';

	type ViewMode =
		| 'normal'
		| 'grayscale'
		| 'artistGrayscale'
		| 'lowPoly'
		| 'reduceColours'
		| 'grayscaleReduceColours'
		| 'notan'
		| 'sobel'
		| 'gaussianBlur'
		| 'temperatureMap';

	let {
		originalImage,
		viewMode = $bindable(),
		colourCount = $bindable(),
		grayscaleShades = $bindable(),
		notanThreshold = $bindable(),
		sobelThreshold = $bindable(),
		sobelBlurRadius = $bindable(),
		sobelInvert = $bindable(),
		blurRadius = $bindable(),
		showGrid = $bindable(),
		flipHorizontal = $bindable(),
		grid = $bindable(),
		showRuleOfThirds = $bindable(),
		showGoldenRatio = $bindable(),
		showGoldenSpiral = $bindable(),
		showDiagonalLines = $bindable(),
		composition = $bindable()
	}: {
		originalImage: HTMLImageElement | null | undefined;
		viewMode: ViewMode;
		colourCount: number;
		grayscaleShades: number;
		notanThreshold: number;
		sobelThreshold: number;
		sobelBlurRadius: number;
		sobelInvert: boolean;
		blurRadius: number;
		showGrid: boolean;
		flipHorizontal: boolean;
		grid: { rows: number; cols: number; color: string; thickness: number };
		showRuleOfThirds: boolean;
		showGoldenRatio: boolean;
		showGoldenSpiral: boolean;
		showDiagonalLines: boolean;
		composition: { color: string; thickness: number };
	} = $props();

	let sidebarCollapsed = $state(false);

	const viewModeGroups: {
		label: string;
		modes: { id: ViewMode; label: string; description: string }[];
	}[] = [
		{
			label: 'Tone & Value',
			modes: [
				{ id: 'normal', label: 'Normal', description: 'Unmodified reference' },
				{ id: 'grayscale', label: 'Grayscale', description: 'Standard luminance' },
				{
					id: 'artistGrayscale',
					label: 'Artist Grayscale',
					description: 'Warm-biased for painting'
				},
				{
					id: 'grayscaleReduceColours',
					label: 'Value Steps',
					description: 'Quantised tonal zones'
				},
				{ id: 'notan', label: 'Notan', description: 'Light/dark masses' }
			]
		},
		{
			label: 'Colour',
			modes: [
				{
					id: 'reduceColours',
					label: 'Reduce Colours',
					description: 'K-means colour simplification'
				},
				{ id: 'temperatureMap', label: 'Temperature Map', description: 'Warm/cool hue analysis' }
			]
		},
		{
			label: 'Edge & Form',
			modes: [
				{ id: 'sobel', label: 'Sobel Edges', description: 'Edge detection' },
				{ id: 'gaussianBlur', label: 'Gaussian Blur', description: 'Soften to read masses' }
			]
		}
	];
</script>

<aside
	class="flex shrink-0 flex-col overflow-hidden border-r border-studio-border bg-studio-panel transition-[width] duration-300 ease-in-out {sidebarCollapsed
		? 'w-12'
		: 'w-72'}"
>
	{#if sidebarCollapsed}
		<div class="flex items-center justify-center border-b border-studio-border py-5">
			<button
				onclick={() => (sidebarCollapsed = false)}
				class="text-studio-text-muted transition-colors hover:text-studio-text-primary"
				aria-label="Expand sidebar"
			>
				<IconMenu class="h-4 w-4" />
			</button>
		</div>
		<div class="flex h-full items-center justify-center">
			<IconEasel class="h-5 w-5 text-studio-amber" />
		</div>
	{:else}
		<div class="flex h-full w-72 flex-col">
			<div class="flex items-center border-b border-studio-border">
				<a
					href={resolve('/')}
					class="flex flex-1 items-center gap-2.5 px-4 py-5 transition-opacity hover:opacity-75"
				>
					<IconEasel class="h-5 w-5 text-studio-amber" />
					<p class="font-mono text-[10px] tracking-[0.4em] text-studio-amber uppercase">
						Rembrandt Studio
					</p>
				</a>
				<button
					onclick={() => (sidebarCollapsed = true)}
					class="px-3 py-5 text-studio-text-muted transition-colors hover:text-studio-text-primary"
					aria-label="Collapse sidebar"
				>
					<IconMenu class="h-4 w-4" />
				</button>
			</div>
			<div class="flex-1 overflow-y-auto">
				{#if originalImage}
					<!-- View modes — grouped accordion -->
					<div class="border-b border-studio-border p-4">
						<div class="flex flex-col gap-3">
							{#each viewModeGroups as group (group.label)}
								<div>
									<p
										class="mb-1 text-[10px] font-medium tracking-widest text-studio-text-muted uppercase"
									>
										{group.label}
									</p>
									<div class="flex flex-col gap-0.5">
										{#each group.modes as mode (mode.id)}
											<button
												onclick={() => (viewMode = mode.id)}
												class="flex flex-col rounded-sm border-l-4 px-3 py-2 text-left transition-colors {viewMode ===
												mode.id
													? 'border-studio-amber bg-studio-elevated'
													: 'border-transparent hover:bg-studio-elevated hover:text-studio-text-primary'}"
											>
												<span
													class="text-sm font-medium {viewMode === mode.id
														? 'text-studio-text-primary'
														: 'text-studio-text-secondary'}">{mode.label}</span
												>
												<span class="text-[11px] text-studio-text-muted">{mode.description}</span>
											</button>

											<!-- Inline controls for active mode -->
											{#if viewMode === mode.id}
												{#if mode.id === 'reduceColours'}
													<div class="mt-1 mb-1 px-3">
														<RangeControl
															label="Colours"
															min={2}
															max={32}
															bind:value={colourCount}
															sidebar={true}
														/>
													</div>
												{/if}
												{#if mode.id === 'grayscaleReduceColours'}
													<div class="mt-1 mb-1 px-3">
														<RangeControl
															label="Shades"
															min={2}
															max={10}
															bind:value={grayscaleShades}
															sidebar={true}
														/>
													</div>
												{/if}
												{#if mode.id === 'notan'}
													<div class="mt-1 mb-1 px-3">
														<RangeControl
															label="Threshold"
															min={0}
															max={255}
															bind:value={notanThreshold}
															sidebar={true}
														/>
													</div>
												{/if}
												{#if mode.id === 'sobel'}
													<div class="mt-1 mb-1 flex flex-col gap-3 px-3">
														<RangeControl
															label="Threshold"
															min={0}
															max={255}
															bind:value={sobelThreshold}
															sidebar={true}
														/>
														<RangeControl
															label="Pre-blur"
															min={0}
															max={5}
															bind:value={sobelBlurRadius}
															sidebar={true}
														/>
														<ToggleControl bind:checked={sobelInvert} label="Invert" />
													</div>
												{/if}
												{#if mode.id === 'gaussianBlur'}
													<div class="mt-1 mb-1 px-3">
														<RangeControl
															label="Blur Radius"
															min={0}
															max={40}
															bind:value={blurRadius}
															sidebar={true}
														/>
													</div>
												{/if}
											{/if}
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Canvas tools -->
					<CanvasControls
						bind:showGrid
						bind:flipHorizontal
						bind:grid
						bind:showRuleOfThirds
						bind:showGoldenRatio
						bind:showGoldenSpiral
						bind:showDiagonalLines
						bind:composition
					/>
				{:else}
					<!-- No image hint -->
					<div class="flex flex-1 items-center justify-center p-8">
						<p class="text-center font-heading text-xl leading-relaxed text-studio-text-muted">
							Load a reference<br />to begin
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</aside>
