<script lang="ts">
	type VisualType =
		| 'value-steps'
		| 'notan'
		| 'temperature'
		| 'sobel'
		| 'colour-reduction'
		| 'dominant-palette'
		| 'grid-overlay'
		| 'colour-harmony';

	interface Feature {
		title: string;
		description: string;
		useCase: string;
		visualType: VisualType;
	}

	const features: Feature[] = [
		{
			title: 'Value Steps',
			description:
				'Reduce your reference to 2–5 tonal steps. See the light and shadow masses clearly.',
			useCase: 'Value studies and tonal block-ins',
			visualType: 'value-steps'
		},
		{
			title: 'Notan',
			description:
				'Flatten the image to pure black and white masses. Essential for composition decisions.',
			useCase: 'Design and mass simplification',
			visualType: 'notan'
		},
		{
			title: 'Temperature Map',
			description:
				'Overlay warm and cool hues to reveal how light and shadow shift in temperature.',
			useCase: 'Colour temperature studies',
			visualType: 'temperature'
		},
		{
			title: 'Sobel Edges',
			description: 'Extract the structural edge information — hard edges vs soft transitions.',
			useCase: 'Edge quality and lost-found analysis',
			visualType: 'sobel'
		},
		{
			title: 'Colour Reduction',
			description:
				'Quantise to 2–32 colours using K-means clustering. Simplify your palette decisions.',
			useCase: 'Limited palette mixing',
			visualType: 'colour-reduction'
		},
		{
			title: 'Dominant Palette',
			description:
				'Extract the most prevalent colours from any photo with their percentage coverage.',
			useCase: 'Palette planning before you paint',
			visualType: 'dominant-palette'
		},
		{
			title: 'Grid Overlay',
			description: 'Drop a customisable grid over the image for proportion and measurement.',
			useCase: 'Accurate drawing transfer',
			visualType: 'grid-overlay'
		},
		{
			title: 'Colour Harmony',
			description: 'Visualise complementary and analogous relationships from any sampled colour.',
			useCase: 'Harmony and contrast planning',
			visualType: 'colour-harmony'
		}
	];
</script>

