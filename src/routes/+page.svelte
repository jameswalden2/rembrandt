<script lang="ts">
	import FloatingBox from '$lib/components/FloatingBox.svelte';

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

<svelte:head>
	<title>Rembrandt — See your reference as a painter sees it</title>
	<meta
		name="description"
		content="Real-time canvas filters for tone, colour, and form — all in your browser. No install, no account."
	/>
</svelte:head>

<!-- ─── HERO ─────────────────────────────────────────────────────────────── -->
<section
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-studio-deepest px-6 text-center"
>
	<!-- Floating reference image boxes (behind hero content) -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<FloatingBox
			src="/den_gamle_by_painting_ref.jpg"
			top="4%"
			left="6%"
			width="clamp(200px,28vw,420px)"
			rotation="-8deg"
			opacity={0.3}
			delay="0s"
			title="notan"
		/>
		<FloatingBox
			src="/den_gamle_by_painting_ref.jpg"
			top="2%"
			right="13%"
			width="clamp(160px,18vw,280px)"
			rotation="6deg"
			opacity={0.1}
			delay="0.15s"
			title="notan"
		/>
		<FloatingBox
			src="/den_gamle_by_painting_ref.jpg"
			bottom="8%"
			left="8%"
			width="clamp(180px,22vw,340px)"
			rotation="12deg"
			opacity={0.12}
			delay="0.3s"
			title="notan"
		/>
		<FloatingBox
			src="/den_gamle_by_painting_ref.jpg"
			top="35%"
			right="2%"
			width="clamp(200px,24vw,380px)"
			rotation="-5deg"
			opacity={0.11}
			delay="0.1s"
			title="notan"
		/>
		<FloatingBox
			src="/den_gamle_by_painting_ref.jpg"
			bottom="4%"
			right="14%"
			width="clamp(160px,20vw,300px)"
			rotation="9deg"
			opacity={0.09}
			delay="0.25s"
			title="notan"
		/>
	</div>

	<!-- Radial amber glow -->
	<div
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(ellipse 60% 50% at 50% 45%, rgba(232,166,74,0.07) 0%, transparent 70%);"
	></div>

	<!-- Easel icon -->
	<div class="easel-float mb-8 text-studio-amber/30">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-16 w-16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect x="4" y="2" width="16" height="11" rx="0.5" />
			<line x1="4" y1="5" x2="20" y2="5" />
			<line x1="6" y1="13" x2="2" y2="22" />
			<line x1="12" y1="13" x2="12" y2="22" />
			<line x1="18" y1="13" x2="22" y2="22" />
			<line x1="3" y1="19" x2="21" y2="19" />
		</svg>
	</div>

	<!-- Eyebrow -->
	<p class="mb-6 font-mono text-[10px] tracking-[0.4em] text-studio-amber uppercase">
		Rembrandt Studio
	</p>

	<!-- Headline -->
	<h1
		class="mb-6 max-w-3xl font-heading text-7xl leading-[0.88] font-light tracking-tight text-studio-text-primary md:text-8xl"
	>
		See your reference<br />as a painter sees&nbsp;it
	</h1>

	<!-- Sub -->
	<p class="mb-10 max-w-lg text-lg leading-relaxed font-light text-studio-text-secondary">
		Real-time canvas filters for tone, colour, and form —<br class="hidden sm:block" /> all in your browser.
	</p>

	<!-- CTA -->
	<a
		href="/studio"
		class="mb-16 inline-block rounded-full bg-studio-amber px-8 py-3.5 font-sans font-medium text-studio-deepest transition-colors duration-200 hover:bg-studio-amber-hover"
	>
		Open Studio →
	</a>

	<!-- Scroll nudge -->
	<p
		class="scroll-nudge absolute bottom-8 font-mono text-xs tracking-widest text-studio-text-muted"
	>
		↓ scroll
	</p>
</section>

<!-- ─── PREMISE ───────────────────────────────────────────────────────────── -->
<section class="relative px-6 py-28 text-center">
	<div class="relative mx-auto max-w-2xl">
		<!-- Decorative quote mark -->
		<span
			class="pointer-events-none absolute -top-8 -left-4 font-heading text-8xl leading-none text-studio-amber/20 select-none"
			aria-hidden="true">"</span
		>
		<p class="relative font-heading text-2xl leading-relaxed font-light text-studio-text-primary">
			Upload any reference photograph. Apply filters that artists actually need — value studies,
			notan masses, warm/cool temperature, edge structure, dominant palette, and more. All processed
			locally, instantly, privately.
		</p>
	</div>
</section>

