<script lang="ts">
	import { resolve } from '$app/paths';
	import FloatingBox from '$lib/components/FloatingBox.svelte';
	import HeroHeadline from '$lib/components/landing/HeroHeadline.svelte';
</script>

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
	<HeroHeadline />

	<!-- Sub -->
	<p class="mb-10 max-w-lg text-lg leading-relaxed font-light text-studio-text-secondary">
		Real-time canvas filters for tone, colour, and form —<br class="hidden sm:block" /> all in your browser.
	</p>

	<!-- CTA -->
	<a
		href={resolve('/studio')}
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

<style>
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
</style>
