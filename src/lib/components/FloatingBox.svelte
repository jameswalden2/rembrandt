<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		alt?: string;
		top?: string;
		bottom?: string;
		left?: string;
		right?: string;
		width: string;
		rotation: string;
		opacity: number;
		delay: string;
		title: string;
	}

	let {
		src,
		alt = '',
		top,
		bottom,
		left,
		right,
		width,
		rotation,
		opacity,
		delay,
		title
	}: Props = $props();

	let visible = $state(false);
	let hovered = $state(false);
	let imgEl = $state<HTMLImageElement | null>(null);
	let naturalAspect = $state<string>('auto');

	function parseDelayMs(d: string): number {
		if (d.endsWith('ms')) return parseFloat(d);
		if (d.endsWith('s')) return parseFloat(d) * 1000;
		return 0;
	}

	onMount(() => {
		const timer = setTimeout(() => (visible = true), parseDelayMs(delay));
		return () => clearTimeout(timer);
	});

	const currentOpacity = $derived(hovered ? 0.5 : visible ? opacity : 0);
	const titleOpacity = $derived(hovered ? 0.8 : 0);

	const positionStyle = $derived(
		[
			top !== undefined ? `top:${top}` : '',
			bottom !== undefined ? `bottom:${bottom}` : '',
			left !== undefined ? `left:${left}` : '',
			right !== undefined ? `right:${right}` : ''
		]
			.filter(Boolean)
			.join(';')
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="pointer-events-auto absolute transition-opacity duration-600 ease-out"
	style="width:{width}; transform:rotate({rotation}); opacity:{currentOpacity}; {positionStyle}"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
>
	<div
		class="overflow-hidden rounded-2xl border-4 border-dashed border-studio-amber shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-studio-amber-hover"
		style="aspect-ratio:{naturalAspect};"
	>
		<img
			bind:this={imgEl}
			{src}
			{alt}
			style="width:100%; height:100%; object-fit:cover; display:block;"
			onload={() => {
				if (imgEl) naturalAspect = `${imgEl.naturalWidth}/${imgEl.naturalHeight}`;
			}}
		/>
	</div>
	<span
		class="mt-2 block text-center font-mono text-[10px] tracking-[0.4em] text-studio-amber uppercase transition-opacity duration-300"
		style="opacity:{titleOpacity}">{title}</span
	>
</div>
