<script lang="ts">
	import { resolve } from '$app/paths';
	import FeatureGrid from '$lib/components/landing/FeatureGrid.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
</script>

<HeroSection />

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

<FeatureGrid />

<HowItWorks />

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
			href={resolve('/studio')}
			class="mb-8 inline-block rounded-full bg-studio-amber px-8 py-3.5 font-sans font-medium text-studio-deepest transition-colors duration-200 hover:bg-studio-amber-hover"
		>
			Open Studio →
		</a>
		<p class="mt-8 font-mono text-xs tracking-widest text-studio-text-muted">
			No install. No account. Just upload and paint.
		</p>
	</div>
</section>
