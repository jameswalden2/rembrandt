<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';

	function makeSlide(sign: 1 | -1, defaultEasing: (t: number) => number) {
		return function (
			node: Element,
			{
				duration = 300,
				delay = 0,
				easing = defaultEasing
			}: { duration?: number; delay?: number; easing?: (t: number) => number } = {}
		) {
			return {
				duration,
				delay,
				easing,
				css: (t: number) =>
					`transform: translateY(calc(-62% ${sign > 0 ? '+' : '-'} ${70 * (1 - t)}px)); opacity: ${t};`
			};
		};
	}

	const slideIn = makeSlide(-1, cubicOut);
	const slideOut = makeSlide(1, cubicIn);

	interface CyclingWord {
		label: string;
		color: string;
	}

	const cyclingWords: CyclingWord[] = [
		{ label: 'a painter', color: '#e8a64a' },
		{ label: 'Sargent', color: '#b8d4c8' },
		{ label: 'Sorolla', color: '#d4a8c8' }
	];

	const longestWord = cyclingWords.reduce((a, b) =>
		a.label.length >= b.label.length ? a : b
	).label;

	let activeIndex = $state(0);
	let wordWidths = $state<number[]>(new Array(cyclingWords.length).fill(0));
	let hasWidths = $derived(wordWidths.every((w) => w > 0));
	let currentWidth = $derived(hasWidths ? wordWidths[activeIndex] : null);

	$effect(() => {
		const id = setInterval(() => {
			activeIndex = (activeIndex + 1) % cyclingWords.length;
		}, 3000);
		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<title>Rembrandt — See your reference as {cyclingWords[activeIndex].label} sees it</title>
	<meta
		name="description"
		content="Real-time canvas filters for tone, colour, and form — all in your browser. No install, no account."
	/>
</svelte:head>

<h1
	class="mb-6 max-w-3xl font-heading text-7xl leading-[1.1] font-light tracking-tight text-studio-text-primary md:text-8xl"
>
	See your reference<br />as
	<span
		class="cycling-host overflow-hidden"
		aria-live="polite"
		style={currentWidth ? `width: ${currentWidth}px` : undefined}
	>
		{#if !hasWidths}
			<span class="cycling-spacer" aria-hidden="true">{longestWord}</span>
		{/if}
		{#each cyclingWords as word, i (word.label)}
			<span class="measure-word" aria-hidden="true" bind:offsetWidth={wordWidths[i]}
				>{word.label}</span
			>
		{/each}
		{#key activeIndex}
			<span
				class="cycling-word underline"
				style="color: {cyclingWords[activeIndex].color};"
				in:slideIn={{ duration: 300, delay: 200 }}
				out:slideOut={{ duration: 300 }}>{cyclingWords[activeIndex].label}</span
			>
		{/key}
	</span>&nbsp;sees&nbsp;it
</h1>

<style>
	.cycling-host {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		overflow: hidden;
		height: 1.1em;
		transition: width 300ms 200ms ease-out;
	}

	.cycling-spacer {
		display: inline-block;
		visibility: hidden;
		white-space: nowrap;
	}

	.measure-word {
		position: absolute;
		visibility: hidden;
		white-space: nowrap;
		pointer-events: none;
	}

	.cycling-word {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-62%);
		white-space: nowrap;
		text-align: center;
	}
</style>