<!-- ─── FEATURE GRID ──────────────────────────────────────────────────────── -->
<section class="px-6 pb-28">
	<div class="mb-16 text-center">
		<p class="mb-3 font-mono text-[10px] tracking-[0.35em] text-studio-amber uppercase">Features</p>
		<h2 class="font-heading text-4xl font-light text-studio-text-primary md:text-5xl">
			Every tool an artist needs
		</h2>
	</div>

	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each features as feature, i}
			<div
				class="fade-up-card overflow-hidden rounded-2xl border border-studio-border bg-studio-panel"
				style="animation: fade-up 0.5s ease-out {i * 80}ms both;"
			>
				<!-- CSS Art visual -->
				<div class="h-48 w-full overflow-hidden">
					{#if feature.visualType === 'value-steps'}
						<!-- 5 tonal steps -->
						<div class="flex h-full w-full">
							{#each ['#f0e8dd', '#c4b5a8', '#8a7d6e', '#4a4240', '#1a1714'] as shade}
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
						<div class="flex h-full w-full items-center justify-center bg-[#0f0d0b]">
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
							{#each ['#c4522a', '#e8743a', '#e8a64a', '#8a6040', '#2d5fa6', '#3a7a50', '#7b4a8e', '#1a1714'] as colour}
								<div class="h-full w-full" style="background:{colour};"></div>
							{/each}
						</div>
					{:else if feature.visualType === 'dominant-palette'}
						<!-- 5 vertical colour bars with varying widths -->
						<div class="flex h-full w-full items-end">
							{#each [{ color: '#c4522a', pct: '32%' }, { color: '#e8a64a', pct: '24%' }, { color: '#2d5fa6', pct: '18%' }, { color: '#3a7a50', pct: '15%' }, { color: '#0f0d0b', pct: '11%' }] as bar}
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

<!-- ─── HOW IT WORKS ──────────────────────────────────────────────────────── -->
<section class="border-y border-studio-border px-6 py-24">
	<div class="mb-16 text-center">
		<p class="mb-3 font-mono text-[10px] tracking-[0.35em] text-studio-amber uppercase">Workflow</p>
		<h2 class="font-heading text-4xl font-light text-studio-text-primary md:text-5xl">
			How it works
		</h2>
	</div>

	<div class="mx-auto flex max-w-4xl flex-col gap-10 md:flex-row md:items-start md:gap-0">
		<!-- Step 1 -->
		<div class="flex flex-1 flex-col items-center text-center">
			<p class="mb-3 font-mono text-xs tracking-[0.3em] text-studio-amber">01</p>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-studio-border bg-studio-panel text-studio-amber"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="17 8 12 3 7 8" />
					<line x1="12" y1="3" x2="12" y2="15" />
				</svg>
			</div>
			<h3 class="mb-2 font-heading text-xl font-light text-studio-text-primary">Upload</h3>
			<p class="max-w-[180px] text-sm leading-relaxed text-studio-text-secondary">
				Drag-drop or pick any reference photo from your device.
			</p>
		</div>

		<!-- Connector -->
		<div class="hidden self-center md:block md:flex-none" style="width:40px;">
			<div class="mt-6 w-full border-t border-studio-border/40"></div>
		</div>

		<!-- Step 2 -->
		<div class="flex flex-1 flex-col items-center text-center">
			<p class="mb-3 font-mono text-xs tracking-[0.3em] text-studio-amber">02</p>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-studio-border bg-studio-panel text-studio-amber"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="3" />
					<path
						d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
					/>
				</svg>
			</div>
			<h3 class="mb-2 font-heading text-xl font-light text-studio-text-primary">Choose a filter</h3>
			<p class="max-w-[180px] text-sm leading-relaxed text-studio-text-secondary">
				Select from eight artist-focused analysis modes.
			</p>
		</div>

		<!-- Connector -->
		<div class="hidden self-center md:block md:flex-none" style="width:40px;">
			<div class="mt-6 w-full border-t border-studio-border/40"></div>
		</div>

		<!-- Step 3 -->
		<div class="flex flex-1 flex-col items-center text-center">
			<p class="mb-3 font-mono text-xs tracking-[0.3em] text-studio-amber">03</p>
			<div
				class="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-studio-border bg-studio-panel text-studio-amber"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="4" y="2" width="16" height="11" rx="0.5" />
					<line x1="4" y1="5" x2="20" y2="5" />
					<line x1="6" y1="13" x2="2" y2="22" />
					<line x1="12" y1="13" x2="12" y2="22" />
					<line x1="18" y1="13" x2="22" y2="22" />
					<line x1="3" y1="19" x2="21" y2="19" />
				</svg>
			</div>
			<h3 class="mb-2 font-heading text-xl font-light text-studio-text-primary">Study and paint</h3>
			<p class="max-w-[180px] text-sm leading-relaxed text-studio-text-secondary">
				Use the filtered view alongside your canvas. Download any time.
			</p>
		</div>
	</div>
</section>

<!-- ─── PRIVACY CALLOUT ───────────────────────────────────────────────────── -->
<section class="bg-studio-deepest px-6 py-28 text-center">
	<div class="mx-auto max-w-2xl">
		<p class="mb-6 font-mono text-[10px] tracking-[0.35em] text-studio-amber uppercase">Privacy</p>
		<h2 class="mb-6 font-heading text-3xl font-light text-studio-text-primary md:text-4xl">
			Your work never leaves your machine.
		</h2>
		<p class="mb-10 text-base leading-relaxed text-studio-text-secondary">
			Every filter runs directly in your browser using the Canvas API. Your images are never
			uploaded, stored, or transmitted anywhere. There is no server, no account, and no tracking of
			any kind.
		</p>
		<p
			class="inline-block rounded-lg border border-studio-border/50 bg-studio-panel px-5 py-3 font-mono text-xs tracking-widest text-studio-text-muted"
		>
			[ 100% browser · zero server · zero tracking ]
		</p>
	</div>
</section>

<!-- ─── CLOSING CTA ───────────────────────────────────────────────────────── -->
<section class="px-6 py-28 text-center">
	<div class="mx-auto max-w-xl">
		<h2 class="mb-8 font-heading text-4xl font-light text-studio-text-primary">
			Ready to see differently?
		</h2>
		<a
			href="/studio"
			class="mb-8 inline-block rounded-full bg-studio-amber px-8 py-3.5 font-sans font-medium text-studio-deepest transition-colors duration-200 hover:bg-studio-amber-hover"
		>
			Open Studio →
		</a>
		<p class="mt-8 font-mono text-xs tracking-widest text-studio-text-muted">
			No install. No account. Just upload and paint.
		</p>
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

	@keyframes bounce-subtle {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(4px);
		}
	}

	.scroll-nudge {
		animation: bounce-subtle 1.8s ease-in-out infinite;
	}

	.fade-up-card {
		animation-fill-mode: both;
	}
</style>