<!-- ─── FEATURE GRID ──────────────────────────────────────────────────────── -->
<section class="px-6 pb-28">
	<div class="mb-16 text-center">
		<p class="mb-3 font-mono text-[10px] tracking-[0.35em] text-studio-amber uppercase">Features</p>
		<h2 class="font-heading text-4xl font-light text-studio-text-primary md:text-5xl">
			Every tool an artist needs
		</h2>
	</div>

	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each features as feature, i (feature.title)}
			<div
				class="fade-up-card overflow-hidden rounded-2xl border border-studio-border bg-studio-panel hover:bg-studio-elevated"
				style="animation: fade-up 0.5s ease-out {i * 80}ms both; transition: background-color 0.2s;"
			>
				<!-- CSS Art visual -->
				<div class="h-48 w-full overflow-hidden">
					{#if feature.visualType === 'value-steps'}
						<!-- 5 tonal steps -->
						<div class="flex h-full w-full">
							{#each ['#f0e8dd', '#c4b5a8', '#8a7d6e', '#4a4240', '#1a1714'] as shade (shade)}
								<div class="h-full flex-1" style="background:{shade};"></div>
							{/each}
						</div>
					{:else if feature.visualType === 'notan'}
						<!-- Binary light/dark masses -->
						<div class="relative h-full w-full bg-studio-deepest">
							<div
								class="absolute inset-0"
								style="background:#f0e8dd; clip-path: polygon(0 0, 60% 0, 52% 30%, 70% 55%, 45% 100%, 0 100%);"
							></div>
						</div>
					{:else if feature.visualType === 'temperature'}
						<!-- Warm/cool gradient -->
						<div
							class="h-full w-full"
							style="background: linear-gradient(115deg, #1a3a6e 0%, #2d5fa6 25%, #7b4a8e 50%, #c4522a 75%, #e8743a 100%);"
						></div>
					{:else if feature.visualType === 'sobel'}
						<!-- Edge detection — SVG abstract strokes -->
						<div class="flex h-full w-full items-center justify-center bg-studio-deepest">
							<svg viewBox="0 0 160 120" class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20 90 C40 30, 80 10, 140 40"
									fill="none"
									stroke="#e8a64a"
									stroke-width="1.5"
									opacity="0.7"
								/>
								<path
									d="M10 60 C50 20, 110 80, 150 50"
									fill="none"
									stroke="#f0e8dd"
									stroke-width="1"
									opacity="0.5"
								/>
								<path
									d="M30 110 C60 70, 100 30, 145 85"
									fill="none"
									stroke="#e8a64a"
									stroke-width="1"
									opacity="0.4"
								/>
								<ellipse
									cx="80"
									cy="55"
									rx="45"
									ry="28"
									fill="none"
									stroke="#f0e8dd"
									stroke-width="1"
									opacity="0.3"
								/>
							</svg>
						</div>
					{:else if feature.visualType === 'colour-reduction'}
						<!-- 8 artist colour swatches in 4×2 grid -->
						<div class="grid h-full w-full grid-cols-4 grid-rows-2">
							{#each ['#c4522a', '#e8743a', '#e8a64a', '#8a6040', '#2d5fa6', '#3a7a50', '#7b4a8e', '#1a1714'] as colour (colour)}
								<div class="h-full w-full" style="background:{colour};"></div>
							{/each}
						</div>
					{:else if feature.visualType === 'dominant-palette'}
						<!-- 5 vertical colour bars with varying widths -->
						<div class="flex h-full w-full items-end">
							{#each [{ color: '#c4522a', pct: '32%' }, { color: '#e8a64a', pct: '24%' }, { color: '#2d5fa6', pct: '18%' }, { color: '#3a7a50', pct: '15%' }, { color: '#0f0d0b', pct: '11%' }] as bar (bar.color)}
								<div class="relative h-full" style="width:{bar.pct}; background:{bar.color};">
									<span
										class="absolute right-0 bottom-2 left-0 text-center font-mono text-[9px] text-white/60"
										>{bar.pct}</span
									>
								</div>
							{/each}
						</div>
					{:else if feature.visualType === 'grid-overlay'}
						<!-- Crosshatch grid -->
						<div
							class="h-full w-full bg-studio-deepest"
							style="background-image: repeating-linear-gradient(0deg, rgba(232,166,74,0.25) 0px, rgba(232,166,74,0.25) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(232,166,74,0.25) 0px, rgba(232,166,74,0.25) 1px, transparent 1px, transparent 30px);"
						></div>
					{:else if feature.visualType === 'colour-harmony'}
						<!-- Conic gradient colour wheel with indicator -->
						<div class="flex h-full w-full items-center justify-center bg-studio-deepest">
							<div class="relative h-32 w-32">
								<div
									class="h-full w-full rounded-full"
									style="background: conic-gradient(hsl(0,70%,50%), hsl(30,70%,50%), hsl(60,70%,50%), hsl(90,70%,50%), hsl(120,70%,50%), hsl(150,70%,50%), hsl(180,70%,50%), hsl(210,70%,50%), hsl(240,70%,50%), hsl(270,70%,50%), hsl(300,70%,50%), hsl(330,70%,50%), hsl(360,70%,50%));"
								></div>
								<!-- Centre cutout -->
								<div class="absolute inset-0 m-auto h-16 w-16 rounded-full bg-studio-deepest"></div>
								<!-- Complementary indicator line -->
								<div
									class="absolute top-1/2 left-1/2 h-[1px] w-14 origin-left -translate-y-1/2 bg-white/80"
									style="transform: translateY(-50%) rotate(25deg);"
								></div>
								<div
									class="absolute top-1/2 left-1/2 h-[1px] w-14 origin-left -translate-y-1/2 bg-white/80"
									style="transform: translateY(-50%) rotate(205deg);"
								></div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Text block -->
				<div class="p-5">
					<h3 class="mb-1.5 font-heading text-xl font-light text-studio-text-primary">
						{feature.title}
					</h3>
					<p class="mb-3 text-sm leading-relaxed text-studio-text-secondary">
						{feature.description}
					</p>
					<p class="font-mono text-[10px] tracking-wide text-studio-amber/70 italic">
						{feature.useCase}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-up-card {
		animation-fill-mode: both;
	}
</style>
